import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="mx-auto mt-auto w-full max-w-[1600px] border-x border-t border-[#1b1c1f] bg-[#0b0c0e] text-[#747c8a]">
      <div className="mx-auto flex min-h-[124px] w-[calc(100%_-_60px)] max-w-[1540px] items-center justify-between gap-6 max-[700px]:w-[calc(100%_-_32px)] max-[600px]:min-h-[112px] max-[600px]:flex-col max-[600px]:items-start max-[600px]:justify-center max-[600px]:gap-3">
        <Link href="/" aria-label="FitLog home" className="inline-flex shrink-0 items-center gap-[10px] text-[#f3f3f4] no-underline">
          <Image src={logo} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
          <span className="font-[Impact,'Arial_Narrow',sans-serif] text-[18px] font-bold leading-none tracking-[.025em]">FITLOG</span>
        </Link>
        <p className="text-right text-[14px] leading-5 text-[#747c8a] max-[600px]:text-left">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
