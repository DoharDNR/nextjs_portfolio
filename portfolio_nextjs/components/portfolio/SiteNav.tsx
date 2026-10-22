"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "/#about", id: "about", type: "anchor" },
  { label: "Journey", href: "/#journey", id: "journey", type: "anchor" },
  { label: "Projects", href: "/projects", id: "projects", type: "route" },
  { label: "Contact", href: "/#contact", id: "contact", type: "anchor" },
] as const;

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const isCurrent = (item: (typeof links)[number]) => {
    if (item.type === "anchor") return hash === `#${item.id}`;
    if (item.type === "route") return pathname === item.href;
    return false;
  };

  return <>
    <button className="block rounded border border-line bg-card px-2.5 py-1.5 text-sm text-foreground md:hidden" type="button" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}>Menu</button>
    <nav id="primary-nav" className={`${open ? "absolute right-5 top-[78px] flex flex-col gap-3 border border-line bg-card p-4" : "hidden"} text-muted-text md:static md:flex md:flex-row md:items-center md:gap-9 md:border-0 md:bg-transparent md:p-0`} aria-label="Primary navigation">
      {links.map((item) => {
        const active = isCurrent(item);
        return (
          <Link
            className={`text-sm font-medium transition-colors duration-200 ease ${active ? "text-accent" : "text-muted-text hover:text-hover-text"}`}
            key={item.label}
            href={item.href}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  </>;
}
