import { Briefcase, Code, GraduationCap, ChevronRight } from "lucide-react";
import type { HistoryEntry } from "@/data/history";

type TimelineItemProps = {
  entry: HistoryEntry;
  isActive: boolean;
  onClick: () => void;
};

export function TimelineItem({ entry, isActive, onClick }: TimelineItemProps) {
  const Icon = entry.type === "work" ? Briefcase : entry.type === "internship" ? Code : GraduationCap;

  return (
    <button
      type="button"
      className={`relative flex min-h-17.75 w-full items-center gap-4 rounded-lg border px-4 py-3 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isActive ? "border-accent-soft bg-accent-soft" : "border-transparent hover:bg-muted-surface dark:hover:bg-muted-surface"}`}
      data-active={isActive}
      aria-pressed={isActive}
      onClick={onClick}
    >
      <span
        className="timeline-line absolute top-0 -bottom-4.5 hidden w-0.5 bg-line md:block"
        aria-hidden="true"
      />
      <span
        className={`timeline-dot absolute top-1.5 z-10 hidden h-3.5 w-3.5 rounded-full md:block ${isActive ? "bg-accent" : "border-2 border-line bg-card"}`}
        aria-hidden="true"
      />
      <span className="w-36.25 shrink-0 text-[11px] font-medium text-muted-foreground md:block">{entry.dateRange}</span>
      <span
        className={`z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] ${isActive ? "bg-accent-soft" : "bg-muted"}`}
      >
        <Icon className={`h-5 w-5 ${isActive ? "text-accent" : "text-muted-foreground"}`} aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="line-clamp-2 text-sm font-semibold text-foreground">{entry.title}</span>
        <span className="mt-1 text-xs text-muted-foreground">{entry.metadata}</span>
      </span>
      <ChevronRight
        className={`h-4 w-4 shrink-0 transition-colors ${isActive ? "text-accent" : "text-muted-foreground"}`}
        aria-hidden="true"
      />
    </button>
  );
}
