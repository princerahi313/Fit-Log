import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-[1600px] flex-1 items-center justify-center border-x border-[#1b1c1f] bg-[#0b0c0e] px-6 py-20 text-center">
      <div className="max-w-xl">
        <p className="font-[Impact,'Arial_Narrow',sans-serif] text-[88px] leading-none text-[#c9ff00]">404</p>
        <h1 className="mt-5 font-[Impact,'Arial_Narrow',sans-serif] text-[38px] font-bold uppercase leading-none text-[#f3f3f4] max-[520px]:text-[32px]">Page not found</h1>
        <p className="mt-4 text-[16px] leading-6 text-[#a3a8b4]">We couldn&apos;t find that page or workout. Head back to the workout library to keep training.</p>
        <Link href="/" className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#c9ff00] px-6 text-sm font-bold text-[#111207] no-underline transition-colors hover:bg-[#d8ff45] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9ff00]">Go to workouts</Link>
      </div>
    </main>
  );
}
