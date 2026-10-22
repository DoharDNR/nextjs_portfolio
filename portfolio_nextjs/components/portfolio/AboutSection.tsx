"use client";

import { Code, Mail, MapPin, UserRound } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { historyEntries } from "@/data/history";
import { DetailCard } from "@/components/portfolio/DetailCard";
import { InfoItem } from "@/components/portfolio/InfoItem";
import { TimelineItem } from "@/components/portfolio/TimelineItem";

const identity = {
  name: "Dohar Siregar",
  role: "Full-Stack Web Developer",
  email: "doharsiregar10@gmail.com",
  location: "Yogyakarta, Indonesia",
} as const;

export default function AboutSection() {
  const [selectedId, setSelectedId] = useState(historyEntries[0]?.id ?? "");
  const selectedEntry = historyEntries.find((entry) => entry.id === selectedId) ?? historyEntries[0];

  return (
    <>
      <section className="bg-[var(--hero)] py-12 pb-8 text-slate-50" id="about" aria-labelledby="intro-title">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12.5">
          <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1fr)_192px_minmax(240px,280px)] lg:gap-[clamp(28px,5vw,72px)]">
            <div className="max-w-[540px]">
              <span className="inline-flex rounded-full bg-[#243b60] px-4 py-1.5 text-sm font-semibold text-[#68a0ff]">About Me</span>
              <h1 id="intro-title" className="mt-5 text-[clamp(2.5rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-[-.05em]">Hi, I&apos;m <span className="text-[#68a0ff]">{identity.name.split(" ")[0]}</span></h1>
              <p className="mt-3.5 max-w-[500px] text-base leading-[1.625] text-[var(--hero-muted)]">I&apos;m a Frontend Developer with a passion for building beautiful, fast, and accessible web experiences. I love turning ideas into interactive products that make an impact.</p>
            </div>
            <Image className="h-48 w-48 rounded-full border-4 border-[var(--hero-line)] object-cover" src="/IMG_4745.webp" alt={`Portrait of ${identity.name}`} width={192} height={192} priority />
            <div className="flex flex-col gap-4.5 lg:max-w-[280px]">
              <InfoItem icon={<UserRound />} label="Name" value={identity.name} />
              <InfoItem icon={<MapPin />} label="Location" value={identity.location} />
              <InfoItem icon={<Mail />} label="Email" value={identity.email} />
              <InfoItem icon={<Code />} label="Role" value={identity.role} />
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-[var(--line)] bg-[var(--background)] py-12 pb-16" id="journey" aria-labelledby="journey-title">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12.5">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[.08em] text-[var(--accent)]">My journey</p>
              <h2 id="journey-title" className="text-[clamp(1.85rem,4vw,2.25rem)] font-bold leading-[1.15] tracking-[-.04em]">Work &amp; Education History</h2>
              <p className="mt-2 text-[.9375rem] text-[var(--muted)]">A timeline of my journey, from learning to building real-world products.</p>
              <div className="mt-9 flex flex-col gap-3.5" aria-label="History timeline">
                {historyEntries.map((entry) => <TimelineItem key={entry.id} entry={entry} isActive={entry.id === selectedId} onClick={() => setSelectedId(entry.id)} />)}
              </div>
            </div>
            {selectedEntry && <article className="min-w-0 rounded-xl border border-[var(--line)] bg-[var(--card)] p-6 shadow-[var(--shadow-card)]" aria-live="polite" aria-label="Selected history detail"><DetailCard entry={selectedEntry} /></article>}
          </div>
        </div>
      </section>
    </>
  );
}
