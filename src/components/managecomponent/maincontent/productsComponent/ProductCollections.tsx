import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppState } from '@/lib/state';
import { useAuth } from '@/contexts/AuthContext';
import { Plus } from 'lucide-react';
import { ProductsList } from '@/lib/product-data';

export const ProductCollections: React.FC = () => {
  const { state } = useAppState();
  const { user } = useAuth();
  const { selectedWebsiteId } = state;

  // Get all collections from flat products list
  const getCollections = () => {
    try {
      if (!user?.uniqueId || !selectedWebsiteId) return [];
      const products = ProductsList[user.uniqueId]?.[selectedWebsiteId] || [];
      const collectionsMap = new Map();
      products.forEach((product: any) => {
        (product.collections || []).forEach((collection: string) => {
          if (!collectionsMap.has(collection)) {
            collectionsMap.set(collection, {
              name: collection,
              productCount: 0,
              products: []
            });
          }
          collectionsMap.get(collection).productCount += 1;
          collectionsMap.get(collection).products.push(product);
        });
      });
      return Array.from(collectionsMap.values());
    } catch (error) {
      console.error('Error fetching collections:', error);
      return [];
    }
  };

  const collections = getCollections();

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Collections</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Collection
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{collection.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Products</span>
                  <Badge variant="secondary">{collection.productCount}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Recent products: {collection.products.slice(0, 2).map((p: any) => p.ProductName).join(', ')}
                  {collection.products.length > 2 && ` +${collection.products.length - 2} more`}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {collections.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="text-center">
              <h3 className="text-lg font-medium">No Collections Found</h3>
              <p className="text-muted-foreground">Create your first collection to organize products.</p>
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Create Collection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
