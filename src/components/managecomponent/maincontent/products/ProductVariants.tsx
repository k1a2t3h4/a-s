
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAppState } from '@/lib/state';
import { useAuth } from '@/contexts/AuthContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash } from 'lucide-react';

interface ProductVariantsProps {
  productId: string;
}

export const ProductVariants: React.FC<ProductVariantsProps> = ({ productId }) => {
  const { state } = useAppState();
  const { user } = useAuth();
  const { selectedWebsiteId } = state;
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Get product and variant data
  const getProductVariantData = () => {
    try {
      const { ListingCategoryByProductGroupe, ProductVarientCombinationsList, ProductVarientCombinationSKUQuantity, VendorDetailsList } = require('@/lib/data');
      if (!user?.uniqueId || !selectedWebsiteId) return null;
      
      const userData = ListingCategoryByProductGroupe[user.uniqueId];
      if (!userData || !userData[selectedWebsiteId]) return null;
      
      const websiteData = userData[selectedWebsiteId];
      let product = null;
      let productGroup = null;
      
      // Find the product
      for (const category in websiteData) {
        for (const group of websiteData[category]) {
          const foundProduct = group.Products?.find((p: any) => p.ProductID === productId);
          if (foundProduct) {
            product = foundProduct;
            productGroup = group;
            break;
          }
        }
        if (product) break;
      }
      
      if (!product) return null;
      
      const variants = ProductVarientCombinationsList[user.uniqueId]?.[selectedWebsiteId]?.[productId] || [];
      const quantities = ProductVarientCombinationSKUQuantity[user.uniqueId]?.[selectedWebsiteId]?.[productId] || {};
      
      return {
        product,
        productGroup,
        variants,
        quantities,
        vendorDetails: VendorDetailsList[product.alternativevendor] || null
      };
    } catch (error) {
      console.error('Error fetching product variant data:', error);
      return null;
    }
  };

  const productData = getProductVariantData();

  if (!productData) {
    return <div className="p-4">Product not found</div>;
  }

  const { product, variants, quantities } = productData;

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Variants - {product.ProductName}</h2>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Variant
        </Button>
      </div>

      {/* Variant Options */}
      <Card>
        <CardHeader>
          <CardTitle>Variant Options</CardTitle>
        </CardHeader>
        <CardContent>
          {product.variantOptions?.map((option: any, index: number) => (
            <div key={index} className="mb-4">
              <Label className="text-sm font-medium">{option.name}:</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {option.values.map((value: string, vIndex: number) => (
                  <Badge key={vIndex} variant="outline">
                    {value}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Variant Combinations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Variant Combinations ({variants.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Combination</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Compare Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Barcode</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variants.map((variant: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      src={variant.Varientmedia?.images?.[0] || '/placeholder.svg'}
                      alt="Variant"
                      className="w-12 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {Object.entries(variant.combination).map(([key, value]) => (
                        <Badge key={key} variant="secondary" className="mr-1">
                          {key}: {value as string}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{variant.sku}</TableCell>
                  <TableCell>₹{variant.price}</TableCell>
                  <TableCell>
                    {variant.compareAtPrice && (
                      <span className="text-gray-400 line-through">₹{variant.compareAtPrice}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${
                      quantities[variant.sku] < 5 ? 'text-red-600' : 
                      quantities[variant.sku] < 10 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {quantities[variant.sku] || 0}
                    </span>
                  </TableCell>
                  <TableCell>{variant.barcode}</TableCell>
                  <TableCell>{variant.vendor}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedVariant(variant)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Variant Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Variant</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>SKU</Label>
              <Input placeholder="Enter SKU" />
            </div>
            <div>
              <Label>Price</Label>
              <Input type="number" placeholder="Enter price" />
            </div>
            <div>
              <Label>Barcode</Label>
              <Input placeholder="Enter barcode" />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
              <Button>Add Variant</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
