"use client";

import { useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeBlockProps = {
  language: string;
  code: string;
};

export function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  // Map language names to syntax highlighter language codes
  const getLanguageCode = (lang: string): string => {
    const langMap: Record<string, string> = {
      JavaScript: "javascript",
      Python: "python",
      Java: "java",
    };
    return langMap[lang] || "text";
  };

  // Prevent hydration mismatch by ensuring resolvedTheme is defined before using it
  // During SSR and initial render, use dark theme as default
  // Only use resolvedTheme after component is mounted AND theme is resolved
  // This ensures consistency between SSR and client-side hydration
  const isDark =
    mounted && resolvedTheme !== undefined ? resolvedTheme === "dark" : true; // Default to dark theme during SSR and before theme resolution
  const highlightStyle = isDark ? vscDarkPlus : vs;

  return (
    <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800/70 dark:bg-zinc-900/80 dark:shadow-inner dark:shadow-zinc-900/70">
      {/* Header - Fixed height */}
      <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800/70 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 dark:border-emerald-500/60 dark:bg-emerald-500/10 dark:text-emerald-100 dark:hover:bg-emerald-500/20 dark:focus-visible:ring-offset-zinc-950"
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? (
              <>
                <Check className="size-3" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="size-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-b-xl bg-zinc-50 dark:bg-zinc-950/70">
        <SyntaxHighlighter
          language={getLanguageCode(language)}
          style={highlightStyle}
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
            fontSize: "0.875rem",
            lineHeight: "1.6",
          }}
          codeTagProps={{
            style: {
              fontFamily:
                "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
