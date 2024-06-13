import { BookOpenText, LibraryBig, PlaneTakeoff } from "lucide-react";

export default function Features() {
  return (
    <section className="w-full h-auto py-8 flex flex-col md:flex-row items-center justify-around gap-8">
      {/* Online shopping */}
      <div className="flex flex-col gap-4 items-center justify-around">
        <LibraryBig className="w-20 h-20 md:w-[15vh] md:h-auto" />
        <div className="w-3/4 md:w-1/2 h-auto font-semibold text-center">
          ACCESS OUR RAREST BOOK COLLECTIONS
        </div>
      </div>
      {/* International shipping */}
      <div className="flex flex-col gap-4 items-center justify-around">
        <BookOpenText className="w-20 h-20 md:w-[15vh] md:h-auto" />
        <div className="w-3/4 md:w-1/2 h-auto font-semibold text-center">
          RESERVE PHYSICAL COPIES
        </div>
      </div>
      {/* 2 day return time */}
      <div className="flex flex-col gap-4 items-center justify-around">
        <PlaneTakeoff className="w-20 h-20 md:w-[15vh] md:h-auto" />
        <div className="w-3/4 md:w-1/2 h-auto font-semibold text-center">
          INTERNATIONAL SHIPPING
        </div>
      </div>
    </section>
  );
}
