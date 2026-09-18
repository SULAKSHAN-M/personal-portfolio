import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import BotAvatar from "./BotAvatar";

const API_URL = import.meta.env.VITE_API_URL;

const SUGGESTIONS = [
  "What has Sulakshan built?",
  "What's his experience?",
  "What certifications does he have?",
];

const WELCOME_MESSAGE = {
  role: "assistant",
  content:
    "Hi! I'm Sulakshan's portfolio assistant. Ask me about his projects, experience, skills, or education.",
};

const ERROR_AUTO_CLEAR_MS = 4000;
const HAPPY_DURATION_MS = 1500;
const WAVE_DURATION_MS = 550;
const SLEEP_DELAY_MS = 1200;
const GREETING_DURATION_MS = 2200;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAwake, setIsAwake] = useState(false);
  const [justWoke, setJustWoke] = useState(false);
  const [justReplied, setJustReplied] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const sleepTimeoutRef = useRef(null);
  const greetingTimeoutRef = useRef(null);
  const waveTimeoutRef = useRef(null);
  const happyTimeoutRef = useRef(null);
  const errorTimeoutRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setIsAwake(true);
      setShowGreeting(false);
      setJustWoke(true);
      waveTimeoutRef.current = setTimeout(() => setJustWoke(false), WAVE_DURATION_MS);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      clearTimeout(sleepTimeoutRef.current);
      clearTimeout(greetingTimeoutRef.current);
      clearTimeout(waveTimeoutRef.current);
      clearTimeout(happyTimeoutRef.current);
      clearTimeout(errorTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleLauncherEnter = () => {
    if (isOpen) return;
    clearTimeout(sleepTimeoutRef.current);
    clearTimeout(greetingTimeoutRef.current);
    clearTimeout(waveTimeoutRef.current);
    setIsAwake(true);
    setJustWoke(true);
    setShowGreeting(true);
    waveTimeoutRef.current = setTimeout(() => setJustWoke(false), WAVE_DURATION_MS);
    greetingTimeoutRef.current = setTimeout(() => setShowGreeting(false), GREETING_DURATION_MS);
  };

  const handleLauncherLeave = () => {
    if (isOpen) return;
    setShowGreeting(false);
    sleepTimeoutRef.current = setTimeout(() => setIsAwake(false), SLEEP_DELAY_MS);
  };

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    clearTimeout(errorTimeoutRef.current);
    setIsLoading(true);

    try {
      const history = nextMessages
        .filter((m) => m !== WELCOME_MESSAGE)
        .slice(-12)
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch(`${API_URL}/api/v1/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history: history.slice(0, -1) }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Something went wrong.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      setJustReplied(true);
      clearTimeout(happyTimeoutRef.current);
      happyTimeoutRef.current = setTimeout(() => setJustReplied(false), HAPPY_DURATION_MS);
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Couldn't reach the server. Please try again."
          : err.message || "Something went wrong. Please try again.",
      );
      errorTimeoutRef.current = setTimeout(() => setError(""), ERROR_AUTO_CLEAR_MS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const avatarState = isOpen
    ? isLoading
      ? "thinking"
      : error
        ? "error"
        : justReplied
          ? "happy"
          : "awake"
    : justWoke
      ? "wave"
      : isAwake
        ? "awake"
        : "asleep";

  return (
    <div ref={containerRef} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-[calc(100vw-2rem)] max-w-sm h-[28rem] max-h-[70vh] bg-gray-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="p-1 bg-white/10 rounded-lg">
                <BotAvatar state={avatarState} size={26} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Portfolio Assistant
                </p>
                <p className="text-xs text-gray-500">Ask about Sulakshan</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-white text-black"
                        : "bg-white/10 text-gray-200"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-xl px-3 py-2 flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <p className="text-xs text-red-400 text-center">{error}</p>
              )}

              {messages.length === 1 && !isLoading && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-full border border-white/10 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 p-3 border-t border-white/10"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                maxLength={1000}
                disabled={isLoading}
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="p-2.5 bg-white text-black rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {showGreeting && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-3 whitespace-nowrap bg-white text-black text-xs font-medium px-3 py-2 rounded-xl rounded-br-sm shadow-lg"
            >
              Oh! Hi there 👋
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          onMouseEnter={handleLauncherEnter}
          onMouseLeave={handleLauncherLeave}
          onFocus={handleLauncherEnter}
          onBlur={handleLauncherLeave}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? "Close chat" : "Open chat"}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-white text-black rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.span>
            ) : (
              <motion.span
                key="bot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <BotAvatar state={avatarState} size={26} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};

export default Chatbot;
