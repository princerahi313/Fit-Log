"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFitLog } from "@/components/shared/FitLogProvider";
import type { Workout } from "@/lib/workouts";

type PlanTab = "plan" | "saved";

export default function MyPlan({ workouts, initialTab }: { workouts: Workout[]; initialTab: PlanTab }) {
  const [tab, setTab] = useState<PlanTab>(initialTab);
  const { plannedIds, savedIds } = useFitLog();
  const ids = tab === "plan" ? plannedIds : savedIds;
  const selected = ids.map((id) => workouts.find((workout) => workout.id === id)).filter((workout): workout is Workout => Boolean(workout));

  return (
    <main className="mx-auto min-h-[calc(100vh-102px)] w-full max-w-[1600px] flex-1 border-x border-[#1b1c1f] bg-[#0b0c0e] px-[29px] pb-16 pt-[60px] max-[700px]:px-4 max-[700px]:pt-8">
      <header className="mb-9">
        <p className="text-[13px] font-bold uppercase tracking-[.12em] text-[#c9ff00]">Your training</p>
        <h1 className="mt-3 font-[Impact,'Arial_Narrow',sans-serif] text-[42px] uppercase leading-none text-[#f3f3f4] max-[520px]:text-[36px]">My Plan</h1>
      </header>

      <div className="mb-8 flex gap-2 border-b border-[#25272e]" role="tablist" aria-label="My workouts">
        {(["plan", "saved"] as const).map((item) => (
          <button key={item} id={`${item}-tab`} type="button" role="tab" aria-selected={tab === item} aria-controls="workout-list" onClick={() => setTab(item)} className={`-mb-px border-b-2 px-5 py-3 text-sm font-medium capitalize transition-colors ${tab === item ? "border-[#c9ff00] text-[#c9ff00]" : "border-transparent text-[#a3a8b4] hover:text-[#f3f3f4]"}`}>
            {item === "plan" ? "Today’s Plan" : "Saved"} <span className="ml-1 opacity-75">({item === "plan" ? plannedIds.length : savedIds.length})</span>
          </button>
        ))}
      </div>

      {selected.length === 0 ? (
        <div id="workout-list" role="tabpanel" aria-labelledby={`${tab}-tab`} className="rounded-[20px] border border-[#24262c] bg-[#15161a] px-6 py-12 text-center">
          <p className="text-lg font-semibold text-[#f3f3f4]">{tab === "plan" ? "No workouts planned yet" : "No saved workouts yet"}</p>
          <p className="mt-2 text-sm text-[#a3a8b4]">{tab === "plan" ? "Add a workout from its details page to build today's session." : "Save workouts from their details pages to find them here."}</p>
          <Link href="/#library" className="mt-5 inline-flex rounded-lg bg-[#c9ff00] px-5 py-3 text-sm font-bold text-[#111207] no-underline hover:bg-[#d8ff45]">Browse workouts</Link>
        </div>
      ) : (
        <div id="workout-list" role="tabpanel" aria-labelledby={`${tab}-tab`} className="grid grid-cols-2 gap-5 max-[800px]:grid-cols-1">
          {selected.map((workout) => (
            <article key={workout.id} className="flex items-center gap-5 rounded-[18px] border border-[#24262c] bg-[#15161a] p-4 max-[520px]:items-start max-[520px]:gap-4">
              <div className="relative h-[120px] w-[150px] shrink-0 overflow-hidden rounded-xl bg-[#202126] max-[520px]:h-[96px] max-[520px]:w-[112px]">
                <Image src={workout.image} alt="" fill unoptimized sizes="150px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap gap-2">
                  {workout.muscleGroups.map((group) => <span key={group} className="rounded-full bg-[#c9ff00] px-2.5 py-1 text-[10px] font-bold uppercase text-[#111207]">{group}</span>)}
                </div>
                <h2 className="mt-2 font-[Impact,'Arial_Narrow',sans-serif] text-[21px] uppercase leading-tight text-[#f3f3f4]">{workout.name}</h2>
                <p className="mt-1 text-sm text-[#a3a8b4]">{workout.duration} min · {workout.equipment}</p>
                <Link href={`/workout/${workout.id}`} className="mt-3 inline-flex text-sm font-semibold text-[#c9ff00] no-underline hover:text-[#d8ff45]">View Details <span aria-hidden="true" className="ml-1">→</span></Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
