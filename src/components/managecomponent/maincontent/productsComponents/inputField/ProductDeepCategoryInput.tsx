import React, { useState } from 'react';
import { useProductContext } from '@/contexts/ProductContext';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { ChevronRight, ChevronLeft, Plus } from 'lucide-react';
import {
  categoryStructure,
  getCategoryPath,
  hasChildren,
  addCategoryToStructure,
  parseCategoryStructure
} from '@/lib/form-data';

export const ProductDeepCategoryInput = () => {
  const { productFormData, setProductFormData } = useProductContext();
  const [showCustomDeepCategory, setShowCustomDeepCategory] = useState(false);
  const [customDeepCategory, setCustomDeepCategory] = useState('');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [currentCategoryPath, setCurrentCategoryPath] = useState<string[]>([]);
  const [selectedCategoryPath, setSelectedCategoryPath] = useState<string>('');

  // Get current level categories
  const getCurrentLevelCategories = () => {
    let currentLevel = categoryStructure;
    for (const pathKey of currentCategoryPath) {
      if (currentLevel[pathKey] && currentLevel[pathKey].children) {
        currentLevel = currentLevel[pathKey].children;
      }
    }
    return currentLevel;
  };

  // Handle category selection
  const handleCategorySelect = (categoryKey: string, categoryName: string) => {
    const newPath = [...currentCategoryPath, categoryKey];
    const newPathString = getCategoryPath(categoryStructure, newPath);
    let currentLevel = categoryStructure;
    for (const pathKey of currentCategoryPath) {
      if (currentLevel[pathKey] && currentLevel[pathKey].children) {
        currentLevel = currentLevel[pathKey].children;
      }
    }
    const selectedCategory = currentLevel[categoryKey];
    if (hasChildren(selectedCategory)) {
      setCurrentCategoryPath(newPath);
      setSelectedCategoryPath(newPathString);
    } else {
      setSelectedCategoryPath(newPathString);
      setCategoryDropdownOpen(false);
      setCurrentCategoryPath([]);
      setProductFormData((prev: any) => ({ ...prev, deepCategory: newPathString }));
    }
  };

  // Navigate back in category hierarchy
  const goBackInCategory = () => {
    if (currentCategoryPath.length > 0) {
      const newPath = currentCategoryPath.slice(0, -1);
      setCurrentCategoryPath(newPath);
      setSelectedCategoryPath(newPath.length > 0 ? getCategoryPath(categoryStructure, newPath) : '');
    }
  };

  // Helper function to extract all possible paths from parsed categories
  const extractCategoryPaths = (categories: any[], currentPath: string = ''): string[] => {
    const paths: string[] = [];
    for (const category of categories) {
      const newPath = currentPath ? `${currentPath} > ${category.name}` : category.name;
      if (category.children && category.children.length > 0) {
        paths.push(...extractCategoryPaths(category.children, newPath));
      } else {
        paths.push(newPath);
      }
    }
    return paths;
  };

  // Handle custom category addition
  const handleAddCustomCategory = () => {
    if (customDeepCategory.trim()) {
      if (/[>(),]/.test(customDeepCategory.trim())) {
        addCategoryToStructure && addCategoryToStructure(customDeepCategory.trim(), currentCategoryPath);
        try {
          const parsed = parseCategoryStructure(customDeepCategory.trim());
          const availablePaths = extractCategoryPaths(parsed);
          if (availablePaths.length > 0) {
            const fullPath = selectedCategoryPath 
              ? `${selectedCategoryPath} > ${availablePaths[0]}`
              : availablePaths[0];
            setProductFormData((prev: any) => ({ ...prev, deepCategory: fullPath }));
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error parsing complex category structure:', error);
        }
      } else {
        const fullPath = selectedCategoryPath 
          ? `${selectedCategoryPath} > ${customDeepCategory.trim()}`
          : customDeepCategory.trim();
        setProductFormData((prev: any) => ({ ...prev, deepCategory: fullPath }));
        addCategoryToStructure && addCategoryToStructure(customDeepCategory.trim(), currentCategoryPath);
      }
      setShowCustomDeepCategory(false);
      setCustomDeepCategory('');
      setCategoryDropdownOpen(false);
    }
  };

  return (
    <div>
      <Label>Deep Category</Label>
      {!showCustomDeepCategory ? (
        <div className="space-y-2">
          <Popover open={categoryDropdownOpen} onOpenChange={setCategoryDropdownOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={categoryDropdownOpen}
                className="w-full justify-between"
              >
                {productFormData.deepCategory || "Select category..."}
                <ChevronRight className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Search categories..." />
                <CommandList>
                  <CommandEmpty>No categories found.</CommandEmpty>
                  <CommandGroup>
                    {currentCategoryPath.length > 0 && (
                      <CommandItem
                        onSelect={goBackInCategory}
                        className="flex items-center gap-2 text-blue-600"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Back to {currentCategoryPath.length > 1 ? 'previous level' : 'main categories'}
                      </CommandItem>
                    )}
                    {Object.entries(getCurrentLevelCategories()).map(([key, category]: [string, any]) => (
                      <CommandItem
                        key={key}
                        onSelect={() => handleCategorySelect(key, category.name)}
                        className="flex items-center justify-between"
                      >
                        <span>{category.name}</span>
                        {hasChildren(category) && (
                          <ChevronRight className="h-4 w-4 opacity-50" />
                        )}
                      </CommandItem>
                    ))}
                    <CommandItem
                      onSelect={() => {
                        setShowCustomDeepCategory(true);
                        setCategoryDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 text-green-600 border-t"
                    >
                      <Plus className="h-4 w-4" />
                      Add Custom Category
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="flex items-center w-full">
              <Input
                value={customDeepCategory}
                onChange={(e) => setCustomDeepCategory(e.target.value)}
                placeholder={`${selectedCategoryPath ? selectedCategoryPath + ' > ' : ''}Enter custom category`}
                className="rounded-l-md"
              />
            </div>
            <Button 
              type="button" 
              onClick={handleAddCustomCategory}
              size="sm"
            >
              Add
            </Button>
            <Button 
              type="button" 
              onClick={() => {
                setShowCustomDeepCategory(false);
                setCustomDeepCategory('');
              }} 
              variant="outline" 
              size="sm"
            >
              Cancel
            </Button>
          </div>
          {selectedCategoryPath && (
            <p className="text-sm text-gray-500">
              Will be added under: {selectedCategoryPath}
            </p>
          )}
        </div>
      )}
    </div>
  );
}; 