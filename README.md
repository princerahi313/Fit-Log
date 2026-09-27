# FitLog — Workout Library

FitLog is a dark, responsive workout companion for choosing exercises, building a daily plan, and tracking a session at a glance. Its exercise library and workout details are powered by the FitLog API.

## Technologies

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- React Toastify
- FitLog REST API

## Key features

1. **Workout library** — Browse twelve exercises with muscle-group tags, equipment, duration, calories, and ratings.
2. **Workout details** — View exercise illustrations, key specs, and step-by-step instructions.
3. **Daily plan and saved workouts** — Add or save exercises, with selections and navbar counts persisted in the browser.
4. **Session overview** — See planned exercise, minute, and calorie totals; sort the current list by duration, calories, or rating; mark exercises done or remove them.
5. **Responsive experience** — Adaptive layouts, loading states, toast feedback, a shared footer, and a custom 404 page.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use FitLog.

## Workout API

- All workouts: [`https://api.api-store.workers.dev/api/fitlog`](https://api.api-store.workers.dev/api/fitlog)
- One workout: `https://api.api-store.workers.dev/api/fitlog/:id`
