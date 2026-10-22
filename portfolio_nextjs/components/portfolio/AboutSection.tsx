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
      {/* Profile Hero */}
      <section className="bg-hero py-12 pb-6 text-hero-foreground" id="about" aria-labelledby="intro-title">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12.5">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[2fr_1fr_auto] md:gap-12 lg:grid-cols-[2fr_1fr_auto]">
            <div className="max-w-120">
              <span className="inline-flex rounded-full bg-hero-line px-4 py-1.5 text-sm font-semibold text-hero-accent">
                About Me
              </span>
              <h1
                id="intro-title"
                className="mt-5 text-[28px] font-extrabold leading-tight tracking-tighter sm:text-[36px] md:text-[42px] lg:text-5xl"
              >
                Hi, I&apos;m <span className="text-hero-accent">{identity.name.split(" ")[0]}</span>
              </h1>
              <p className="mt-3.5 max-w-120 text-[15px] leading-6.5 text-hero-muted">
                I&apos;m a Frontend Developer with a passion for building beautiful, fast, and accessible web
                experiences. I love turning ideas into interactive products that make an impact.
              </p>
            </div>
            <Image
              className="mx-auto h-37.5 w-37.5 rounded-full object-center object-cover sm:h-42.5 sm:w-42.5 md:h-48 md:w-48"
              src="/IMG_4745.webp"
              alt={`Portrait of ${identity.name}`}
              width={192}
              height={192}
              priority
            />
            <div className="ml-20 flex flex-col items-start gap-5.5 md:ml-0 lg:ml-0">
              <InfoItem icon={<UserRound />} label="Name" value={identity.name} />
              <InfoItem icon={<MapPin />} label="Location" value={identity.location} />
              <InfoItem icon={<Mail />} label="Email" value={identity.email} />
              <InfoItem icon={<Code />} label="Role" value={identity.role} />
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="border-t border-line bg-background py-12 pb-16" id="journey" aria-labelledby="journey-title">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12.5">
          <div className="grid grid-cols-1 items-start gap-8 md:gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-accent">MY JOURNEY</p>
              <h2
                id="journey-title"
                className="text-[clamp(1.5rem,4vw,1.875rem)] font-bold leading-tight text-foreground"
              >
                Work &amp; Education History
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                A timeline of my journey, from learning to building real-world products.
              </p>
              
              {/* History Timeline */}
              <div className="mt-9 flex flex-col gap-3.5" aria-label="History timeline">
                {historyEntries.map((entry) => (
                  <TimelineItem
                    key={entry.id}
                    entry={entry}
                    isActive={entry.id === selectedId}
                    onClick={() => setSelectedId(entry.id)}
                  />
                ))}
              </div>
            </div>
            {/* Selected History Detail */}
            {selectedEntry && (
              <article
                className="h-full min-w-0 rounded-[10px] border border-line bg-card p-5 shadow-(--shadow-card) sm:p-6"
                aria-live="polite"
                aria-label="Selected history detail"
              >
                <DetailCard entry={selectedEntry} />
              </article>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
