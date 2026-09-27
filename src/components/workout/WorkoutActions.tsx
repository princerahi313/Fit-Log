"use client";

import { useFitLog } from "@/components/shared/FitLogProvider";

export default function WorkoutActions({ workoutId }: { workoutId: number }) {
  const { plannedIds, savedIds, addToPlan, saveForLater } = useFitLog();
  const isPlanned = plannedIds.includes(workoutId);
  const isSaved = savedIds.includes(workoutId);

  return (
    <div className="mt-[50px] flex flex-wrap gap-5 max-[520px]:mt-8 max-[520px]:gap-3">
      <button
        type="button"
        onClick={() => addToPlan(workoutId)}
        className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-[15px] bg-[#c9ff00] px-7 text-[16px] font-semibold text-[#111207] transition-colors hover:bg-[#d8ff45] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9ff00] max-[520px]:min-h-12 max-[520px]:px-5 max-[520px]:text-sm"
        aria-pressed={isPlanned}
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-none stroke-current stroke-[1.7]"><rect x="3" y="4" width="14" height="13" rx="2" /><path d="M6.5 2.5v3M13.5 2.5v3M3 8h14M10 10.5v4M8 12.5h4" /></svg>
        {isPlanned ? "Added to today's plan" : "Add to today's plan"}
      </button>
      <button
        type="button"
        onClick={() => saveForLater(workoutId)}
        className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-[15px] border border-[#3b414c] px-7 text-[16px] font-medium text-[#e3e4e8] transition-colors hover:border-[#777e8a] hover:bg-[#17191f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9ff00] max-[520px]:min-h-12 max-[520px]:px-5 max-[520px]:text-sm"
        aria-pressed={isSaved}
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-none stroke-current stroke-[1.7]"><path d="M5 3.5h10v14l-5-3.2-5 3.2v-14Z" /></svg>
        {isSaved ? "Saved for later" : "Save for later"}
      </button>
    </div>
  );
}
