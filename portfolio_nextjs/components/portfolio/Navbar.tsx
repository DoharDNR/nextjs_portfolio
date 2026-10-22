"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Journey", href: "/#journey" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/#contact" },
] as const;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hash, setHash] = useState("");
  const pathname = usePathname();

  const closeDrawer = () => setMenuOpen(false);
  const isActive = (href: string) => href === "/projects" ? pathname === href : href === "/" ? pathname === "/" && !hash : pathname === "/" && hash === href.slice(1);

  useEffect(() => {
    const updatePosition = () => {
      const sections = ["about", "journey", "contact"]
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null);
      const current = sections.find((section) => section.getBoundingClientRect().top <= 140 && section.getBoundingClientRect().bottom > 140);
      if (current) setHash(`#${current.id}`);
      else if (window.scrollY < 160) setHash("");
    };

    updatePosition();
    window.addEventListener("hashchange", updatePosition);
    window.addEventListener("scroll", updatePosition, { passive: true });
    return () => {
      window.removeEventListener("hashchange", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && closeDrawer();
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <Link className="brand" href="/" aria-label="Dohar home" onClick={closeDrawer}>
            Dohar<span>.</span>
          </Link>

          {/* Desktop nav links — centered */}
          <nav className="navbar-nav-desktop" aria-label="Primary navigation">
            {links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`navbar-link navbar-link-desktop ${isActive(item.href) ? "navbar-link-active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Theme toggle — always on the right */}
          <div className="navbar-theme-toggle">
            <ThemeToggle />
          </div>

          <button
            type="button"
            className="navbar-hamburger"
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div id="mobile-drawer" className={`navbar-drawer ${menuOpen ? "navbar-drawer-open" : ""}`} aria-label="Mobile navigation">
        <nav className="navbar-nav-drawer" aria-label="Mobile navigation">
          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`navbar-link navbar-link-drawer ${isActive(item.href) ? "navbar-link-active" : ""}`}
              onClick={closeDrawer}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
