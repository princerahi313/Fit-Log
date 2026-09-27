import Image from "next/image";
import { notFound } from "next/navigation";
import WorkoutActions from "@/components/workout/WorkoutActions";
import { getWorkout } from "@/lib/workouts";

export default async function WorkoutPage({ params }: PageProps<"/workout/[id]">) {
  const { id } = await params;
  let workout;

  try {
    workout = await getWorkout(id);
  } catch (error) {
    console.error(`Failed to load workout ${id}:`, error);
    return (
      <main className="mx-auto min-h-[calc(100vh-102px)] w-full max-w-[1600px] flex-1 border-x border-[#1b1c1f] bg-[#0b0c0e] px-[29px] py-[60px] max-[700px]:px-4 max-[700px]:py-8">
        <p role="status" className="rounded-xl border border-[#34363d] bg-[#15161a] p-6 text-[#a3a8b4]">This workout couldn&apos;t be loaded. Please try again.</p>
      </main>
    );
  }

  if (!workout) notFound();

  return (
    <main className="mx-auto min-h-[calc(100vh-102px)] w-full max-w-[1600px] flex-1 border-x border-[#1b1c1f] bg-[#0b0c0e] px-[29px] py-[60px] max-[700px]:px-4 max-[700px]:py-8">
      <div className="grid grid-cols-2 items-start gap-[60px] max-[850px]:grid-cols-1 max-[850px]:gap-8">
        <div className="relative aspect-square overflow-hidden rounded-[20px] bg-[#15161a] max-[850px]:aspect-[1.3/1] max-[520px]:aspect-square">
          <Image className="object-cover" src={workout.image} alt={`${workout.name} exercise illustration`} fill unoptimized sizes="(max-width: 850px) 100vw, 50vw" priority />
        </div>

        <article className="pt-1">
          <h1 className="font-[Impact,'Arial_Narrow',sans-serif] text-[48px] font-bold uppercase leading-[1.02] text-[#f3f3f4] max-[520px]:text-[38px]">{workout.name}</h1>
          <p className="mt-4 text-[18px] leading-[1.55] text-[#a3a8b4]">{workout.description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {workout.muscleGroups.map((group) => <span key={group} className="rounded-full bg-[#c9ff00] px-4 py-1.5 text-sm font-semibold text-[#111207]">{group}</span>)}
          </div>

          <dl className="mt-8 overflow-hidden rounded-[20px] border border-[#262932] bg-[#151820]">
            {[
              ["Equipment", workout.equipment],
              ["Difficulty", workout.difficulty],
              ["Sets", String(workout.sets)],
              ["Reps", workout.reps],
              ["Duration", `${workout.duration} min`],
              ["Calories", `${workout.caloriesBurned} kcal`],
              ["Rating", workout.rating.toFixed(1)],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between border-b border-[#262932] px-[30px] py-[17px] last:border-b-0 max-[520px]:px-5">
                <dt className="text-sm font-bold uppercase tracking-[.04em] text-[#9ca2ad]">{label}</dt>
                <dd className="text-right text-[16px] text-[#e3e4e8]">{value}</dd>
              </div>
            ))}
          </dl>

          <section className="mt-10" aria-labelledby="instructions-heading">
            <h2 id="instructions-heading" className="text-[20px] font-bold uppercase tracking-[.03em] text-[#f3f3f4]">Instructions</h2>
            <ol className="mt-5 space-y-4 text-[16px] leading-[1.5] text-[#c6c9d0]">
              {workout.instructions.map((instruction, index) => <li key={instruction} className="flex gap-3"><span className="text-[#9ca2ad]">{index + 1}.</span><span>{instruction}</span></li>)}
            </ol>
          </section>

          <WorkoutActions workoutId={workout.id} />
        </article>
      </div>
    </main>
  );
}
