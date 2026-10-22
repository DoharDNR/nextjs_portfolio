import { Briefcase, MapPin, Calendar, Check, Quote } from "lucide-react";
import type { HistoryEntry } from "@/data/history";

export function DetailCard({ entry }: { entry: HistoryEntry }) {
  return (
    <>
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center rounded-full bg-accent-soft px-3 py-2 text-[11px] font-medium text-accent">{entry.category}</span>
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center text-accent" aria-hidden="true">◆</span>
          <span className="truncate text-base font-bold text-foreground">{entry.company}</span>
        </div>
      </header>
      <h3 className="mb-4 text-xl font-bold leading-tight text-foreground">{entry.title}</h3>
      <div className="mb-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1"><Briefcase className="h-4 w-4 text-accent" aria-hidden="true" /><span>{entry.jobType}</span></div>
        <div className="flex items-center gap-1"><MapPin className="h-4 w-4 text-accent" aria-hidden="true" /><span>{entry.location}</span></div>
        <div className="flex items-center gap-1"><Calendar className="h-4 w-4 text-accent" aria-hidden="true" /><span>{entry.dateLabel}</span></div>
      </div>
      <p className="mb-7 text-sm leading-[23px] text-muted-foreground">{entry.description}</p>
      <div className="mb-7">
        <h4 className="mb-3 text-sm font-semibold text-foreground">{entry.type === "education" ? "Achievements" : "Key Responsibilities"}</h4>
        <ul className="flex flex-col gap-2">
          {entry.responsibilities.map((item) => <li key={item} className="flex items-start gap-2 text-[13px] text-muted-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" /><span>{item}</span></li>)}
        </ul>
      </div>
      <div className="mb-7">
        <h4 className="mb-3 text-sm font-semibold text-foreground">{entry.type === "education" ? "Technologies or subjects" : "Technologies Used"}</h4>
        <div className="flex flex-wrap gap-2">
          {entry.technologies.map((tech) => <span key={tech} className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1.5 text-[11px] font-medium text-muted-foreground">{tech}</span>)}
        </div>
      </div>
      {entry.quote && <div className="flex gap-3 rounded-lg bg-accent-soft p-4 text-xs italic leading-5 text-muted-foreground"><Quote className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" /><p>{entry.quote}</p></div>}
    </>
  );
}
