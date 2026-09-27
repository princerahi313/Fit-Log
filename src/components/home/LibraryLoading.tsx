export default function LibraryLoading() {
  return (
    <section id="library" className="mt-[80px] scroll-mt-8 max-[700px]:mt-14" aria-labelledby="library-loading-heading">
      <div className="mb-[28px]">
        <h2 id="library-loading-heading" className="font-[Impact,'Arial_Narrow',sans-serif] text-[40px] font-bold uppercase leading-none text-[#f3f3f4] max-[520px]:text-[34px]">The Library</h2>
        <p className="mt-[10px] text-[18px] leading-6 text-[#a3a8b4] max-[520px]:text-base">Twelve lifts covering every major muscle group.</p>
      </div>
      <div role="status" aria-live="polite" className="flex min-h-[280px] flex-col items-center justify-center gap-4 rounded-[20px] border border-[#24262c] bg-[#15161a] text-[#a3a8b4]">
        <span aria-hidden="true" className="h-9 w-9 animate-spin rounded-full border-[3px] border-[#3b4325] border-t-[#c9ff00]" />
        <span>Loading workouts…</span>
      </div>
    </section>
  );
}
