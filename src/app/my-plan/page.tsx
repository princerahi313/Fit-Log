import MyPlan from "@/components/plan/MyPlan";
import { getWorkouts } from "@/lib/workouts";

export default async function MyPlanPage({ searchParams }: PageProps<"/my-plan">) {
  const query = await searchParams;
  let workouts;

  try {
    workouts = await getWorkouts();
  } catch (error) {
    console.error("Failed to load workouts for My Plan:", error);
    return (
      <main className="mx-auto min-h-[calc(100vh-102px)] w-full max-w-[1600px] flex-1 border-x border-[#1b1c1f] bg-[#0b0c0e] px-[29px] py-[60px] max-[700px]:px-4 max-[700px]:py-8">
        <p role="status" className="rounded-xl border border-[#34363d] bg-[#15161a] p-6 text-[#a3a8b4]">Your workouts couldn&apos;t be loaded. Please refresh to try again.</p>
      </main>
    );
  }

  const initialTab = query.tab === "saved" ? "saved" : "plan";
  return <MyPlan key={initialTab} workouts={workouts} initialTab={initialTab} />;
}
