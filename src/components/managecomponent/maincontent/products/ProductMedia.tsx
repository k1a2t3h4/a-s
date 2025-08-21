
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppState } from '@/lib/state';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Trash, Upload } from 'lucide-react';

interface ProductMediaProps {
  productId: string;
}

export const ProductMedia: React.FC<ProductMediaProps> = ({ productId }) => {
  const { state } = useAppState();
  const { user } = useAuth();
  const { selectedWebsiteId } = state;

  // Get product media data
  const getProductMediaData = () => {
    try {
      const { ListingCategoryByProductGroupe, ProductVarientCombinationsList } = require('@/lib/data');
      if (!user?.uniqueId || !selectedWebsiteId) return null;
      
      const userData = ListingCategoryByProductGroupe[user.uniqueId];
      if (!userData || !userData[selectedWebsiteId]) return null;
      
      const websiteData = userData[selectedWebsiteId];
      let product = null;
      
      // Find the product
      for (const category in websiteData) {
        for (const group of websiteData[category]) {
          const foundProduct = group.Products?.find((p: any) => p.ProductID === productId);
          if (foundProduct) {
            product = foundProduct;
            break;
          }
        }
        if (product) break;
      }
      
      if (!product) return null;
      
      const variants = ProductVarientCombinationsList[user.uniqueId]?.[selectedWebsiteId]?.[productId] || [];
      
      return { product, variants };
    } catch (error) {
      console.error('Error fetching product media data:', error);
      return null;
    }
  };

  const productData = getProductMediaData();

  if (!productData) {
    return <div className="p-4">Product not found</div>;
  }

  const { product, variants } = productData;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Product Media - {product.ProductName}</h2>

      {/* Global Product Media */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Global Product Media
            <Button size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload Media
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Images */}
            <div>
              <h4 className="font-medium mb-2">Images</h4>
              <div className="grid grid-cols-4 gap-4">
                {product.Globalmedia?.images?.map((image: string, index: number) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-24 object-cover rounded border"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-1 right-1 h-6 w-6 p-0"
                    >
                      <Trash className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <div className="w-full h-24 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-gray-400">
                  <Plus className="h-6 w-6 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Videos */}
            <div>
              <h4 className="font-medium mb-2">Videos</h4>
              <div className="grid grid-cols-2 gap-4">
                {product.Globalmedia?.videos?.map((video: string, index: number) => (
                  <div key={index} className="relative">
                    <video
                      src={video}
                      className="w-full h-32 object-cover rounded border"
                      controls
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-1 right-1 h-6 w-6 p-0"
                    >
                      <Trash className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-gray-400">
                  <Plus className="h-6 w-6 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Variant-Specific Media */}
      <Card>
        <CardHeader>
          <CardTitle>Variant-Specific Media</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {variants.map((variant: any, variantIndex: number) => (
              <div key={variantIndex} className="border rounded-lg p-4">
                <h5 className="font-medium mb-3">
                  {Object.entries(variant.combination).map(([key, value]) => `${key}: ${value}`).join(', ')}
                </h5>
                
                <div className="grid grid-cols-4 gap-4">
                  {variant.Varientmedia?.images?.map((image: string, index: number) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Variant ${variantIndex + 1} - ${index + 1}`}
                        className="w-full h-20 object-cover rounded border"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-1 right-1 h-5 w-5 p-0"
                      >
                        <Trash className="h-2 w-2" />
                      </Button>
                    </div>
                  ))}
                  <div className="w-full h-20 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-gray-400">
                    <Plus className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
