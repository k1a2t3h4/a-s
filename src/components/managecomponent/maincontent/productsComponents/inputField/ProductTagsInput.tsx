import React, { useState } from 'react';
import { useProductContext } from '@/contexts/ProductContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { getAvailableTagsByProduct, addTagToGlobalListByProduct } from '@/lib/form-data';

export const ProductTagsInput = () => {
  const { productFormData, setProductFormData } = useProductContext();
  const [currentTagByProduct, setCurrentTagByProduct] = useState('');
  const [showTagsByProductDropdown, setShowTagsByProductDropdown] = useState(false);

  const availableTags = getAvailableTagsByProduct();
  const filteredTagsByProduct = [...new Set(availableTags)].filter(tag => 
    tag.toLowerCase().includes(currentTagByProduct.toLowerCase()) && 
    !(productFormData.tags || []).includes(tag)
  );

  const handleAddTagByProduct = (tag: string) => {
    if (tag.trim() && !(productFormData.tags || []).includes(tag.trim())) {
      setProductFormData((prev: any) => ({ ...prev, tags: [...(prev.tags || []), tag.trim()] }));
    }
    addTagToGlobalListByProduct(tag.trim(), productFormData.ProductID);
    setCurrentTagByProduct('');
    setShowTagsByProductDropdown(false);
  };

  const removeTagByProduct = (tagToRemove: string) => {
    setProductFormData((prev: any) => ({
      ...prev,
      tags: (prev.tags || []).filter((tag: string) => tag !== tagToRemove)
    }));
  };

  return (
    <div className="col-span-2">
      <Label>Tags</Label>
      <div className="relative">
        <div className="flex gap-2">
          <Input
            value={currentTagByProduct}
            onChange={(e) => setCurrentTagByProduct(e.target.value)}
            placeholder="Type to filter or add custom tag"
            onFocus={() => setShowTagsByProductDropdown(true)}
            onBlur={(e) => {
              setTimeout(() => {
                if (!e.relatedTarget?.closest('.tags-by-product-dropdown')) {
                  setShowTagsByProductDropdown(false);
                }
              }, 100);
            }}
          />
        </div>
        {showTagsByProductDropdown && (filteredTagsByProduct.length > 0 || currentTagByProduct.trim()) && (
          <div className="tags-by-product-dropdown absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-40 overflow-y-auto">
            {filteredTagsByProduct.map((tag: string) => (
              <div
                key={tag}
                className="p-2 hover:bg-gray-50 cursor-pointer text-sm"
                onMouseDown={() => handleAddTagByProduct(tag)}
              >
                {tag}
              </div>
            ))}
            {currentTagByProduct.trim() && !availableTags.includes(currentTagByProduct.trim()) && !(productFormData.tags || []).includes(currentTagByProduct.trim()) && (
              <div
                className="p-2 hover:bg-gray-50 cursor-pointer text-sm border-t border-gray-100 flex items-center gap-2"
                onMouseDown={() => {
                  handleAddTagByProduct(currentTagByProduct.trim());
                  setShowTagsByProductDropdown(false);
                }}
              >
                <Plus className="h-4 w-4" />
                {`Add custom tag "${currentTagByProduct.trim()}"`}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {(productFormData.tags || []).map((tag: string, index: number) => (
          <Badge key={`${tag}-${index}`} variant="secondary" className="flex items-center gap-1">
            {tag}
            <X className="h-3 w-3 cursor-pointer" onClick={() => removeTagByProduct(tag)} />
          </Badge>
        ))}
      </div>
    </div>
  );
}; 