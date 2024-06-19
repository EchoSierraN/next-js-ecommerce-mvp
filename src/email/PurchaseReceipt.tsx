import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Tailwind,
} from "@react-email/components";
import * as React from "react";
import { Img } from "@react-email/components";
import { Preview } from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";

type PurchaseReceiptEmailProps = {
  product: {
    name: string;
    description: string;
    imagePath: string;
  };
  order: { id: string; createdAt: Date; pricePaidInCents: number };
  downloadVerificationId: string;
};

PurchaseReceiptEmail.PreviewProps = {
  product: {
    name: "Product name",
    description: "Product description",
    imagePath:
      "/public/products/1f95941a-697d-43b0-b00c-e317f7f34945-thumb-1920-1245632.jpg",
  },
  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    pricePaidInCents: 0,
  },
  downloadVerificationId: crypto.randomUUID(),
} satisfies PurchaseReceiptEmailProps;

export default function PurchaseReceiptEmail({
  product,
  order,
  downloadVerificationId,
}: PurchaseReceiptEmailProps) {
  return (
    <Html>
      <Preview>Download {product.name} and view receipt</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Purchase receipt</Heading>
            <OrderInformation
              order={order}
              product={product}
              downloadVerificationId={downloadVerificationId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
