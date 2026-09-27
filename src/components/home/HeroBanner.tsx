import Image from "next/image";
import bannerArtwork from "@/assets/banner.png";

export default function HeroBanner() {
  return (
    <section className="grid min-h-[560px] grid-cols-[1.2fr_.8fr] items-center overflow-hidden rounded-[20px] border border-[#24262c] bg-[#15161a] px-[70px] py-12 max-[800px]:grid-cols-1 max-[800px]:gap-8 max-[800px]:px-9 max-[800px]:py-12 max-[520px]:min-h-0 max-[520px]:gap-5 max-[520px]:rounded-2xl max-[520px]:px-6 max-[520px]:py-9">
      <div className="relative z-[1] max-w-[790px]">
        <p className="mb-7 text-[14px] font-bold tracking-[.12em] text-[#c9ff00] max-[520px]:mb-5 max-[520px]:text-xs">
          WORKOUT LIBRARY
        </p>
        <h1 className="mb-5 font-[Impact,'Arial_Narrow',sans-serif] text-[clamp(3.5rem,5.2vw,5.2rem)] font-extrabold leading-[.94] tracking-[-.025em] text-[#f5f5f6] max-[800px]:max-w-[700px] max-[800px]:text-[clamp(3.25rem,9vw,5rem)] max-[520px]:text-[clamp(2.8rem,12vw,4.1rem)]">
          <span className="block">TRAIN WITH INTENT. LOG</span>
          <span className="block">EVERY SET.</span>
        </h1>
        <p className="max-w-[650px] text-[20px] leading-[1.5] text-[#a3a8b4] max-[520px]:text-base">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <a
          className="mt-9 inline-flex min-h-[50px] items-center justify-center rounded-lg bg-[#c9ff00] px-[30px] text-[14px] font-extrabold text-[#111207] no-underline transition-colors hover:bg-[#d8ff45] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9ff00] max-[520px]:mt-7 max-[520px]:min-h-12 max-[520px]:px-5 max-[520px]:text-xs"
          href="#library"
        >
          BROWSE WORKOUTS
        </a>
      </div>

      <div className="flex h-full min-h-[410px] items-center justify-center max-[800px]:min-h-[300px] max-[520px]:min-h-0">
        <Image
          className="h-auto w-[min(100%,420px)] object-contain max-[800px]:w-[min(70%,330px)] max-[520px]:w-[min(76%,270px)]"
          src={bannerArtwork}
          alt=""
          priority
        />
      </div>
    </section>
  );
}
