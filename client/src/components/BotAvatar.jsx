import { AnimatePresence, motion } from "framer-motion";

/**
 * A small floating white robot with a glowing eye-visor, inspired by the
 * sleek "cute sci-fi companion" aesthetic — not a reproduction of any
 * specific copyrighted character, just an original friendly bot.
 *
 * States:
 *  - asleep   closed visor, slow bob, drifting "z Z Z"
 *  - awake    open glowing eye, alert, gentle hover
 *  - wave     quick startled hop + eye-widen (used right after waking)
 *  - thinking scanning eye + orbiting dots (while waiting on a reply)
 *  - happy    curved happy-eye + sparkle burst (after a reply lands)
 *  - error    worried droopy eye + shake (on a failed request)
 */
const BotAvatar = ({ state = "asleep", size = 28 }) => {
  const bodyAnimation = {
    asleep: { y: [0, 2, 0], rotate: 0, scale: 1 },
    awake: { y: [0, -1.5, 0], rotate: 0, scale: 1 },
    wave: { rotate: [0, -10, 8, -6, 0], y: [0, -3, 0], scale: [1, 1.08, 1] },
    thinking: { y: [0, -1, 0], rotate: [0, -2, 2, 0], scale: 1 },
    happy: { y: [0, -4, 0], rotate: [0, -4, 4, 0], scale: [1, 1.06, 1] },
    error: { x: [0, -2, 2, -2, 0], y: 0, rotate: 0, scale: 1 },
  };

  const bodyTransition = {
    asleep: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
    awake: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
    wave: { duration: 0.5, ease: "easeOut" },
    thinking: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
    happy: { duration: 0.6, ease: "easeOut" },
    error: { duration: 0.4, ease: "easeInOut" },
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* ambient particles */}
      <AnimatePresence>
        {state === "asleep" && (
          <motion.div
            key="zzz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -top-1 -right-1 pointer-events-none select-none"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute text-[8px] font-bold text-gray-400"
                style={{ right: i * 3.5 }}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], y: -12 }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.55, ease: "easeOut" }}
              >
                z
              </motion.span>
            ))}
          </motion.div>
        )}

        {state === "happy" && (
          <motion.div
            key="sparkles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none select-none"
          >
            {[
              { x: -6, y: -4, delay: 0 },
              { x: size + 2, y: -2, delay: 0.1 },
              { x: size / 2, y: -8, delay: 0.2 },
            ].map((p, i) => (
              <motion.span
                key={i}
                className="absolute text-[9px]"
                style={{ left: p.x, top: p.y }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.6] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: p.delay, ease: "easeOut" }}
              >
                ✦
              </motion.span>
            ))}
          </motion.div>
        )}

        {state === "thinking" && (
          <motion.div
            key="orbit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-end justify-center pb-[-2px] pointer-events-none select-none"
          >
            <div className="flex gap-0.5 absolute -bottom-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1 h-1 rounded-full bg-cyan-300"
                  animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={bodyAnimation[state]}
        transition={bodyTransition[state]}
      >
        {/* soft outer glow when awake/interacting */}
        {state !== "asleep" && (
          <motion.ellipse
            cx="20"
            cy="21"
            rx="17"
            ry="15"
            fill="url(#glow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.4 }}
          />
        )}

        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* body — rounded, egg-ish, off-white */}
        <ellipse cx="20" cy="22" rx="15" ry="13" fill="#f4f6f8" stroke="#d8dee3" strokeWidth="0.75" />

        {/* small side vents for detail */}
        <rect x="5" y="20" width="2.2" height="5" rx="1.1" fill="#d8dee3" />
        <rect x="32.8" y="20" width="2.2" height="5" rx="1.1" fill="#d8dee3" />

        {/* visor */}
        <rect x="9" y="16" width="22" height="12" rx="6" fill="#0b1220" />

        {/* eye content, swapped per state */}
        <AnimatePresence mode="wait">
          {state === "asleep" && (
            <motion.path
              key="eye-asleep"
              d="M13 22 Q20 25.5 27 22"
              stroke="#3b4a5a"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}

          {(state === "awake" || state === "wave") && (
            <motion.circle
              key="eye-awake"
              cx="20"
              cy="22"
              r="4.2"
              fill="#22d3ee"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{
                scale: state === "wave" ? [0.2, 1.3, 1] : 1,
                opacity: 1,
                cx: state === "wave" ? [20, 15, 25, 20] : 20,
              }}
              exit={{ scale: 0.2, opacity: 0 }}
              transition={{ duration: state === "wave" ? 0.5 : 0.2 }}
            />
          )}

          {state === "thinking" && (
            <motion.circle
              key="eye-thinking"
              cy="22"
              r="3.6"
              fill="#22d3ee"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, cx: [14, 26, 14] }}
              exit={{ opacity: 0 }}
              transition={{ cx: { duration: 1.6, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.2 } }}
            />
          )}

          {state === "happy" && (
            <motion.path
              key="eye-happy"
              d="M13 24 Q20 17 27 24"
              stroke="#22d3ee"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {state === "error" && (
            <motion.g
              key="eye-error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <path
                d="M13 20 Q20 25.5 27 20"
                stroke="#fb923c"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </motion.g>
          )}
        </AnimatePresence>

        {/* antenna */}
        <line x1="20" y1="9" x2="20" y2="4" stroke="#d8dee3" strokeWidth="1.6" strokeLinecap="round" />
        <motion.circle
          cx="20"
          cy="3.2"
          r="2"
          fill={state === "asleep" ? "#cbd5e1" : "#22d3ee"}
          animate={
            state === "asleep"
              ? { opacity: [0.5, 0.9, 0.5] }
              : { opacity: 1, scale: state === "wave" ? [1, 1.5, 1] : 1 }
          }
          transition={{ duration: state === "asleep" ? 2 : 0.5, repeat: state === "asleep" ? Infinity : 0 }}
        />
      </motion.svg>
    </div>
  );
};

export default BotAvatar;
