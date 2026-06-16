"use client";

import { cn } from "@/lib/utils";

interface MasonryGridProps {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}

export function MasonryGrid({ children, className, gap = 4 }: MasonryGridProps) {
  return (
    <div
      className={cn("columns-1 sm:columns-2 lg:columns-3 xl:columns-4", className)}
      style={{ columnGap: `${gap * 4}px` }}
    >
      {children}
    </div>
  );
}

export function MasonryItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("break-inside-avoid mb-4", className)}>{children}</div>;
}
