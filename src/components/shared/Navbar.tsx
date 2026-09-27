"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png";
import { useFitLog } from "@/components/shared/FitLogProvider";

const navigation = [
  { label: "Workouts", href: "/" },
  { label: "My Plan", href: "/my-plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plannedIds, savedIds } = useFitLog();
  const isPlanPage = pathname === "/my-plan";
  const isWorkoutPage = pathname === "/" || pathname.startsWith("/workout/");

  return (
    <header className="relative z-10 mx-auto w-full max-w-[1600px] border-x border-b border-[#1b1c1f] bg-[#0b0c0e] text-[#d5d6dc]">
      <div className="mx-auto grid min-h-[100px] w-[calc(100%_-_60px)] max-w-[1540px] grid-cols-[1fr_auto_1fr] items-center max-[700px]:min-h-[82px] max-[700px]:w-[calc(100%_-_32px)] max-[700px]:grid-cols-[1fr_auto] max-[360px]:w-[calc(100%_-_24px)]">
        <Link className="inline-flex justify-self-start items-center gap-[13px] text-[#f1f1f3] no-underline max-[700px]:gap-[9px] max-[360px]:gap-[6px]" href="/" aria-label="FitLog home">
          <Image className="block h-[34px] w-[34px] object-contain max-[700px]:h-[29px] max-[700px]:w-[29px] max-[360px]:h-[25px] max-[360px]:w-[25px]" src={logo} alt="" priority />
          <span className="font-[Impact,'Arial_Narrow',sans-serif] text-[24px] font-bold leading-none tracking-[.025em] max-[700px]:text-[21px] max-[360px]:text-[18px]">FITLOG</span>
        </Link>

        <nav className="flex h-full items-center gap-[9px] max-[700px]:col-span-2 max-[700px]:row-start-2 max-[700px]:justify-center max-[700px]:gap-1 max-[700px]:pb-2" aria-label="Main navigation">
          {navigation.map(({ label, href }) => {
            const active = href === "/" ? isWorkoutPage : isPlanPage;

            return (
              <Link
                key={href}
                href={href}
                className={`inline-flex min-h-[35px] items-center justify-center rounded-full px-5 text-[14px] font-medium no-underline transition-colors duration-[180ms] motion-reduce:transition-none max-[700px]:min-h-[31px] max-[700px]:px-[14px] max-[700px]:text-[12px] ${active ? "bg-[#1a2110] text-[#c9ff00] hover:text-[#d7ff37]" : "text-[#a6a8b0] hover:text-[#eff0f2]"}`}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex justify-self-end items-center gap-7 max-[700px]:col-start-2 max-[700px]:row-start-1 max-[700px]:gap-[13px] max-[360px]:gap-2">
          <Link className="inline-flex items-center gap-[10px] text-[14px] font-normal text-[#d4d5d9] no-underline hover:text-[#f0f0f2] max-[700px]:gap-[6px] max-[700px]:text-[12px] max-[360px]:gap-1 max-[360px]:text-[11px]" href="/my-plan?tab=plan" aria-label={`Plan, ${plannedIds.length} workouts`}>
            <span>Plan</span>
            <span className="grid h-[25px] w-[25px] place-items-center rounded-full bg-[#c9ff00] text-[13px] font-bold leading-none text-[#101207] max-[700px]:h-[22px] max-[700px]:w-[22px] max-[700px]:text-[12px]" aria-hidden="true">{plannedIds.length}</span>
          </Link>
          <Link className="inline-flex items-center gap-[10px] text-[14px] font-normal text-[#a6a8b0] no-underline hover:text-[#f0f0f2] max-[700px]:gap-[6px] max-[700px]:text-[12px] max-[360px]:gap-1 max-[360px]:text-[11px]" href="/my-plan?tab=saved" aria-label={`Saved, ${savedIds.length} workouts`}>
            <span>Saved</span>
            <span className="grid h-[25px] w-[25px] place-items-center rounded-full border border-[#383a40] text-[13px] leading-none text-[#d1d2d8] max-[700px]:h-[22px] max-[700px]:w-[22px] max-[700px]:text-[12px]" aria-hidden="true">{savedIds.length}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
