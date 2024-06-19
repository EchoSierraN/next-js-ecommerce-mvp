import { formatCurrency } from "@/lib/formatters";
import { Column, Row, Section, Text } from "@react-email/components";

type OrderInformationProps = {
  order: { id: string; createdAt: Date; pricePaidInCents: number };
  product: { name: "Product name" };
  downloadVerificationId: string;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

export function OrderInformation({
  order,
  product,
  downloadVerificationId,
}: OrderInformationProps) {
  return (
    <>
      <Section>
        <Row>
          <Column>
            <Text className="mb-0 text-gray-500 text-nowrap mr-4">
              Order id
            </Text>
            <Text className="mt-0 mr-4 text-gray-500 text-nowrap">
              {order.id}
            </Text>
          </Column>

          <Column>
            <Text className="mb-0 text-gray-500 text-nowrap mr-4">
              Purchased On
            </Text>
            <Text className="mt-0 mr-4 text-gray-500 text-nowrap">
              {dateFormatter.format(order.createdAt)}
            </Text>
          </Column>

          <Column>
            <Text className="mb-0 text-gray-500 text-nowrap mr-4">
              Price Paid
            </Text>
            <Text className="mt-0 mr-4 text-gray-500 text-nowrap">
              {formatCurrency(order.pricePaidInCents / 100)}
            </Text>
          </Column>
        </Row>
      </Section>
    </>
  );
}
