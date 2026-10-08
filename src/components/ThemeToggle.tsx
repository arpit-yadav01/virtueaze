"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#bf953f]/40 text-[#dfc285] hover:bg-[#bf953f]/10 transition-colors shadow-[0_0_12px_rgba(191,149,63,0.2)]">
        <span className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 flex items-center justify-center rounded-full border border-[#bf953f]/40 text-[#bf953f] dark:text-[#dfc285] hover:bg-[#bf953f]/10 transition-colors shadow-[0_0_12px_rgba(191,149,63,0.2)]"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}