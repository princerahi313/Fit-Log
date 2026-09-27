import { connection } from "next/server";
import WorkoutLibraryGrid from "@/components/home/WorkoutLibraryGrid";
import { getWorkouts } from "@/lib/workouts";

export default async function Library() {
  await connection();

  let workouts;
  try {
    workouts = await getWorkouts();
  } catch (error) {
    console.error("Failed to load the workout library:", error);

    return (
      <section id="library" className="mt-[80px] scroll-mt-8 max-[700px]:mt-14" aria-labelledby="library-heading">
        <h2 id="library-heading" className="font-[Impact,'Arial_Narrow',sans-serif] text-[40px] font-bold uppercase leading-none text-[#f3f3f4] max-[520px]:text-[34px]">The Library</h2>
        <p className="mt-[10px] text-[18px] leading-6 text-[#a3a8b4] max-[520px]:text-base">Twelve lifts covering every major muscle group.</p>
        <p role="status" className="mt-8 rounded-xl border border-[#34363d] bg-[#15161a] p-5 text-sm text-[#a3a8b4]">The workout library couldn&apos;t load. Please refresh to try again.</p>
      </section>
    );
  }

  return (
    <section id="library" className="mt-[80px] scroll-mt-8 max-[700px]:mt-14" aria-labelledby="library-heading">
      <div className="mb-[28px]">
        <h2 id="library-heading" className="font-[Impact,'Arial_Narrow',sans-serif] text-[40px] font-bold uppercase leading-none text-[#f3f3f4] max-[520px]:text-[34px]">The Library</h2>
        <p className="mt-[10px] text-[18px] leading-6 text-[#a3a8b4] max-[520px]:text-base">Twelve lifts covering every major muscle group.</p>
      </div>

      <WorkoutLibraryGrid workouts={workouts} />
    </section>
  );
}
