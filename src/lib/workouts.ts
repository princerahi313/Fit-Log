export type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

export const WORKOUTS_API_URL = "https://api.api-store.workers.dev/api/fitlog";

export function parseWorkouts(payload: unknown): Workout[] {
  const workouts = Array.isArray(payload)
    ? payload
    : typeof payload === "object" && payload !== null && "value" in payload
      ? (payload as { value: unknown }).value
      : null;

  if (!Array.isArray(workouts)) {
    throw new Error("Workout API response did not contain a workout list");
  }

  return workouts as Workout[];
}

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(WORKOUTS_API_URL, { next: { revalidate: 300 } });
  if (!response.ok) {
    throw new Error(`Workout API returned ${response.status}`);
  }

  const payload: unknown = await response.json();
  return parseWorkouts(payload);
}

export async function getWorkout(id: string): Promise<Workout | null> {
  const response = await fetch(`${WORKOUTS_API_URL}/${encodeURIComponent(id)}`, {
    next: { revalidate: 300 },
  });
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Workout API returned ${response.status}`);
  }
  return (await response.json()) as Workout;
}
