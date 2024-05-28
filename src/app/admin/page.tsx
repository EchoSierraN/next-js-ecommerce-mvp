import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";

async function getSales() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);

  await wait(2000);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0) / 100,
  };
}

async function wait(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: true } }),
  ]);

  return { activeCount, inactiveCount };
}

export default async function AdminDashboard() {
  const [salesData, userData, productData] = await Promise.all([
    getSales(),
    getUserData(),
    getProductData(),
  ]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title={"Sales"}
        description={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={`${formatCurrency(salesData.amount)}`}
      />
      <DashboardCard
        title={"Customers"}
        description={`${formatCurrency(
          userData.averageValuePerUser
        )} Average Value`}
        body={`${formatNumber(userData.userCount)}`}
      />

      <DashboardCard
        title={"Active Products"}
        description={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={`${formatNumber(productData.activeCount)}`}
      />
    </div>
  );
}

type DashboardCardProps = {
  title: String;
  description: String;
  body: String;
};

function DashboardCard({ title, description, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{body}</CardContent>
    </Card>
  );
}
