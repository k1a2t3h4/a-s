import React, { useState } from 'react';
import { useProductContext } from '@/contexts/ProductContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { getAvailableCollectionsByProduct, addCollectionToGlobalListByProduct } from '@/lib/form-data';

export const ProductCollectionsInput = () => {
  const { productFormData, setProductFormData } = useProductContext();
  const [currentCollectionByProduct, setCurrentCollectionByProduct] = useState('');
  const [showCollectionsByProductDropdown, setShowCollectionsByProductDropdown] = useState(false);

  const availableCollections = getAvailableCollectionsByProduct();
  const filteredCollectionsByProduct = [...new Set(availableCollections)].filter(collection => 
    collection.toLowerCase().includes(currentCollectionByProduct.toLowerCase()) && 
    !(productFormData.collections || []).includes(collection)
  );

  const handleAddCollectionByProduct = (collection: string) => {
    if (collection.trim() && !(productFormData.collections || []).includes(collection.trim())) {
      setProductFormData((prev: any) => ({ ...prev, collections: [...(prev.collections || []), collection.trim()] }));
    }
    addCollectionToGlobalListByProduct(collection.trim(), productFormData.ProductID);
    setCurrentCollectionByProduct('');
    setShowCollectionsByProductDropdown(false);
  };

  const removeCollectionByProduct = (collectionToRemove: string) => {
    setProductFormData((prev: any) => ({
      ...prev,
      collections: (prev.collections || []).filter((collection: string) => collection !== collectionToRemove)
    }));
  };

  return (
    <div className="col-span-2">
      <Label>Collections</Label>
      <div className="relative">
        <div className="flex gap-2">
          <Input
            value={currentCollectionByProduct}
            onChange={(e) => setCurrentCollectionByProduct(e.target.value)}
            placeholder="Type to filter or add custom collection"
            onFocus={() => setShowCollectionsByProductDropdown(true)}
            onBlur={(e) => {
              setTimeout(() => {
                if (!e.relatedTarget?.closest('.collections-by-product-dropdown')) {
                  setShowCollectionsByProductDropdown(false);
                }
              }, 100);
            }}
          />
        </div>
        {showCollectionsByProductDropdown && (filteredCollectionsByProduct.length > 0 || currentCollectionByProduct.trim()) && (
          <div className="collections-by-product-dropdown absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-40 overflow-y-auto">
            {filteredCollectionsByProduct.map((collection: string) => (
              <div
                key={collection}
                className="p-2 hover:bg-gray-50 cursor-pointer text-sm"
                onMouseDown={() => handleAddCollectionByProduct(collection)}
              >
                {collection}
              </div>
            ))}
            {currentCollectionByProduct.trim() && !availableCollections.includes(currentCollectionByProduct.trim()) && !(productFormData.collections || []).includes(currentCollectionByProduct.trim()) && (
              <div
                className="p-2 hover:bg-gray-50 cursor-pointer text-sm border-t border-gray-100 flex items-center gap-2"
                onMouseDown={() => {
                  handleAddCollectionByProduct(currentCollectionByProduct.trim());
                  setShowCollectionsByProductDropdown(false);
                }}
              >
                <Plus className="h-4 w-4" />
                {`Add custom collection "${currentCollectionByProduct.trim()}"`}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {(productFormData.collections || []).map((collection: string, index: number) => (
          <Badge key={`${collection}-${index}`} variant="secondary" className="flex items-center gap-1">
            {collection}
            <X className="h-3 w-3 cursor-pointer" onClick={() => removeCollectionByProduct(collection)} />
          </Badge>
        ))}
      </div>
    </div>
  );
}; 