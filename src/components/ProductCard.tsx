import { formatCurrency } from "@/lib/formatters";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
  id: string;
  name: string;
  priceInCents: number;
  description: string;
  imagePath: string;
};

export function ProductCard({
  id,
  name,
  priceInCents,
  description,
  imagePath,
}: ProductCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        <Card className="flex overflow-hidden flex-col">
          <div className="relative w-full h-auto aspect-video">
            <Image src={imagePath} fill alt={name} />
          </div>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>
              {formatCurrency(priceInCents / 100)}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="line-clamp-4">{description}</p>
          </CardContent>
          <CardFooter>
            <Button asChild size="lg" className="w-full">
              <Link href={`/products/${id}/purchase`}>Purchase</Link>
            </Button>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:min-w-[800px]">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>
            {formatCurrency(priceInCents / 100)}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 basis-full md:basis-1/3">
            <div className="relative w-full h-auto aspect-video">
              <Image src={imagePath} fill alt={name} />
            </div>
          </div>
          <div className="flex-1 basis-full md:basis-2/3 px-4">
            <p className="line-clamp-4">{description}</p>
          </div>
        </div>
        {/*}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex-1 basis-full md:basis-1/3">
            <Image src={imagePath} fill alt={name} />
          </div>
          <div className="flex flex-col gap-2 basis-1">
            <p className="text-2xl line-clamp-4">{name}</p>
            <p className="line-clamp-4">{description}</p>
          </div>
        </div>
        */}
        <DialogFooter>
          <Button type="submit">{`Purchase ($${priceInCents / 100})`}</Button>
        </DialogFooter>
      </DialogContent>
      {/* <Card className="flex overflow-hidden flex-col">
        <div className="relative w-full h-auto aspect-video">
          <Image src={imagePath} fill alt={name} />
        </div>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>
            {formatCurrency(priceInCents / 100)}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="line-clamp-4">{description}</p>
        </CardContent>
        <CardFooter>
          <Button asChild size="lg" className="w-full">
            <Link href={`/products/${id}/purchase`}>Purchase</Link>
          </Button>
        </CardFooter>
      </Card> */}
    </Dialog>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-video bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  );
}
