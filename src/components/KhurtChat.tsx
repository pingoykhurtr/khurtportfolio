import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { chatWithKhurt } from "@/lib/api/chat.functions";
import formalAsset from "@/assets/formal.png.asset.json";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Tell me about yourself",
  "What are your skills?",
  "What is ACMES CORE?",
  "How can I contact you?",
];

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm **Khurt**, your AI portfolio assistant. Ask me anything about my skills, projects, or experience — in English or Tagalog.",
};

export function KhurtChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const seen = typeof window !== "undefined" && sessionStorage.getItem("khurt-welcome-seen");
    if (seen) return;
    const showT = setTimeout(() => setShowWelcome(true), 1200);
    const hideT = setTimeout(() => {
      setShowWelcome(false);
      try { sessionStorage.setItem("khurt-welcome-seen", "1"); } catch {}
    }, 7500);
    return () => { clearTimeout(showT); clearTimeout(hideT); };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) {
      setShowWelcome(false);
      inputRef.current?.focus();
    }
  }, [open]);

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || loading) return;
    const next: ChatMessage[] = [...messages, { role: "user", content: clean }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const { reply } = await chatWithKhurt({
        data: { messages: next.slice(-12) },
      });
      setMessages((m) => [
        ...m,
        { role: "assistant", content: reply || "Sorry, I couldn't come up with a reply. Try again?" },
      ]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setMessages((m) => [...m, { role: "assistant", content: msg }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Welcome bubble */}
      <AnimatePresence>
        {showWelcome && !open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-5 z-[69] max-w-[240px] rounded-2xl rounded-br-sm border border-primary/30 bg-card p-3 pr-8 text-xs text-foreground shadow-[var(--shadow-elevated)] sm:right-6"
          >
            <button
              onClick={() => { setShowWelcome(false); try { sessionStorage.setItem("khurt-welcome-seen", "1"); } catch {} }}
              aria-label="Dismiss"
              className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
            <div className="font-display text-sm font-semibold text-primary">Hi, I'm Khurt 👋</div>
            <div className="mt-1 leading-snug text-muted-foreground">
              Your AI portfolio assistant. Ask me anything about my skills, projects, or experience.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating launcher */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open AI assistant"}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="group fixed bottom-5 right-5 z-[70] grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-glow)] ring-2 ring-primary/20 sm:bottom-6 sm:right-6"
      >
        {/* Soft pulsing glow */}
        <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-primary/30" />

        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="ai"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* AI badge */}
        {!open && (
          <span className="absolute -right-1 -top-1 rounded-full border-2 border-background bg-foreground px-1.5 py-[1px] font-mono text-[9px] font-bold leading-none tracking-wider text-background">
            AI
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-[70] flex w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-card text-foreground shadow-[var(--shadow-elevated)] sm:right-6"
            style={{ height: "min(560px, calc(100vh - 8rem))" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-gradient-to-r from-primary/10 to-primary-glow/10 px-4 py-3">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-primary/60">
                <img src={formalAsset.url} alt="Khurt" className="h-full w-full object-cover" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-500" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 font-display text-sm font-semibold">
                  Khurt
                  <span className="rounded-full bg-primary/20 px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider text-primary">AI</span>
                </div>
                <div className="text-[11px] text-muted-foreground">Portfolio assistant · online</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="khurt-scroll flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground"
                        : "khurt-md max-w-[85%] rounded-2xl rounded-bl-sm bg-surface px-3 py-2 text-sm text-foreground"
                    }
                  >
                    {m.role === "assistant" ? (
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    ) : (
                      m.content
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-surface px-3 py-2.5">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
                  </div>
                </div>
              )}

              {messages.length <= 1 && !loading && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] text-muted-foreground transition hover:border-primary/50 hover:text-primary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border bg-background/60 p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my portfolio…"
                disabled={loading}
                className="h-10 flex-1 rounded-full border border-border bg-surface px-4 text-sm outline-none transition focus:border-primary"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
