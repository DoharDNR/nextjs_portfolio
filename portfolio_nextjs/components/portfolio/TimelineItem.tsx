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
      className={`relative flex min-h-[71px] w-full items-center gap-4 rounded-lg border px-4 py-3 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${isActive ? "border-[#d9e5ff] bg-[#eff4ff]" : "border-transparent hover:bg-black/3 dark:hover:bg-white/5"}`}
      aria-pressed={isActive}
      onClick={onClick}
    >
      <span className="absolute bottom-[-14px] left-[38px] top-1/2 hidden w-px -translate-y-1/2 bg-[#d9e1ec] md:block" aria-hidden="true" />
      <span className={`absolute left-8 top-1/2 z-10 hidden h-3.5 w-3.5 -translate-y-1/2 rounded-full md:block ${isActive ? "bg-[#4f83ff]" : "border-2 border-[#d9e1ec] bg-white"}`} aria-hidden="true" />
      <span className="w-[145px] shrink-0 text-[11px] text-[var(--muted)] md:block">{entry.dateRange}</span>
      <span className={`z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] ${isActive ? "bg-[#dfe9ff]" : "bg-[#f5f5f5] dark:bg-white/8"}`}>
        <Icon className={`h-5 w-5 ${isActive ? "text-[#3b57d6]" : "text-[var(--foreground)]"}`} aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="line-clamp-2 text-sm font-semibold text-[var(--foreground)]">{entry.title}</span>
        <span className="mt-1 text-xs text-[var(--muted)]">{entry.metadata}</span>
      </span>
      <ChevronRight className={`h-4 w-4 shrink-0 ${isActive ? "text-[#3b57d6]" : "text-[var(--muted)]"}`} aria-hidden="true" />
    </button>
  );
}
