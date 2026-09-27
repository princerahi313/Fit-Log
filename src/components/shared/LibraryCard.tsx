import Link from "next/link";
import Image from "next/image";
import type { Workout } from "@/lib/workouts";

function StatIcon({ kind }: { kind: "time" | "calories" | "rating" }) {
  if (kind === "time") {
    return <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current stroke-[1.7]"><circle cx="10" cy="10" r="7.5" /><path d="M10 5.5V10l3 1.8" /></svg>;
  }
  if (kind === "calories") {
    return <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-current"><path d="M10.2 1.8c.5 3-1.2 4.2-2.2 5.7-.8-1-.9-2-.9-2C4.6 7.5 3.3 10 3.3 12.4a6.7 6.7 0 0 0 13.4 0c0-4.4-3.2-7.9-6.5-10.6Zm-.1 15.1a3.2 3.2 0 0 1-3.2-3.2c0-1.1.5-2.1 1.6-3.4.2.9.7 1.5 1.5 2 .8-1.1 1.6-2 1.8-3.4 1 1.1 1.6 2.7 1.6 4.6a3.2 3.2 0 0 1-3.3 3.4Z" /></svg>;
  }
  return <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current stroke-[1.7]"><path d="m10 2.2 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L10 2.2Z" /></svg>;
}

export default function LibraryCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#24262c] bg-[#15161a] text-inherit no-underline transition duration-200 hover:-translate-y-1 hover:border-[#424631] hover:shadow-[0_14px_36px_rgba(0,0,0,.24)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9ff00]"
      aria-label={`View ${workout.name} details`}
    >
      <div className="relative aspect-[2.05/1] overflow-hidden bg-[#202126]">
        <Image className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" src={workout.image} alt={`${workout.name} exercise illustration`} fill unoptimized sizes="(max-width: 680px) 100vw, (max-width: 1050px) 50vw, 33vw" />
      </div>

      <div className="flex flex-1 flex-col px-[30px] pb-[25px] pt-[29px] max-[520px]:px-5 max-[520px]:pb-5 max-[520px]:pt-5">
        <div className="mb-[18px] flex flex-wrap gap-[10px]">
          {workout.muscleGroups.map((group) => (
            <span key={group} className="rounded-full bg-[#c9ff00] px-[14px] py-[5px] text-[12px] font-bold uppercase leading-[16px] text-[#111207]">{group}</span>
          ))}
        </div>

        <h3 className="mb-[7px] font-[Impact,'Arial_Narrow',sans-serif] text-[24px] font-bold uppercase leading-[1.1] tracking-[.015em] text-[#f3f3f4] max-[520px]:text-[21px]">
          {workout.name}
        </h3>
        <p className="text-[14px] leading-5 text-[#a3a8b4]">{workout.equipment}</p>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#292b32] pt-[17px] text-[14px] leading-5 text-[#a3a8b4] max-[520px]:gap-x-3">
          <span className="inline-flex items-center gap-[7px] whitespace-nowrap"><StatIcon kind="time" />{workout.duration} min</span>
          <span className="inline-flex items-center gap-[7px] whitespace-nowrap"><StatIcon kind="calories" />{workout.caloriesBurned} kcal</span>
          <span className="inline-flex items-center gap-[7px] whitespace-nowrap"><StatIcon kind="rating" />{workout.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
