
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const ProductOrders: React.FC = () => {
  // Mock orders data - in real app this would come from your orders data
  const mockOrders = [
    {
      id: "ORD001",
      productId: "P0000001",
      productName: "P v1",
      variant: "Black, M",
      sku: "SKU-Bla-M",
      quantity: 2,
      price: 799,
      status: "shipped",
      customer: "John Doe",
      orderDate: "2024-01-15"
    },
    {
      id: "ORD002",
      productId: "P0000001",
      productName: "P v1",
      variant: "White, S",
      sku: "SKU-Whi-S",
      quantity: 1,
      price: 799,
      status: "pending",
      customer: "Jane Smith",
      orderDate: "2024-01-16"
    }
  ];

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Product Orders</h2>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Variant</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.productName}</TableCell>
                  <TableCell>{order.variant}</TableCell>
                  <TableCell>{order.sku}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>₹{order.price}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>
                    <Badge variant={order.status === 'shipped' ? 'default' : 'secondary'}>
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
