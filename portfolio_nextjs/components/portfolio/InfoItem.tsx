import { type ReactNode } from "react";

type InfoItemProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

export function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex min-w-0 items-center gap-6">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#aab8cc]" aria-hidden="true">{icon}</span>
      <div className="min-w-0">
        <span className="block text-xs text-[#aab8cc]">{label}</span>
        <span className="mt-1 block truncate text-[13px] text-[#e4e7ed]">{value}</span>
      </div>
    </div>
  );
}
