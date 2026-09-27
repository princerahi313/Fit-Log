import { Suspense } from 'react';
import HeroBanner from '@/components/home/HeroBanner';
import Library from '@/components/home/Library';
import LibraryLoading from '@/components/home/LibraryLoading';
const page = () => {
  return (
    <main className="mx-auto w-full max-w-[1600px] flex-1 border-x border-[#1b1c1f] bg-[#0b0c0e] px-[29px] pb-16 pt-[60px] max-[700px]:px-4 max-[700px]:pt-8">
      <HeroBanner />
      <Suspense fallback={<LibraryLoading />}>
        <Library />
      </Suspense>
    </main>
  );
};

export default page;
