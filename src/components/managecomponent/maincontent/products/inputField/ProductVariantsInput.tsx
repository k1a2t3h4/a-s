// This is a stub. The full implementation would be based on your provided multi-variant logic, using context for state.
// For now, just a placeholder to show where the component will go.
import React, { useState, useEffect } from 'react';
import { useProductContext } from '@/contexts/ProductContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Plus, X, GripVertical} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { VendorDetailsList } from '@/lib/product-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { nanoid } from 'nanoid';
// Dummy for SKU uniqueness check (replace with your actual data source)
const ProductVarientCombinationSKUQuantity: any = {};

export const ProductVariantsInput = () => {
  const { productFormData, setProductFormData } = useProductContext();
  const [variantOptions, setVariantOptions] = useState<any[]>(productFormData?.variantOptions || []);
  const [variantCombinations, setVariantCombinations] = useState<any[]>(productFormData?.variantCombinations || []);
  const [skuErrors, setSkuErrors] = useState<Record<number, string>>({});
  const [previousVariantOptions, setPreviousVariantOptions] = useState<any[]>([]);
  const [combinationMediaStates, setCombinationMediaStates] = useState<Record<number, any>>({});
  const [showVariantValueErrors, setShowVariantValueErrors] = useState(false);
  const [variantNameNoValueErrorIds, setVariantNameNoValueErrorIds] = useState<string[]>([]);
  const [draggedVariant, setDraggedVariant] = useState<number | null>(null);
  const [draggedComboMedia, setDraggedComboMedia] = useState<{ combo: number; index: number } | null>(null);
  const [dragOverComboMedia, setDragOverComboMedia] = useState<{ combo: number; index: number } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const firstVendorName = Object.keys(VendorDetailsList)[0] || 'Default Vendor';
  const [editingComboIndex, setEditingComboIndex] = useState<number | null>(null);
  const [imageUrlPopupIndex, setImageUrlPopupIndex] = useState<number | null>(null);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [imageUrlError, setImageUrlError] = useState('');


  const isSkuUnique = (sku: string, currentIndex?: number): boolean => {
    if (!sku.trim()) return false;
    const allExistingSkus = Object.values(ProductVarientCombinationSKUQuantity)
      .flatMap(user => Object.values(user))
      .flatMap(website => Object.values(website))
      .flatMap(product => Object.keys(product));
    if (allExistingSkus.includes(sku)) return false;
    for (let i = 0; i < variantCombinations.length; i++) {
      if (i !== currentIndex && variantCombinations[i].sku === sku) {
        return false;
      }
    }
    return true;
  };

  // --- Media Drag/Drop ---
  const handleComboMediaDragStart = (combo: number, index: number) => setDraggedComboMedia({ combo, index });
  const handleComboMediaDragOver = (combo: number, index: number) => setDragOverComboMedia({ combo, index });
  const handleComboMediaDrop = (combo: number, index: number) => {
    if (!draggedComboMedia || draggedComboMedia.combo !== combo) return;
    moveCombinationMedia(combo, draggedComboMedia.index, index);
    setDraggedComboMedia(null);
    setDragOverComboMedia(null);
  };
  const handleComboMediaDragEnd = () => {
    setDraggedComboMedia(null);
    setDragOverComboMedia(null);
  };

  const moveCombinationMedia = (comboIndex: number, from: number, to: number) => {
    setVariantCombinations(prev => {
      const updated = [...prev];
      const media = [...updated[comboIndex].varientmedia];
      const [removed] = media.splice(from, 1);
      media.splice(to, 0, removed);
      updated[comboIndex] = { ...updated[comboIndex], varientmedia: media };
      setProductFormData((form: any) => ({ ...form, variantCombinations: updated }));
      return updated;
    });
  };

  const removeCombinationMedia = (comboIndex: number, mediaIndex: number) => {
    setVariantCombinations(prev => {
      const updated = [...prev];
      const media = updated[comboIndex].varientmedia.filter((_: any, i: number) => i !== mediaIndex);
      updated[comboIndex] = { ...updated[comboIndex], varientmedia: media };
      setProductFormData((form: any) => ({ ...form, variantCombinations: updated }));
      return updated;
    });
  };

  const handleCombinationMediaUpload = (comboIndex: number, files: FileList) => {
    setIsUploading(true);
    setUploadError('');
    try {
      const newMedia = Array.from(files).map(file => {
        const url = URL.createObjectURL(file);
        const ext = file.name.split('.').pop()?.toLowerCase();
        let type: 'image' | 'video' | 'gif' = 'image';
        if (ext === 'mp4' || ext === 'webm' || ext === 'mov') type = 'video';
        if (ext === 'gif') type = 'gif';
        return { type, url, name: file.name };
      });
      setVariantCombinations(prev => {
        const updated = [...prev];
        const currentMedia = updated[comboIndex].varientmedia || [];
        updated[comboIndex] = { 
          ...updated[comboIndex], 
          varientmedia: [...currentMedia, ...newMedia] 
        };
        setProductFormData((form: any) => ({ ...form, variantCombinations: updated }));
        return updated;
      });
    } catch (error) {
      setUploadError('Failed to upload media files');
      // eslint-disable-next-line no-console
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const validateMediaUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const addCombinationMedia = (comboIndex: number, mediaType: 'image' | 'video' | 'gif') => {
    const currentUrl = combinationMediaStates[comboIndex]?.currentMediaUrl?.trim();
    if (!currentUrl) return;
    if (!validateMediaUrl(currentUrl)) {
      alert('Please enter a valid URL');
      return;
    }
    setVariantCombinations(prev => {
      const updated = [...prev];
      const currentMedia = updated[comboIndex].varientmedia || [];
      updated[comboIndex] = { 
        ...updated[comboIndex], 
        varientmedia: [...currentMedia, { type: mediaType, url: currentUrl }] 
      };
      setProductFormData((form: any) => ({ ...form, variantCombinations: updated }));
      return updated;
    });
    setCombinationMediaStates(prev => ({
      ...prev,
      [comboIndex]: { ...prev[comboIndex], currentMediaUrl: '' }
    }));
  };
  const generateNextProductId = () => {
    return `V${nanoid()}`;
  };
  // --- Combination Generation ---
  const generateSmartVariantCombinations = (options: any[], existingCombinations: any[]): any[] => {
    if (!options || options.length === 0) return [];
    const newCombinations: any[] = [];
    const existingCombinationsMap = new Map<string, any>();
    existingCombinations.forEach(combo => {
      const key = JSON.stringify(combo.combination);
      existingCombinationsMap.set(key, combo);
    });
    function generateCombos(opts: any[], currentCombo: Record<string, string> = {}, index: number = 0) {
      if (index === opts.length) {
        const combinationKey = JSON.stringify(currentCombo);
        const existingCombo = existingCombinationsMap.get(combinationKey);
        if (existingCombo) {
          newCombinations.push(existingCombo);
        } else {
          newCombinations.push({
            combination: { ...currentCombo },
            varientId:generateNextProductId(),
            varientmedia: [],
            image: '',
            enabled: true,
            price: '',
            compareAtPrice: '',
            costPerItem: '',
            profit: '',
            margin: '',
            trackQuantity: true,
            availableQuantity: '',
            shopLocation: '',
            continueSellingOutOfStock: false,
            hasSKUBarcode: false,
            sku: '',
            barcode: '',
            isPhysical: false,
            weight: '',
            weightUnit: 'kg',
            height: '',
            breadth: '',
            length: '',
            dimensionUnit: 'cm',
            hasHSCode: false,
            countryOfOrigin: '',
            hsCode: '',
            vendor: firstVendorName,
          });
        }
        return;
      }
      const option = opts[index];
      for (const value of option.values) {
        generateCombos(opts, { ...currentCombo, [option.name]: value }, index + 1);
      }
    }
    generateCombos(options);
    return newCombinations;
  };

  const hasVariantOptionsChanged = (current: any[], previous: any[]): boolean => {
    if (current.length !== previous.length) return true;
    for (let i = 0; i < current.length; i++) {
      const currentOption = current[i];
      const previousOption = previous[i];
      if (!previousOption) return true;
      if (currentOption.name !== previousOption.name) return true;
      if (currentOption.values.length !== previousOption.values.length) return true;
      for (let j = 0; j < currentOption.values.length; j++) {
        if (currentOption.values[j] !== previousOption.values[j]) return true;
      }
    }
    return false;
  };

  // --- Effects ---
  useEffect(() => {
    if (variantOptions.length > 0) {
      const allHaveValues = variantOptions.every((v) => v.values.length > 0);
      if (allHaveValues && hasVariantOptionsChanged(variantOptions, previousVariantOptions)) {
        // generate and set combinations
        const updatedCombinations = generateSmartVariantCombinations(variantOptions, variantCombinations);
        setVariantCombinations(updatedCombinations);
        setProductFormData((form: any) => ({ ...form, variantCombinations: updatedCombinations }));
        const newMediaStates: Record<number, any> = { ...combinationMediaStates };
        updatedCombinations.forEach((_, index) => {
          if (!newMediaStates[index]) {
            newMediaStates[index] = {
              currentMediaUrl: '',
              currentMediaType: 'image'
            };
          }
        });
        setCombinationMediaStates(newMediaStates);
      } else if (
        variantOptions.some(
          (v, idx) =>
            v.name.trim().length > 0 &&
            v.values.length === 0 &&
            // Only clear if this is NOT the only option with empty values and name
            !(
              idx === variantOptions.length - 1 &&
              v.name.trim().length > 0 &&
              v.values.length === 0 &&
              variantOptions.filter(opt => opt.name.trim().length > 0 && opt.values.length === 0).length === 1
            )
        )
      ) {
        setVariantCombinations([]);
        setProductFormData((form: any) => ({ ...form, variantCombinations: [] }));
      }
      setPreviousVariantOptions(JSON.parse(JSON.stringify(variantOptions)));
    } else {
      setVariantCombinations([]);
      setProductFormData((form: any) => ({ ...form, variantCombinations: [] }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variantOptions]);

  // Sync with productFormData changes
  useEffect(() => {
    if (productFormData && Object.keys(productFormData).length > 0) {
      if (productFormData.variantOptions && JSON.stringify(productFormData.variantOptions) !== JSON.stringify(variantOptions)) {
        setVariantOptions(productFormData.variantOptions);
      }
      if (productFormData.variantCombinations && JSON.stringify(productFormData.variantCombinations) !== JSON.stringify(variantCombinations)) {
        setVariantCombinations(productFormData.variantCombinations);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productFormData]);

  // --- Validation ---
  const getVariantNameError = (id: string, name: string) => {
    const lowerName = name.trim().toLowerCase();
    if (!lowerName) return '';
    const isDuplicate = variantOptions.some(
      (variant) => variant.id !== id && variant.name.trim().toLowerCase() === lowerName
    );
    return isDuplicate ? `Variant option name "${name}" already exists. Please use a unique name.` : '';
  };

  const getVariantOptionValueError = (variant: any) => {
    if (variant.values.length === 0) {
      return 'Please add at least one value for this option.';
    }
    return '';
  };

  const addVariantOption = () => {
    const emptyOption = variantOptions.find((v) => v.values.length === 0);
    if (emptyOption) {
      setShowVariantValueErrors(true);
      return;
    }
    if (variantOptions.length >= 3) return;
    const newVariant = {
      id: Date.now().toString(),
      name: '',
      values: []
    };
    setVariantOptions([...variantOptions, newVariant]);
    setProductFormData((form: any) => ({ ...form, variantOptions: [...variantOptions, newVariant] }));
    setTimeout(() => validateVariants(), 0);
  };

  const updateVariantName = (id: string, name: string) => {
    setVariantOptions((prev) => {
      const updated = prev.map((variant) => (variant.id === id ? { ...variant, name } : variant));
      setProductFormData((form: any) => ({ ...form, variantOptions: updated }));
      return updated;
    });
    if (name.trim().length > 0) {
      setVariantNameNoValueErrorIds((prev) => prev.filter((eid) => eid !== id));
    }
  };

  const addVariantValue = (id: string, value: string) => {
    if (!value.trim()) return;
    const option = variantOptions.find((v) => v.id === id);
    if (!option || option.name.trim().length === 0) {
      setVariantNameNoValueErrorIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
      return;
    }
    setVariantOptions((prev) => {
      const updated = prev.map((variant) =>
        variant.id === id && !variant.values.includes(value.trim())
          ? { ...variant, values: [...variant.values, value.trim()] }
          : variant
      );
      setProductFormData((form: any) => ({ ...form, variantOptions: updated }));
      return updated;
    });
    setVariantNameNoValueErrorIds((prev) => prev.filter((eid) => eid !== id));
  };

  const removeVariantValue = (id: string, valueIndex: number) => {
    setVariantOptions((prev) => {
      const updated = prev.map((variant) =>
        variant.id === id
          ? { ...variant, values: variant.values.filter((_, index) => index !== valueIndex) }
          : variant
      );
      setProductFormData((form: any) => ({ ...form, variantOptions: updated }));
      return updated;
    });
  };

  const removeVariantOption = (id: string) => {
    setVariantOptions((prev) => {
      const updated = prev.filter((variant) => variant.id !== id);
      setProductFormData((form: any) => ({ ...form, variantOptions: updated }));
      return updated;
    });
    setTimeout(() => validateVariants(), 0);
  };

  const handleDragStart = (index: number) => {
    setDraggedVariant(index);
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedVariant === null) return;
    const newVariants = [...variantOptions];
    const draggedItem = newVariants[draggedVariant];
    newVariants.splice(draggedVariant, 1);
    newVariants.splice(dropIndex, 0, draggedItem);
    setVariantOptions(newVariants);
    setProductFormData((form: any) => ({ ...form, variantOptions: newVariants }));
    setDraggedVariant(null);
    setVariantCombinations((prevCombinations) => {
      const updated = prevCombinations.map((combo) => {
        const reorderedCombo: Record<string, string> = {};
        for (const option of newVariants) {
          if (combo.combination.hasOwnProperty(option.name)) {
            reorderedCombo[option.name] = combo.combination[option.name];
          }
        }
        return {
          ...combo,
          combination: reorderedCombo
        };
      });
      setProductFormData((form: any) => ({ ...form, variantCombinations: updated }));
      return updated;
    });
  };

  const updateCombination = (index: number, field: string, value: any) => {
    setVariantCombinations((prev) => {
      const updated = prev.map((combo, i) => {
        if (i === index) {
          if (field === 'trackQuantity' && !value && combo.availableQuantity) {
            return { ...combo, [field]: value, availableQuantity: '' };
          }
          return { ...combo, [field]: value };
        }
        return combo;
      });
      setProductFormData((form: any) => ({ ...form, variantCombinations: updated }));
      return updated;
    });
    if (field === 'sku') {
      const newErrors = { ...skuErrors };
      if (!value.trim()) {
        newErrors[index] = 'SKU is required';
      } else if (!isSkuUnique(value, index)) {
        newErrors[index] = 'SKU must be unique across all products';
      } else {
        delete newErrors[index];
      }
      setSkuErrors(newErrors);
    }
  };

  const validateVariants = () => {
    const errors: string[] = [];
    if (variantOptions.length > 0) {
      const emptyValueOption = variantOptions.find(v => v.name.trim() !== '' && v.values.length === 0);
      if (emptyValueOption) {
        errors.push(`Variant option "${emptyValueOption.name}" must have at least one value.`);
      }
      for (let i = 0; i < variantCombinations.length; i++) {
        const combo = variantCombinations[i];
        if (!combo.price || isNaN(Number(combo.price)) || Number(combo.price) < 0) {
          errors.push(`Price is required and must be 0 or a positive number for combination #${i + 1}.`);
        }
        if (combo.trackQuantity) {
          if (!combo.availableQuantity || isNaN(Number(combo.availableQuantity)) || Number(combo.availableQuantity) < 0) {
            errors.push(`Available quantity is required and must be 0 or a positive number for combination #${i + 1} when track quantity is enabled.`);
          }
        }
        if (typeof combo.trackQuantity !== 'boolean') {
          errors.push(`Track quantity must be set for combination #${i + 1}.`);
        }
      }
    }
    const isValid = errors.length === 0;
    // Optionally, you can call a validation callback here
    return isValid;
  };

  useEffect(() => {
    validateVariants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variantOptions, variantCombinations]);

  function isValidImageUrl(url: string) {
    return /^https?:\/\/.+/i.test(url.trim());
  }

  // --- Render (UI code remains as in your last edit) ---
  // ... (UI code unchanged)
  return (
    <>
      <Card>    
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Variant Options
            <Button type="button" onClick={addVariantOption} size="sm" disabled={variantOptions.length >= 3}>
              <Plus className="h-4 w-4 mr-1" />
              Add Variant
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {variantOptions.map((variant: any, index: number) => (
              <div
                key={variant.id}
                className="border rounded-lg p-4 bg-white"
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                    <Input
                      value={variant.name}
                      onChange={(e) => updateVariantName(variant.id, e.target.value)}
                      placeholder="Variant name (e.g., Size, Color)"
                      className={`w-48${getVariantNameError(variant.id, variant.name) || variantNameNoValueErrorIds.includes(variant.id) ? ' border-red-500' : ''}`}
                    />
                  </div>
                  {getVariantNameError(variant.id, variant.name) && (
                    <p className="text-red-500 text-xs mt-1">{getVariantNameError(variant.id, variant.name)}</p>
                  )}
                  {variantNameNoValueErrorIds.includes(variant.id) && variant.name.trim().length === 0 && (
                    <p className="text-red-500 text-xs mt-1">Please enter a name for this option before adding values.</p>
                  )}
                  {variantNameNoValueErrorIds.includes(variant.id) && variant.name.trim().length > 0 && (
                    <p className="text-red-500 text-xs mt-1">{getVariantOptionValueError(variant)}</p>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeVariantOption(variant.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add value"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addVariantValue(variant.id, e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={(e) => {
                        const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                        addVariantValue(variant.id, input.value);
                        input.value = '';
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {variant.values.map((value: string, vIndex: number) => (
                      <Badge key={vIndex} variant="secondary" className="flex items-center gap-1">
                        {value}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeVariantValue(variant.id, vIndex)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
                {getVariantOptionValueError(variant) && showVariantValueErrors && (
                  <p className="text-red-500 text-xs mt-1">{getVariantOptionValueError(variant)}</p>
                )}
              </div>
            ))}
          </div>
          
        </CardContent>
      </Card>
      {/* Variant Combinations Table */}
      {variantCombinations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Variant Combinations ({variantCombinations.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Combination</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Available Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {variantCombinations.map((combination: any, index: number) => {
                  // Get image: combination.image, else first image in varientmedia, else null
                  let imageUrl = combination.image;
                  if (!imageUrl && Array.isArray(combination.varientmedia)) {
                    const firstImg = combination.varientmedia.find((m: any) => m.type === 'image');
                    if (firstImg) imageUrl = firstImg.url;
                  }
                  return (
                    <React.Fragment key={index}>
                      <TableRow
                        className="cursor-pointer"
                        onClick={(e) => {
                          // Only open popup if not clicking on an input
                          if ((e.target as HTMLElement).tagName !== 'INPUT') {
                            setEditingComboIndex(index);
                          }
                        }}
                      >
                        {/* Image cell */}
                        <TableCell>
                          {imageUrl ? (
                            <img src={imageUrl} alt="variant" className="w-10 h-10 object-cover rounded border" />
                          ) : (
                            <span
                              className="w-10 h-10 flex items-center justify-center border rounded cursor-pointer bg-gray-50 hover:bg-gray-100"
                              onClick={e => { e.stopPropagation(); setImageUrlPopupIndex(index); setNewImageUrl(''); setImageUrlError(''); }}
                              title="Add Image"
                            >
                              <Plus className="w-6 h-6 text-gray-400" />
                            </span>
                          )}
                        </TableCell>
                        {/* Combination cell */}
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {Object.entries(combination.combination).map(([key, value]) => (
                              <Badge key={String(key)} variant="outline">
                                {String(key)}: {String(value)}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        {/* Price cell (inline editable) */}
                        <TableCell>
                          <Input
                            type="number"
                            value={combination.price || ''}
                            onChange={(e) => updateCombination(index, 'price', e.target.value)}
                            className="w-24"
                            min="0"
                            step="0.01"
                            placeholder="Required"
                            onClick={e => e.stopPropagation()}
                          />
                        </TableCell>
                        {/* Available Quantity cell (inline editable) */}
                        <TableCell>
                          <Input
                            type="number"
                            value={combination.availableQuantity || ''}
                            onChange={(e) => updateCombination(index, 'availableQuantity', e.target.value)}
                            className="w-24"
                            min="0"
                            placeholder={combination.trackQuantity ? "Required" : "Optional"}
                            disabled={!combination.trackQuantity}
                            onClick={e => e.stopPropagation()}
                          />
                        </TableCell>
                      </TableRow>
                      {/* Dialog for editing this combination */}
                      {editingComboIndex === index && (
                        <Dialog open={true} onOpenChange={(open) => !open && setEditingComboIndex(null)}>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>
                                Edit {Object.values(combination.combination).join('/')}
                              </DialogTitle>
                            </DialogHeader>
                            {/* Section 1: Create this variant */}
                            <div className="mb-4">
                              <Checkbox
                                id="enabled"
                                checked={combination.enabled ?? true}
                                onCheckedChange={(checked) => updateCombination(index, 'enabled', checked)}
                              />
                              <Label htmlFor="enabled" className="ml-2">Create this variant</Label>
                            </div>
                            {/* Section 2: Pricing */}
                            <div className="mb-4">
                              <div className="grid grid-cols-2 gap-4 mb-2">
                                <div>
                                  <Label>Price</Label>
                                  <Input
                                    type="number"
                                    value={combination.price || ''}
                                    onChange={(e) => updateCombination(index, 'price', e.target.value)}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                  />
                                </div>
                                <div>
                                  <Label>Compare-at price</Label>
                                  <Input
                                    type="number"
                                    value={combination.compareAtPrice || ''}
                                    onChange={(e) => updateCombination(index, 'compareAtPrice', e.target.value)}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <Label>Cost per item</Label>
                                  <Input
                                    type="number"
                                    value={combination.costPerItem || ''}
                                    onChange={(e) => updateCombination(index, 'costPerItem', e.target.value)}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                  />
                                </div>
                                <div>
                                  <Label>Profit</Label>
                                  <Input
                                    value={(() => {
                                      const price = parseFloat(combination.price || '0');
                                      const cost = parseFloat(combination.costPerItem || '0');
                                      return price > 0 && cost > 0 ? (price - cost).toFixed(2) : '--';
                                    })()}
                                    disabled
                                    className="bg-gray-100"
                                  />
                                </div>
                                <div>
                                  <Label>Margin</Label>
                                  <Input
                                    value={(() => {
                                      const price = parseFloat(combination.price || '0');
                                      const cost = parseFloat(combination.costPerItem || '0');
                                      if (price > 0 && cost > 0) {
                                        const profit = price - cost;
                                        return ((profit / price) * 100).toFixed(1) + '%';
                                      }
                                      return '--';
                                    })()}
                                    disabled
                                    className="bg-gray-100"
                                  />
                                </div>
                              </div>
                            </div>
                            {/* Section 3: Inventory */}
                            <div className="mb-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <Checkbox
                                  id="track-quantity"
                                  checked={combination.trackQuantity || false}
                                  onCheckedChange={(checked) => updateCombination(index, 'trackQuantity', checked)}
                                />
                                <Label htmlFor="track-quantity">Track quantity</Label>
                              </div>
                              {combination.trackQuantity && (
                                <>
                                  <div className="mb-2">
                                    <Label>Quantity</Label>
                                    <Input
                                      type="number"
                                      value={combination.availableQuantity || ''}
                                      onChange={(e) => updateCombination(index, 'availableQuantity', e.target.value)}
                                      placeholder="0"
                                      min="0"
                                    />
                                  </div>
                                  <div className="mb-2">
                                    <Label>Shop location</Label>
                                    <Input
                                      type="number"
                                      value={combination.shopLocation || ''}
                                      onChange={(e) => updateCombination(index, 'shopLocation', e.target.value)}
                                      placeholder="0"
                                      min="0"
                                    />
                                  </div>
                                </>
                              )}
                              <div className="flex items-start space-x-2 mb-2">
                                <Checkbox
                                  id="continue-selling"
                                  checked={combination.continueSellingOutOfStock || false}
                                  onCheckedChange={(checked) => updateCombination(index, 'continueSellingOutOfStock', checked)}
                                />
                                <div>
                                  <Label htmlFor="continue-selling">Continue selling when out of stock</Label>
                                  <p className="text-sm text-gray-500 mt-1">
                                    This won't affect Shopify POS. Staff will see a warning, but can complete sales when available inventory reaches zero and below.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 mb-2">
                                <Checkbox
                                  id="has-sku-barcode"
                                  checked={combination.hasSKUBarcode || false}
                                  onCheckedChange={(checked) => updateCombination(index, 'hasSKUBarcode', checked)}
                                />
                                <Label htmlFor="has-sku-barcode">This product has a SKU or barcode</Label>
                              </div>
                              {combination.hasSKUBarcode && (
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>SKU (Stock Keeping Unit)</Label>
                                    <Input
                                      value={combination.sku || ''}
                                      onChange={(e) => updateCombination(index, 'sku', e.target.value)}
                                      placeholder="Enter SKU"
                                    />
                                  </div>
                                  <div>
                                    <Label>Barcode (ISBN, UPC, GTIN, etc.)</Label>
                                    <Input
                                      value={combination.barcode || ''}
                                      onChange={(e) => updateCombination(index, 'barcode', e.target.value)}
                                      placeholder="Enter barcode"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                            {/* Section 4: Media (already present, keep as is) */}
                            <div className="space-y-3">
                              <Label>Add Media (Image, Video, GIF)</Label>
                              {/* New: Manage main image field */}
                              <div className="mb-2">
                                <Label>Main Image (for this variant)</Label>
                                <div className="flex items-center gap-2">
                                  {combination.image ? (
                                    <img src={combination.image} alt="main" className="w-12 h-12 object-cover rounded border" />
                                  ) : (
                                    <span className="w-12 h-12 flex items-center justify-center border rounded bg-gray-50 text-gray-400">No Image</span>
                                  )}
                                  <Input
                                    style={{ maxWidth: 220 }}
                                    value={combination.image || ''}
                                    onChange={e => updateCombination(index, 'image', e.target.value)}
                                    placeholder="Paste image URL"
                                  />
                                  {combination.image && (
                                    <Button type="button" size="icon" variant="destructive" onClick={() => updateCombination(index, 'image', '')}>
                                      <X className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2 mb-2">
                                <Input
                                  value={combinationMediaStates[index]?.currentMediaUrl || ''}
                                  onChange={(e) => setCombinationMediaStates(prev => ({
                                    ...prev,
                                    [index]: { ...prev[index], currentMediaUrl: e.target.value }
                                  }))}
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                      addCombinationMedia(index, combinationMediaStates[index]?.currentMediaType || 'image');
                                    }
                                  }}
                                  placeholder="Enter media URL"
                                />
                                <select
                                  value={combinationMediaStates[index]?.currentMediaType || 'image'}
                                  onChange={(e) => setCombinationMediaStates(prev => ({
                                    ...prev,
                                    [index]: { ...prev[index], currentMediaType: e.target.value }
                                  }))}
                                >
                                  <option value="image">Image</option>
                                  <option value="video">Video</option>
                                  <option value="gif">GIF</option>
                                </select>
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={() => addCombinationMedia(index, combinationMediaStates[index]?.currentMediaType || 'image')}
                                >Add</Button>
                                <input
                                  type="file"
                                  multiple
                                  accept="image/*,video/*,.gif"
                                  style={{ display: 'none' }}
                                  id={`combo-media-upload-${index}`}
                                  onChange={(e) => e.target.files && handleCombinationMediaUpload(index, e.target.files)}
                                />
                                <label htmlFor={`combo-media-upload-${index}`}>
                                  <Button type="button" size="sm" disabled={isUploading}>
                                    {isUploading ? 'Uploading...' : 'Upload'}
                                  </Button>
                                </label>
                              </div>
                              {uploadError && (
                                <p className="text-red-500 text-sm mt-1">{uploadError}</p>
                              )}
                              <div className="flex flex-wrap gap-2">
                                {combination.varientmedia.map((media: any, mediaIndex: number) => (
                                  <div
                                    key={mediaIndex}
                                    className={`relative group flex flex-col items-center${draggedComboMedia && draggedComboMedia.combo === index && draggedComboMedia.index === mediaIndex ? ' opacity-50' : ''}${dragOverComboMedia && dragOverComboMedia.combo === index && dragOverComboMedia.index === mediaIndex ? ' ring-2 ring-blue-400' : ''}`}
                                    draggable
                                    onDragStart={() => handleComboMediaDragStart(index, mediaIndex)}
                                    onDragOver={(e) => { e.preventDefault(); handleComboMediaDragOver(index, mediaIndex); }}
                                    onDrop={() => handleComboMediaDrop(index, mediaIndex)}
                                    onDragEnd={handleComboMediaDragEnd}
                                    style={{ cursor: 'grab' }}
                                  >
                                    <div className="flex items-center gap-1">
                                      <span className="cursor-grab text-gray-400">&#9776;</span>
                                      {media.type === 'image' || media.type === 'gif' ? (
                                        <img src={media.url} alt={media.type} className="w-12 h-12 object-cover rounded border" />
                                      ) : (
                                        <div className="w-12 h-12 bg-gray-200 rounded border flex items-center justify-center text-xs">Video</div>
                                      )}
                                    </div>
                                    <div className="flex gap-1 mt-1">
                                      <Button type="button" size="icon" variant="ghost" onClick={() => moveCombinationMedia(index, mediaIndex, mediaIndex - 1)} disabled={mediaIndex === 0}>
                                        &#8592;
                                      </Button>
                                      <Button type="button" size="icon" variant="ghost" onClick={() => moveCombinationMedia(index, mediaIndex, mediaIndex + 1)} disabled={mediaIndex === combination.varientmedia.length - 1}>
                                        &#8594;
                                      </Button>
                                      <Button type="button" size="sm" variant="destructive" onClick={() => removeCombinationMedia(index, mediaIndex)}>
                                        <X className="h-2 w-2" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/* Section 5: Physical product fields */}
                            <div className="mb-4">
                              <div className="flex items-center gap-4 mb-2">
                                <Checkbox
                                  id="isPhysical"
                                  checked={combination.isPhysical || false}
                                  onCheckedChange={(checked) => updateCombination(index, 'isPhysical', checked)}
                                />
                                <Label htmlFor="isPhysical">Is Physical Product?</Label>
                              </div>
                              {combination.isPhysical && (
                                <>
                                  <div className="grid grid-cols-2 gap-6 mb-2">
                                    <div>
                                      <Label>Weight</Label>
                                      <Input
                                        type="number"
                                        value={combination.weight || ''}
                                        onChange={(e) => updateCombination(index, 'weight', e.target.value)}
                                        min="0"
                                        step="0.01"
                                        placeholder="Enter weight"
                                      />
                                    </div>
                                    <div>
                                      <Label>Weight Unit</Label>
                                      <Select
                                        value={combination.weightUnit || 'kg'}
                                        onValueChange={(value) => updateCombination(index, 'weightUnit', value)}
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="kg">kg</SelectItem>
                                          <SelectItem value="g">g</SelectItem>
                                          <SelectItem value="lb">lb</SelectItem>
                                          <SelectItem value="oz">oz</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4 gap-4 mb-2">
                                    <div>
                                      <Label>Height</Label>
                                      <Input
                                        type="number"
                                        value={combination.height || ''}
                                        onChange={(e) => updateCombination(index, 'height', e.target.value)}
                                        min="0"
                                        step="0.01"
                                        placeholder="Height"
                                      />
                                    </div>
                                    <div>
                                      <Label>Breadth</Label>
                                      <Input
                                        type="number"
                                        value={combination.breadth || ''}
                                        onChange={(e) => updateCombination(index, 'breadth', e.target.value)}
                                        min="0"
                                        step="0.01"
                                        placeholder="Breadth"
                                      />
                                    </div>
                                    <div>
                                      <Label>Length</Label>
                                      <Input
                                        type="number"
                                        value={combination.length || ''}
                                        onChange={(e) => updateCombination(index, 'length', e.target.value)}
                                        min="0"
                                        step="0.01"
                                        placeholder="Length"
                                      />
                                    </div>
                                    <div>
                                      <Label>Dimension Unit</Label>
                                      <Select
                                        value={combination.dimensionUnit || 'cm'}
                                        onValueChange={(value) => updateCombination(index, 'dimensionUnit', value)}
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="cm">cm</SelectItem>
                                          <SelectItem value="mm">mm</SelectItem>
                                          <SelectItem value="m">m</SelectItem>
                                          <SelectItem value="in">in</SelectItem>
                                          <SelectItem value="ft">ft</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  {/* Volume Summary */}
                                  {combination.height && combination.breadth && combination.length && (
                                    <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                                      <Label className="text-sm font-medium">Calculated Volume</Label>
                                      <p className="text-sm text-gray-600 mt-1">
                                        {(() => {
                                          const h = parseFloat(combination.height);
                                          const b = parseFloat(combination.breadth);
                                          const l = parseFloat(combination.length);
                                          if (isNaN(h) || isNaN(b) || isNaN(l)) return '';
                                          const volume = h * b * l;
                                          const unit = combination.dimensionUnit;
                                          const unitSuffix = unit === 'cm' ? 'cm³' : unit === 'mm' ? 'mm³' : unit === 'm' ? 'm³' : unit === 'in' ? 'in³' : 'ft³';
                                          return `${volume.toFixed(2)} ${unitSuffix}`;
                                        })()}
                                      </p>
                                    </div>
                                  )}
                                  {/* HS Code Section */}
                                  <div className="mt-2">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <Checkbox
                                        id="hasHSCode"
                                        checked={combination.hasHSCode || false}
                                        onCheckedChange={(checked) => updateCombination(index, 'hasHSCode', checked)}
                                      />
                                      <Label htmlFor="hasHSCode">This product has an HS code</Label>
                                    </div>
                                    {combination.hasHSCode && (
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label>Country/Region of origin</Label>
                                          <Select
                                            value={combination.countryOfOrigin || ''}
                                            onValueChange={(value) => updateCombination(index, 'countryOfOrigin', value)}
                                          >
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="india">India</SelectItem>
                                              <SelectItem value="usa">USA</SelectItem>
                                              <SelectItem value="china">China</SelectItem>
                                              <SelectItem value="uk">UK</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div>
                                          <Label>Harmonized System (HS) code</Label>
                                          <Input
                                            value={combination.hsCode || ''}
                                            onChange={(e) => updateCombination(index, 'hsCode', e.target.value)}
                                            placeholder="Search by product keyword or code"
                                          />
                                          <p className="text-sm text-blue-600 mt-1">Learn more about adding HS codes</p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                            <DialogFooter>
                              <Button type="button" onClick={() => setEditingComboIndex(null)} variant="outline">Cancel</Button>
                              <Button type="button" onClick={() => setEditingComboIndex(null)} variant="default">Save</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                      {imageUrlPopupIndex === index && (
                        <Dialog open={true} onOpenChange={open => { if (!open) setImageUrlPopupIndex(null); }}>
                          <DialogContent className="max-w-sm">
                            <DialogHeader>
                              <DialogTitle>Add Image URL</DialogTitle>
                            </DialogHeader>
                            <div className="mb-2">
                              <Input
                                value={newImageUrl}
                                onChange={e => setNewImageUrl(e.target.value)}
                                placeholder="Paste image URL (jpg, png, gif, webp)"
                              />
                              {imageUrlError && <p className="text-red-500 text-xs mt-1">{imageUrlError}</p>}
                            </div>
                            <DialogFooter>
                              <Button type="button" variant="outline" onClick={() => setImageUrlPopupIndex(null)}>Cancel</Button>
                              <Button
                                type="button"
                                onClick={() => {
                                  if (!isValidImageUrl(newImageUrl)) {
                                    setImageUrlError('Please enter a valid image URL (jpg, png, gif, webp)');
                                    return;
                                  }
                                  updateCombination(index, 'image', newImageUrl.trim());
                                  setImageUrlPopupIndex(null);
                                }}
                              >Add Image</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      
    </>
  );
}; 