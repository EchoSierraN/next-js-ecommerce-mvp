import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Features from "./_components/features";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const getMostPopularProducts = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      take: 6,
      orderBy: { orders: { _count: "desc" } },
    });
  },
  ["/", "getMostPopularProducts"],
  { revalidate: 60 * 60 * 24 }
);

const getNewestProducts = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      take: 6,
      orderBy: { createdAt: "desc" },
    });
  },
  ["/", "getNewestProducts"],
  { revalidate: 60 * 60 * 24 }
);

export default function HomePage() {
  return (
    <main>
      <section className="relative w-full h-auto aspect-video">
        <div className="absolute inset-0 bg-custom-pattern bg-background1 bg-cover bg-center opacity-70"></div>
        <div className="flex flex-col justify-center min-h-screen w-auto bg-cover">
          <div className="container ps-4">
            <div className="pb-24"></div>
            <h1 className="text-8xl font-bold">THE RAINY DAY SHELF</h1>
            <p className="text-2xl ps-4">
              A library of books for the rainy day
            </p>
          </div>
        </div>
      </section>
      <Separator className="bg-primary w-full mx-8" />
      <Features />
      <Separator className="bg-primary w-full mx-8" />
      <section className="container my-6">
        <ProductGridSection
          title={"Most popular"}
          productsFetcher={getMostPopularProducts}
        />
        <ProductGridSection
          title={"Newest"}
          productsFetcher={getNewestProducts}
        />
      </section>
    </main>
  );
}

type ProductGridSectionProps = {
  title: String;
  productsFetcher: () => Promise<Product[]>;
};

function ProductGridSection({
  title,
  productsFetcher,
}: ProductGridSectionProps) {
  const products = productsFetcher();
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href="/products" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) {
  return (await productsFetcher()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
