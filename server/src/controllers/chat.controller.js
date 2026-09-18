const { PROFILE_CONTEXT } = require('../data/profileContext');

// Google AI Studio (Gemini) has a genuinely free tier — get a key at
// https://aistudio.google.com/apikey (no credit card required).
//
// NOTE: Google periodically retires older Gemini model versions (e.g.
// gemini-2.0-flash was shut down on 2026-03-31). "gemini-flash-latest" is
// Google's self-updating alias that always points at the current
// recommended Flash model, so this endpoint doesn't need code changes
// every time a model is retired. If you ever see this chatbot fail with
// a "temporarily unavailable" message, check the server logs first —
// it's very often a retired/renamed model, not a real outage.
const GEMINI_MODEL = 'gemini-flash-latest';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const MAX_HISTORY_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1000;

// The free tier occasionally returns 503 "model overloaded" or 429 "rate
// limited" during high demand — both are transient, so a couple of quick
// retries with backoff usually clears them up without the visitor ever
// noticing.
const RETRYABLE_STATUS_CODES = new Set([429, 503]);
const MAX_ATTEMPTS = 3;
const RETRY_DELAYS_MS = [500, 1200];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const callGemini = async (contents) => {
  let lastError = null;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const response = await fetch(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: PROFILE_CONTEXT }] },
        contents,
        generationConfig: {
          maxOutputTokens: 400,
          temperature: 0.7,
        },
      }),
    });

    if (response.ok) {
      return response;
    }

    const errBody = await response.text();
    console.error(
      `[chat] Gemini API error (attempt ${attempt + 1}/${MAX_ATTEMPTS})`,
      response.status,
      errBody,
    );
    lastError = { status: response.status, body: errBody };

    const isLastAttempt = attempt === MAX_ATTEMPTS - 1;
    if (!RETRYABLE_STATUS_CODES.has(response.status) || isLastAttempt) {
      break;
    }

    await sleep(RETRY_DELAYS_MS[attempt]);
  }

  const error = new Error('Gemini API request failed after retries');
  error.geminiError = lastError;
  throw error;
};

const sendChatMessage = async (req, res, next) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        success: false,
        message: 'Chat is not configured on this server yet.',
      });
    }

    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(422).json({ success: false, message: 'Message is required.' });
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(422).json({
        success: false,
        message: `Message is too long (max ${MAX_MESSAGE_LENGTH} characters).`,
      });
    }

    // Gemini uses "model" instead of "assistant" for the bot's turns.
    const safeHistory = Array.isArray(history)
      ? history
          .filter(
            (turn) =>
              turn &&
              (turn.role === 'user' || turn.role === 'assistant') &&
              typeof turn.content === 'string',
          )
          .slice(-MAX_HISTORY_MESSAGES)
          .map((turn) => ({
            role: turn.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: turn.content.slice(0, MAX_MESSAGE_LENGTH) }],
          }))
      : [];

    const contents = [
      ...safeHistory,
      { role: 'user', parts: [{ text: message.trim() }] },
    ];

    let response;
    try {
      response = await callGemini(contents);
    } catch (err) {
      const status = err.geminiError?.status;
      const message =
        status === 429
          ? "I'm getting a lot of messages right now — please try again in a few seconds."
          : status === 503
            ? "Gemini's free tier is under heavy load right now. Please try again in a moment."
            : 'The chatbot is temporarily unavailable. Please try again shortly.';

      return res.status(502).json({ success: false, message });
    }

    const data = await response.json();
    const reply = (data.candidates?.[0]?.content?.parts || [])
      .map((part) => part.text || '')
      .join('\n')
      .trim();

    return res.json({
      success: true,
      reply: reply || "Sorry, I couldn't come up with a reply to that — try rephrasing?",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { sendChatMessage };
