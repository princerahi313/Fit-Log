"use client";

import { useState } from "react";
import LibraryCard from "@/components/shared/LibraryCard";
import WorkoutSearch from "@/components/shared/WorkoutSearch";
import type { Workout } from "@/lib/workouts";

export default function WorkoutLibraryGrid({ workouts }: { workouts: Workout[] }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredWorkouts = normalizedQuery
    ? workouts.filter((workout) =>
        workout.name.toLowerCase().includes(normalizedQuery) ||
        workout.muscleGroups.some((tag) => tag.toLowerCase().includes(normalizedQuery)),
      )
    : workouts;

  return (
    <>
      <div className="mb-5 ml-auto w-full max-w-[350px]">
        <WorkoutSearch value={query} onChange={setQuery} placeholder="Search by name or tag" />
      </div>
      {filteredWorkouts.length === 0 ? (
        <div role="status" className="flex min-h-[240px] flex-col items-center justify-center rounded-[20px] border border-dashed border-[#292b32] px-5 text-center">
          <p className="text-[16px] text-[#a3a8b4]">No workouts match “{query.trim()}”.</p>
          <button type="button" onClick={() => setQuery("")} className="mt-4 text-sm font-semibold text-[#c9ff00] hover:text-[#d8ff45]">Clear search</button>
        </div>
      ) : (
        <>
          {normalizedQuery && <p className="mb-4 text-sm text-[#9299a6]" aria-live="polite">{filteredWorkouts.length} {filteredWorkouts.length === 1 ? "workout" : "workouts"} found</p>}
          <div className="grid grid-cols-3 items-stretch gap-[30px] max-[1050px]:grid-cols-2 max-[700px]:gap-5 max-[680px]:grid-cols-1 max-[520px]:gap-4">
            {filteredWorkouts.map((workout) => <LibraryCard key={workout.id} workout={workout} />)}
          </div>
        </>
      )}
    </>
  );
}
