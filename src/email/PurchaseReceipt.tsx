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
  };
};

PurchaseReceiptEmail.PreviewProps = {
  product: {
    name: "Product name",
  },
} satisfies PurchaseReceiptEmailProps;

export default function PurchaseReceiptEmail({
  product,
}: PurchaseReceiptEmailProps) {
  return (
    <Html>
      <Preview>Download {product.name} and view receipt</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Purchase receipt</Heading>
            <OrderInformation />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
