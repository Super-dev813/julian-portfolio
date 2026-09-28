"use client";

import { Check, Copy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

/** Copies the address with visible and announced feedback; the mailto link beside it stays the fallback. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return; // Clipboard blocked (e.g. insecure context): nothing to confirm.
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className="inline-flex size-12 items-center justify-center rounded-full border border-input transition-colors hover:border-brand hover:text-brand"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "check" : "copy"}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="text-brand"
          >
            {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4 text-foreground" aria-hidden />}
          </motion.span>
        </AnimatePresence>
      </button>
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-3 py-1 text-xs text-brand-foreground"
          >
            Copied
          </motion.span>
        )}
      </AnimatePresence>
      <span role="status" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </div>
  );
}
