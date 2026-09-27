"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFitLog } from "@/components/shared/FitLogProvider";
import WorkoutSearch from "@/components/shared/WorkoutSearch";
import type { Workout } from "@/lib/workouts";

type PlanTab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

function WorkoutStats({ workout }: { workout: Workout }) {
  return (
    <div className="mt-[10px] flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] leading-5 text-[#c6c9d0]">
      <span className="inline-flex items-center gap-[6px]"><svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-[#c9ff00] stroke-[1.7]"><circle cx="10" cy="10" r="7.5"/><path d="M10 5.5V10l3 1.8"/></svg>{workout.duration} min</span>
      <span className="inline-flex items-center gap-[6px]"><svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-[#c9ff00]"><path d="M10.2 1.8c.5 3-1.2 4.2-2.2 5.7-.8-1-.9-2-.9-2C4.6 7.5 3.3 10 3.3 12.4a6.7 6.7 0 0 0 13.4 0c0-4.4-3.2-7.9-6.5-10.6Zm-.1 15.1a3.2 3.2 0 0 1-3.2-3.2c0-1.1.5-2.1 1.6-3.4.2.9.7 1.5 1.5 2 .8-1.1 1.6-2 1.8-3.4 1 1.1 1.6 2.7 1.6 4.6a3.2 3.2 0 0 1-3.3 3.4Z"/></svg>{workout.caloriesBurned} kcal</span>
      <span className="inline-flex items-center gap-[6px]"><svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-[#c9ff00] stroke-[1.7]"><path d="m10 2.2 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L10 2.2Z"/></svg>{workout.rating.toFixed(1)}</span>
    </div>
  );
}

export default function MyPlan({ workouts, initialTab }: { workouts: Workout[]; initialTab: PlanTab }) {
  const [tab, setTab] = useState<PlanTab>(initialTab);
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [query, setQuery] = useState("");
  const { plannedIds, savedIds, doneIds, markDone, removeFromPlan } = useFitLog();
  const plannedWorkouts = plannedIds.map((id) => workouts.find((workout) => workout.id === id)).filter((workout): workout is Workout => Boolean(workout));
  const savedWorkouts = savedIds.map((id) => workouts.find((workout) => workout.id === id)).filter((workout): workout is Workout => Boolean(workout));
  const shownWorkouts = tab === "plan" ? plannedWorkouts : savedWorkouts;
  const normalizedQuery = query.trim().toLowerCase();
  const filteredWorkouts = normalizedQuery
    ? shownWorkouts.filter((workout) =>
        workout.name.toLowerCase().includes(normalizedQuery) ||
        workout.muscleGroups.some((tag) => tag.toLowerCase().includes(normalizedQuery)),
      )
    : shownWorkouts;
  const sortedWorkouts = [...filteredWorkouts].sort((a, b) => {
    if (sortBy === "calories") return a.caloriesBurned - b.caloriesBurned;
    if (sortBy === "rating") return a.rating - b.rating;
    return a.duration - b.duration;
  });
  const minutes = plannedWorkouts.reduce((total, workout) => total + workout.duration, 0);
  const calories = plannedWorkouts.reduce((total, workout) => total + workout.caloriesBurned, 0);

  return (
    <main className="mx-auto w-full max-w-[1600px] flex-1 border-x border-[#1b1c1f] bg-[#0b0c0e] px-[60px] pb-16 pt-[54px] max-[700px]:px-4 max-[700px]:pt-8">
      <header className="mb-[31px]">
        <h1 className="font-[Impact,'Arial_Narrow',sans-serif] text-[40px] font-bold uppercase leading-none text-[#f3f3f4] max-[520px]:text-[34px]">My Plan</h1>
        <p className="mt-[10px] text-[18px] leading-6 text-[#9ca2ad] max-[520px]:text-base">Cap of five lifts for today. Finish them, then load more.</p>
      </header>

      <section aria-label="Today's plan summary" className="grid grid-cols-3 rounded-[20px] border border-[#262932] bg-[#14161c] px-[30px] py-[38px] max-[520px]:px-4 max-[520px]:py-6">
        {[
          { label: "Exercises", value: plannedWorkouts.length, highlight: true },
          { label: "Minutes", value: minutes, highlight: false },
          { label: "Calories", value: calories, highlight: false },
        ].map(({ label, value, highlight }, index) => (
          <div key={label} className={`min-w-0 ${index > 0 ? "border-l border-[#262932] pl-[40px] max-[700px]:pl-5 max-[520px]:pl-3" : ""} ${index < 2 ? "mr-[40px] max-[700px]:mr-5 max-[520px]:mr-3" : ""}`}>
            <p className="text-[14px] leading-5 text-[#9ca2ad]">{label}</p>
            <p className={`mt-[5px] font-[Impact,'Arial_Narrow',sans-serif] text-[48px] leading-none ${highlight ? "text-[#c9ff00]" : "text-[#f3f3f4]"} max-[520px]:text-[38px]`}>{value}</p>
          </div>
        ))}
      </section>

      <div className="mb-[30px] mt-[40px] flex items-center justify-between gap-4 max-[900px]:flex-wrap max-[520px]:flex-col max-[520px]:items-stretch">
        <div className="inline-flex rounded-[15px] border border-[#262932] bg-[#14161c] p-[5px]" role="tablist" aria-label="Workout lists">
          {(["plan", "saved"] as const).map((item) => (
            <button key={item} id={`${item}-tab`} type="button" role="tab" aria-selected={tab === item} aria-controls="workout-list" onClick={() => setTab(item)} className={`min-w-[135px] rounded-[11px] px-4 py-[10px] text-[14px] transition-colors max-[520px]:min-w-[110px] ${tab === item ? "bg-[#20232b] font-semibold text-[#f3f3f4]" : "text-[#9299a6] hover:text-[#f3f3f4]"}`}>
              {item === "plan" ? "Today’s Plan" : "Saved"}
            </button>
          ))}
        </div>

        <div className="min-w-[180px] max-w-[350px] flex-1 max-[900px]:order-2 max-[900px]:w-full max-[900px]:max-w-none">
          <WorkoutSearch value={query} onChange={setQuery} placeholder="Search by name or tag" />
        </div>

        <label className="ml-auto flex items-center gap-[14px] text-[14px] text-[#9ca2ad] max-[900px]:order-3 max-[520px]:ml-0 max-[520px]:w-full max-[520px]:justify-between">
          <span>Sort By</span>
          <span className="relative inline-flex">
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)} aria-label="Sort workouts by" className="h-[44px] w-[117px] appearance-none rounded-[12px] border border-[#262932] bg-[#14161c] pl-[13px] pr-9 text-[14px] text-[#e3e4e8] outline-none transition-colors focus:border-[#657522]">
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute right-[10px] top-1/2 h-4 w-4 -translate-y-1/2 fill-none stroke-[#9ca2ad] stroke-[1.6]"><path d="m5 7.5 5 5 5-5" /></svg>
          </span>
        </label>
      </div>

      {shownWorkouts.length === 0 ? (
        <section id="workout-list" role="tabpanel" aria-labelledby={`${tab}-tab`} className="flex min-h-[374px] flex-col items-center justify-center rounded-[20px] border border-dashed border-[#292b32] px-5 text-center">
          <h2 className="font-[Impact,'Arial_Narrow',sans-serif] text-[28px] font-bold uppercase leading-none text-[#f3f3f4]">Nothing Here Yet</h2>
          <p className="mt-[10px] text-[14px] text-[#9ca2ad]">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="mt-[31px] inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#c9ff00] px-[30px] text-[14px] font-semibold text-[#111207] no-underline shadow-[0_8px_20px_rgba(201,255,0,.14)] transition-colors hover:bg-[#d8ff45] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9ff00]">Go to workouts</Link>
        </section>
      ) : sortedWorkouts.length === 0 ? (
        <section id="workout-list" role="tabpanel" aria-labelledby={`${tab}-tab`} className="flex min-h-[240px] flex-col items-center justify-center rounded-[20px] border border-dashed border-[#292b32] px-5 text-center">
          <p role="status" className="text-[16px] text-[#a3a8b4]">No workouts match “{query.trim()}”.</p>
          <button type="button" onClick={() => setQuery("")} className="mt-4 text-sm font-semibold text-[#c9ff00] hover:text-[#d8ff45]">Clear search</button>
        </section>
      ) : (
        <section id="workout-list" role="tabpanel" aria-labelledby={`${tab}-tab`} className="space-y-[20px]">
          {sortedWorkouts.map((workout) => (
            <article key={workout.id} className="flex min-h-[142px] items-center gap-5 rounded-[20px] border border-[#262932] bg-[#14161c] p-5 max-[700px]:flex-wrap max-[520px]:gap-4 max-[520px]:p-4">
              <div className="relative h-[100px] w-[180px] shrink-0 overflow-hidden rounded-[12px] bg-[#202126] max-[520px]:h-[88px] max-[520px]:w-[120px]">
                <Image src={workout.image} alt="" fill unoptimized sizes="180px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-[Impact,'Arial_Narrow',sans-serif] text-[22px] font-bold uppercase leading-tight text-[#f3f3f4]">{workout.name}</h2>
                <p className="mt-[3px] text-[14px] leading-5 text-[#9ca2ad]">{workout.equipment}</p>
                <WorkoutStats workout={workout} />
              </div>
              <div className="ml-auto flex shrink-0 items-center gap-2 max-[700px]:w-full max-[700px]:justify-end max-[520px]:flex-wrap">
                <Link href={`/workout/${workout.id}`} className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#414854] px-[22px] text-[14px] text-[#e3e4e8] no-underline transition-colors hover:border-[#777e8a] hover:bg-[#1c1f26] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9ff00] max-[520px]:flex-1">View Details</Link>
                {tab === "plan" && (
                  <>
                    <button type="button" onClick={() => markDone(workout.id)} disabled={doneIds.includes(workout.id)} aria-pressed={doneIds.includes(workout.id)} className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-4 text-[14px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9ff00] disabled:cursor-default ${doneIds.includes(workout.id) ? "border border-[#3b4325] text-[#c9ff00]" : "bg-[#c9ff00] text-[#111207] hover:bg-[#d8ff45]"}`}>
                      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current stroke-[2]"><path d="m4 10 4 4 8-8" /></svg>
                      {doneIds.includes(workout.id) ? "Done" : "Mark as Done"}
                    </button>
                    <button type="button" onClick={() => removeFromPlan(workout.id)} aria-label={`Remove ${workout.name} from today's plan`} className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#9299a6] transition-colors hover:bg-[#22252d] hover:text-[#f3f3f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9ff00]">
                      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current stroke-[1.7]"><path d="m5 5 10 10M15 5 5 15" /></svg>
                    </button>
                  </>
                )}
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
