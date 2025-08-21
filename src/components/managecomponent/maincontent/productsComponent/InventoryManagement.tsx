import React, { useState, useEffect } from 'react';
import { useAppState } from '@/lib/state';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { Pencil, Save, X } from 'lucide-react';
import { ProductsList, ProductVariantCombinationsList, ProductVarientCombinationSKUQuantity } from '@/lib/product-data';

interface InventoryManagementProps {
  productId?: string;
}

interface InventoryItem {
  productId: string;
  productName: string;
  sku: string;
  combination: Record<string, string>;
  price: number;
  vendor: string;
  quantity: number;
  images: string[];
  compareAtPrice?: number;
  barcode?: string;
}

export const InventoryManagement: React.FC<InventoryManagementProps> = ({ productId }) => {
  const { state } = useAppState();
  const { user } = useAuth();
  const { selectedWebsiteId } = state;
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ quantity: number; price: number }>({ quantity: 0, price: 0 });

  // Get inventory data
  const getInventoryData = () => {
    try {
      if (!user?.uniqueId || !selectedWebsiteId) {
        return [];
      }
      const variantData = ProductVariantCombinationsList[user.uniqueId]?.[selectedWebsiteId] || {};
      const quantityData = ProductVarientCombinationSKUQuantity[user.uniqueId]?.[selectedWebsiteId] || {};
      const productData = ProductsList[user.uniqueId]?.[selectedWebsiteId] || [];
      const productNames: Record<string, string> = {};
      productData.forEach((product: any) => {
        productNames[product.ProductID] = product.ProductName;
      });
      const inventoryItems: InventoryItem[] = [];
      // If specific product, show only that product's inventory
      if (productId && variantData[productId]) {
        const variants = variantData[productId];
        const productQuantities = quantityData[productId] || {};
        variants.forEach((variant: any) => {
          inventoryItems.push({
            productId: productId,
            productName: productNames[productId] || productId,
            sku: variant.sku,
            combination: variant.combination,
            price: variant.price,
            vendor: variant.vendor,
            quantity: productQuantities[variant.sku] || 0,
            images: (variant.Varientmedia || []).map((m: any) => m.url),
            compareAtPrice: variant.compareAtPrice,
            barcode: variant.barcode
          });
        });
      } else {
        // Show all products inventory
        Object.keys(variantData).forEach(prodId => {
          const variants = variantData[prodId];
          const productQuantities = quantityData[prodId] || {};
          variants.forEach((variant: any) => {
            inventoryItems.push({
              productId: prodId,
              productName: productNames[prodId] || prodId,
              sku: variant.sku,
              combination: variant.combination,
              price: variant.price,
              vendor: variant.vendor,
              quantity: productQuantities[variant.sku] || 0,
              images: (variant.Varientmedia || []).map((m: any) => m.url),
              compareAtPrice: variant.compareAtPrice,
              barcode: variant.barcode
            });
          });
        });
      }
      return inventoryItems;
    } catch (error) {
      console.error('Error fetching inventory data:', error);
      return [];
    }
  };

  // Load inventory data on component mount and when dependencies change
  useEffect(() => {
    const data = getInventoryData();
    setInventoryData(data);
  }, [user?.uniqueId, selectedWebsiteId, productId]);

  const handleEdit = (sku: string, quantity: number, price: number) => {
    setEditingItem(sku);
    setEditValues({ quantity, price });
  };

  const handleSave = (item: InventoryItem) => {
    try {
      if (!user?.uniqueId || !selectedWebsiteId) return;
      // Update quantity
      if (!ProductVarientCombinationSKUQuantity[user.uniqueId]) {
        ProductVarientCombinationSKUQuantity[user.uniqueId] = {};
      }
      if (!ProductVarientCombinationSKUQuantity[user.uniqueId][selectedWebsiteId]) {
        ProductVarientCombinationSKUQuantity[user.uniqueId][selectedWebsiteId] = {};
      }
      if (!ProductVarientCombinationSKUQuantity[user.uniqueId][selectedWebsiteId][item.productId]) {
        ProductVarientCombinationSKUQuantity[user.uniqueId][selectedWebsiteId][item.productId] = {};
      }
      ProductVarientCombinationSKUQuantity[user.uniqueId][selectedWebsiteId][item.productId][item.sku] = editValues.quantity;
      // Update price in variant combinations
      const variants = ProductVariantCombinationsList[user.uniqueId]?.[selectedWebsiteId]?.[item.productId] || [];
      const variantIndex = variants.findIndex((v: any) => v.sku === item.sku);
      if (variantIndex !== -1) {
        variants[variantIndex].price = editValues.price;
      }
      // Update local state
      setInventoryData(prev => prev.map(invItem =>
        invItem.sku === item.sku
          ? { ...invItem, quantity: editValues.quantity, price: editValues.price }
          : invItem
      ));
      setEditingItem(null);
      toast({
        title: "Inventory Updated",
        description: `Updated ${item.sku} successfully`,
      });
    } catch (error) {
      console.error('Error updating inventory:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update inventory",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditValues({ quantity: 0, price: 0 });
  };

  if (!user?.uniqueId || !selectedWebsiteId) {
    return (
      <div className="p-4">
        <div className="text-center text-gray-500">
          Please log in and select a website to view inventory.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">
        Inventory Management {productId ? `- Product ${productId}` : '- All Products'}
      </h2>
      {inventoryData.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No inventory data found for the selected criteria.
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Variant</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      src={item.images[0] || '/placeholder.svg'}
                      alt="Product variant"
                      className="w-12 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.productName}</div>
                      <div className="text-sm text-gray-500">{item.productId}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                  <TableCell>
                    {Object.entries(item.combination).map(([key, value]) => (
                      <Badge key={key} variant="outline" className="mr-1">
                        {key}: {value as string}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    {editingItem === item.sku ? (
                      <Input
                        type="number"
                        value={editValues.price}
                        onChange={(e) => setEditValues(prev => ({ ...prev, price: Number(e.target.value) }))}
                        className="w-20"
                      />
                    ) : (
                      `₹${item.price}`
                    )}
                  </TableCell>
                  <TableCell>{item.vendor}</TableCell>
                  <TableCell>
                    {editingItem === item.sku ? (
                      <Input
                        type="number"
                        value={editValues.quantity}
                        onChange={(e) => setEditValues(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                        className="w-20"
                      />
                    ) : (
                      <span className={`font-medium ${item.quantity < 5 ? 'text-red-600' : item.quantity < 10 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {item.quantity}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.quantity > 0 ? 'default' : 'destructive'}>
                      {item.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {editingItem === item.sku ? (
                      <div className="flex space-x-1">
                        <Button size="sm" onClick={() => handleSave(item)}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => handleEdit(item.sku, item.quantity, item.price)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
