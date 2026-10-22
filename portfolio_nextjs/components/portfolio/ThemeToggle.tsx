"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Theme = "light" | "dark" | "system";

const themeOptions: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: "light", label: "Light", icon: <Sun /> },
  { value: "dark", label: "Dark", icon: <Moon /> },
  { value: "system", label: "System", icon: <Monitor /> },
];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark" || stored === "system") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTheme(stored);
      }
    } catch { /* storage may be unavailable */ }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.theme = theme === "system" ? "" : theme;
    if (theme === "system") delete document.documentElement.dataset.theme;
    try { localStorage.setItem("theme", theme); } catch { /* storage may be unavailable */ }
  }, [ready, theme]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setOpen(false);
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [open]);

  const currentTheme = themeOptions.find((t) => t.value === theme) ?? themeOptions[2];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Change color theme, currently ${currentTheme.label}`}
        className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-card text-muted-text shadow-sm transition-colors duration-200 ease hover:border-accent hover:bg-accent-soft hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {currentTheme.icon}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-full right-0 z-50 mt-2 w-36 origin-top-right rounded-lg border border-line bg-popover py-1.5 text-popover-foreground shadow-xl focus:outline-none"
        >
          {themeOptions.map((option) => (
            <button
              key={option.value}
              role="menuitemradio"
              aria-checked={theme === option.value}
              onClick={() => {
                setTheme(option.value);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors duration-200 ease ${
                theme === option.value
                  ? "bg-accent-soft text-accent"
                  : "text-muted-text hover:bg-accent-soft hover:text-hover-text"
              } focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent`}
            >
              {option.icon}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
