// contexts/ProductVariantContext.tsx
import { createContext, useContext, createSignal,createEffect, children } from "solid-js";
import type { JSX } from "solid-js";
import { nanoid } from "nanoid";
import { useProductContext } from "./FormDataContext";
import { ProductVarientCombinationSKUQuantity, VendorDetailsList } from "../lib/product-data";

type ComboMediaDrag = { combo: number; index: number };

export type ProductVariantContextType = {
  productFormData: any;
  setProductFormData: (val: any) => void;
  variantOptions: any[];
  setVariantOptions: (val: any[]) => void;
  variantCombinations: any[];
  setVariantCombinations: (val: any[]) => void;
  skuErrors: Record<number, string>;
  setSkuErrors: (val: Record<number, string>) => void;
  previousVariantOptions: any[];
  setPreviousVariantOptions: (val: any[]) => void;
  combinationMediaStates: Record<number, any>;
  setCombinationMediaStates: (val: Record<number, any>) => void;
  showVariantValueErrors: boolean;
  setShowVariantValueErrors: (val: boolean) => void;
  variantNameNoValueErrorIds: string[];
  setVariantNameNoValueErrorIds: (val: string[]) => void;
  draggedVariant: number | null;
  setDraggedVariant: (val: number | null) => void;
  draggedComboMedia: ComboMediaDrag | null;
  setDraggedComboMedia: (val: ComboMediaDrag | null) => void;
  dragOverComboMedia: ComboMediaDrag | null;
  setDragOverComboMedia: (val: ComboMediaDrag | null) => void;
  isUploading: boolean;
  setIsUploading: (val: boolean) => void;
  uploadError: string;
  setUploadError: (val: string) => void;
  editingComboIndex: number | null;
  setEditingComboIndex: (val: number | null) => void;
  imageUrlPopupIndex: number | null;
  setImageUrlPopupIndex: (val: number | null) => void;
  newImageUrl: string;
  setNewImageUrl: (val: string) => void;
  imageUrlError: string;
  setImageUrlError: (val: string) => void;

  // 👉 All functions
  isSkuUnique: (sku: string, currentIndex?: number) => boolean;
  handleComboMediaDragStart: (combo: number, index: number) => void;
  handleComboMediaDragOver: (combo: number, index: number) => void;
  handleComboMediaDrop: (combo: number, index: number) => void;
  handleComboMediaDragEnd: () => void;
  moveCombinationMedia: (comboIndex: number, from: number, to: number) => void;
  removeCombinationMedia: (comboIndex: number, mediaIndex: number) => void;
  handleCombinationMediaUpload: (comboIndex: number, files: FileList) => void;
  validateMediaUrl: (url: string) => boolean;
  addCombinationMedia: (comboIndex: number, mediaType: "image" | "video" | "gif") => void;
  generateSmartVariantCombinations: (options: any[], existing: any[]) => any[];
  hasVariantOptionsChanged: (current: any[], previous: any[]) => boolean;
  getVariantNameError: (id: string, name: string) => string;
  getVariantOptionValueError: (variant: any) => string;
  addVariantOption: () => void;
  updateVariantName: (id: string, name: string) => void;
  addVariantValue: (id: string, value: string) => void;
  removeVariantValue: (id: string, valueIndex: number) => void;
  removeVariantOption: (id: string) => void;
  handleDragStart: (index: number) => void;
  handleDragOver: (e: DragEvent) => void;
  handleDrop: (e: DragEvent, dropIndex: number) => void;
  updateCombination: (index: number, field: string, value: any) => void;
  validateVariants: () => boolean;
  isValidImageUrl: (url: string) => boolean;
};
const ProductVariantContext = createContext<ProductVariantContextType>();

export const ProductVariantProvider = (props: { children: JSX.Element }) => {
  const { productFormData, setProductFormData } = useProductContext();
  // Signals
  const [variantOptions, setVariantOptions] = createSignal<any[]>(productFormData()?.variantOptions || []);
  const [variantCombinations, setVariantCombinations] = createSignal<any[]>(productFormData()?.variantCombinations || []);
  const [skuErrors, setSkuErrors] = createSignal<Record<number, string>>({});
  const [previousVariantOptions, setPreviousVariantOptions] = createSignal<any[]>([]);
  const [combinationMediaStates, setCombinationMediaStates] = createSignal<Record<number, any>>({});
  const [showVariantValueErrors, setShowVariantValueErrors] = createSignal(false);
  const [variantNameNoValueErrorIds, setVariantNameNoValueErrorIds] = createSignal<string[]>([]);
  const [draggedVariant, setDraggedVariant] = createSignal<number | null>(null);
  const [draggedComboMedia, setDraggedComboMedia] = createSignal<ComboMediaDrag | null>(null);
  const [dragOverComboMedia, setDragOverComboMedia] = createSignal<ComboMediaDrag | null>(null);
  const [isUploading, setIsUploading] = createSignal(false);
  const [uploadError, setUploadError] = createSignal("");
  const [editingComboIndex, setEditingComboIndex] = createSignal<number | null>(null);
  const [imageUrlPopupIndex, setImageUrlPopupIndex] = createSignal<number | null>(null);
  const [newImageUrl, setNewImageUrl] = createSignal("");
  const [imageUrlError, setImageUrlError] = createSignal("");
  const firstVendorName = Object.keys(VendorDetailsList)[0] || 'Default Vendor';
  
  const isSkuUnique = (sku: string, currentIndex?: number): boolean => {
    if (!sku.trim()) return false;
    const allExistingSkus = Object.values(ProductVarientCombinationSKUQuantity)
      .flatMap(user => Object.values(user))
      .flatMap(website => Object.values(website||""))
      .flatMap(product => Object.keys(product));
    if (allExistingSkus.includes(sku)) return false;
    for (let i = 0; i < variantCombinations().length; i++) {
        if (i !== currentIndex && variantCombinations()[i].sku === sku) return false;
      }
      return true;
  };

  // --- Combo Media Drag/Drop ---

const handleComboMediaDragStart = (combo: number, index: number) => {
  setDraggedComboMedia({ combo, index });
};

const handleComboMediaDragOver = (combo: number, index: number) => {
  setDragOverComboMedia({ combo, index });
};

const handleComboMediaDrop = (combo: number, index: number) => {
  const drag = draggedComboMedia();
  if (!drag || drag.combo !== combo) return;
  moveCombinationMedia(combo, drag.index, index);
  setDraggedComboMedia(null);
  setDragOverComboMedia(null);
};

const handleComboMediaDragEnd = () => {
  setDraggedComboMedia(null);
  setDragOverComboMedia(null);
};

  
  const moveCombinationMedia = (comboIndex: number, from: number, to: number) => {
    setVariantCombinations((prev) => {
      const updated = [...prev];
      const media = [...updated[comboIndex].varientmedia];
      const [removed] = media.splice(from, 1);
      media.splice(to, 0, removed);
      updated[comboIndex] = { ...updated[comboIndex], varientmedia: media };
      setProductFormData({ ...productFormData(), variantCombinations: updated });
      return updated;
    });
  };
  
  const removeCombinationMedia = (comboIndex: number, mediaIndex: number) => {
    setVariantCombinations((prev) => {
      const updated = [...prev];
      const media = updated[comboIndex].varientmedia.filter((_: any, i: number) => i !== mediaIndex);
      updated[comboIndex] = { ...updated[comboIndex], varientmedia: media };
      setProductFormData({ ...productFormData(), variantCombinations: updated });
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
        updated[comboIndex] = { ...updated[comboIndex], varientmedia: [...currentMedia, ...newMedia] };
        setProductFormData({ ...productFormData(), variantCombinations: updated });
        return updated;
      });
    } catch (error) {
      setUploadError('Failed to upload media files');
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
    const states = combinationMediaStates();
    const currentUrl = states[comboIndex]?.currentMediaUrl?.trim();
    if (!currentUrl) return;
    if (!validateMediaUrl(currentUrl)) {
      alert('Please enter a valid URL');
      return;
    }
    setVariantCombinations(prev => {
      const updated = [...prev];
      const currentMedia = updated[comboIndex].varientmedia || [];
      updated[comboIndex] = { ...updated[comboIndex], varientmedia: [...currentMedia, { type: mediaType, url: currentUrl }] };
      setProductFormData({ ...productFormData(), variantCombinations: updated });
      return updated;
    });
    setCombinationMediaStates(prev => ({
      ...prev,
      [comboIndex]: { ...prev[comboIndex], currentMediaUrl: '' }
    }));
  };
  
  const generateNextProductId = () => `V${nanoid()}`;
  
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
            varientId: generateNextProductId(),
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
  // Re-generate variant combinations when variantOptions change
  createEffect(() => {
    const options = variantOptions();
    if (options.length > 0) {
      const allHaveValues = options.every(v => v.values.length > 0);
      if (allHaveValues && hasVariantOptionsChanged(options, previousVariantOptions())) {
        // generate and set combinations
        const updatedCombinations = generateSmartVariantCombinations(options, variantCombinations());
        setVariantCombinations(updatedCombinations);
        setProductFormData({ ...productFormData(), variantCombinations: updatedCombinations });
  
        const newMediaStates: Record<number, any> = { ...combinationMediaStates() };
        updatedCombinations.forEach((_, index) => {
          if (!newMediaStates[index]) {
            newMediaStates[index] = { currentMediaUrl: '', currentMediaType: 'image' };
          }
        });
        setCombinationMediaStates(newMediaStates);
      } else if (
        options.some((v, idx) =>
          v.name.trim().length > 0 &&
          v.values.length === 0 &&
          !(idx === options.length - 1 &&
            v.name.trim().length > 0 &&
            v.values.length === 0 &&
            options.filter(opt => opt.name.trim().length > 0 && opt.values.length === 0).length === 1)
        )
      ) {
        setVariantCombinations([]);
        setProductFormData({ ...productFormData(), variantCombinations: [] });
      }
      setPreviousVariantOptions(JSON.parse(JSON.stringify(options)));
    } else {
      setVariantCombinations([]);
      setProductFormData({ ...productFormData(), variantCombinations: [] });
    }
  });
  
  // Sync with productFormData changes
  createEffect(() => {
    const formData = productFormData();
    if (formData && Object.keys(formData).length > 0) {
      if (formData.variantOptions && JSON.stringify(formData.variantOptions) !== JSON.stringify(variantOptions())) {
        setVariantOptions(formData.variantOptions);
      }
      if (formData.variantCombinations && JSON.stringify(formData.variantCombinations) !== JSON.stringify(variantCombinations())) {
        setVariantCombinations(formData.variantCombinations);
      }
    }
  });
  
  // --- Validation Functions ---
  
  const getVariantNameError = (id: string, name: string) => {
    const lowerName = name.trim().toLowerCase();
    if (!lowerName) return '';
    const isDuplicate = variantOptions().some(
      variant => variant.id !== id && variant.name.trim().toLowerCase() === lowerName
    );
    return isDuplicate ? `Variant option name "${name}" already exists. Please use a unique name.` : '';
  };
  
  const getVariantOptionValueError = (variant: any) => {
    return variant.values.length === 0 ? 'Please add at least one value for this option.' : '';
  };
  
  // --- Variant Option Manipulation ---
  
  const addVariantOption = () => {
    const emptyOption = variantOptions().find(v => v.values.length === 0);
    if (emptyOption) {
      setShowVariantValueErrors(true);
      return;
    }
    if (variantOptions().length >= 3) return;
  
    const newVariant = { id: Date.now().toString(), name: '', values: [] };
    const updatedOptions = [...variantOptions(), newVariant];
    setVariantOptions(updatedOptions);
    setProductFormData({ ...productFormData(), variantOptions: updatedOptions });
    setTimeout(() => validateVariants(), 0);
  };
  
  const updateVariantName = (id: string, name: string) => {
    const updated = variantOptions().map(variant =>
      variant.id === id ? { ...variant, name } : variant
    );
    setVariantOptions(updated);
    setProductFormData({ ...productFormData(), variantOptions: updated });
  
    if (name.trim().length > 0) {
      setVariantNameNoValueErrorIds(prev => prev.filter(eid => eid !== id));
    }
  };
  
  const addVariantValue = (id: string, value: string) => {
    if (!value.trim()) return;
    const option = variantOptions().find(v => v.id === id);
    if (!option || option.name.trim().length === 0) {
      setVariantNameNoValueErrorIds(prev => prev.includes(id) ? prev : [...prev, id]);
      return;
    }
  
    const updated = variantOptions().map(variant =>
      variant.id === id && !variant.values.includes(value.trim())
        ? { ...variant, values: [...variant.values, value.trim()] }
        : variant
    );
    setVariantOptions(updated);
    setProductFormData({ ...productFormData(), variantOptions: updated });
    setVariantNameNoValueErrorIds(prev => prev.filter(eid => eid !== id));
  };
  
  const removeVariantValue = (id: string, valueIndex: number) => {
    const updated = variantOptions().map(variant =>
      variant.id === id
        ? { ...variant, values: variant.values.filter((_:any, index:any) => index !== valueIndex) }
        : variant
    );
    setVariantOptions(updated);
    setProductFormData({ ...productFormData(), variantOptions: updated });
  };
  
  const removeVariantOption = (id: string) => {
    const updated = variantOptions().filter(variant => variant.id !== id);
    setVariantOptions(updated);
    setProductFormData({ ...productFormData(), variantOptions: updated });
    setTimeout(() => validateVariants(), 0);
  };

const handleDragStart = (index: number) => {
  setDraggedVariant(index);
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
};

const handleDrop = (e: DragEvent, dropIndex: number) => {
  e.preventDefault();
  const dragged = draggedVariant();
  if (dragged === null) return;

  const newVariants = [...variantOptions()];
  const draggedItem = newVariants[dragged];
  newVariants.splice(dragged, 1);
  newVariants.splice(dropIndex, 0, draggedItem);

  setVariantOptions(newVariants);
  setProductFormData({ ...productFormData(), variantOptions: newVariants });
  setDraggedVariant(null);

  // reorder combinations according to new variant order
  const updatedCombinations = variantCombinations().map(combo => {
    const reorderedCombo: Record<string, string> = {};
    for (const option of newVariants) {
      if (combo.combination.hasOwnProperty(option.name)) {
        reorderedCombo[option.name] = combo.combination[option.name];
      }
    }
    return { ...combo, combination: reorderedCombo };
  });
  setVariantCombinations(updatedCombinations);
  setProductFormData({ ...productFormData(), variantCombinations: updatedCombinations });
};

// --- Update Combination Field ---
const updateCombination = (index: number, field: string, value: any) => {
  const updated = variantCombinations().map((combo, i) => {
    if (i === index) {
      if (field === 'trackQuantity' && !value && combo.availableQuantity) {
        return { ...combo, [field]: value, availableQuantity: '' };
      }
      return { ...combo, [field]: value };
    }
    return combo;
  });
  setVariantCombinations(updated);
  setProductFormData({ ...productFormData(), variantCombinations: updated });

  if (field === 'sku') {
    const newErrors = { ...skuErrors() };
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

// --- Validate Variants ---
const validateVariants = (): boolean => {
  const errors: string[] = [];
  const options = variantOptions();
  const combinations = variantCombinations();

  if (options.length > 0) {
    const emptyValueOption = options.find(v => v.name.trim() !== '' && v.values.length === 0);
    if (emptyValueOption) {
      errors.push(`Variant option "${emptyValueOption.name}" must have at least one value.`);
    }

    combinations.forEach((combo, i) => {
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
    });
  }

  return errors.length === 0;
};

// --- Auto validate on variant changes ---
createEffect(() => {
  validateVariants();
});

// --- Image URL Validator ---
const isValidImageUrl = (url: string) => /^https?:\/\/.+/i.test(url.trim());

  // 4️⃣ Return context provider
  return (
    <ProductVariantContext.Provider
      value={{
        productFormData,
        setProductFormData,
        variantOptions: variantOptions(),
        setVariantOptions,
        variantCombinations: variantCombinations(),
        setVariantCombinations,
        skuErrors: skuErrors(),
        setSkuErrors,
        previousVariantOptions: previousVariantOptions(),
        setPreviousVariantOptions,
        combinationMediaStates: combinationMediaStates(),
        setCombinationMediaStates,
        showVariantValueErrors: showVariantValueErrors(),
        setShowVariantValueErrors,
        variantNameNoValueErrorIds: variantNameNoValueErrorIds(),
        setVariantNameNoValueErrorIds,
        draggedVariant: draggedVariant(),
        setDraggedVariant,
        draggedComboMedia: draggedComboMedia(),
        setDraggedComboMedia,
        dragOverComboMedia: dragOverComboMedia(),
        setDragOverComboMedia,
        isUploading: isUploading(),
        setIsUploading,
        uploadError: uploadError(),
        setUploadError,
        editingComboIndex: editingComboIndex(),
        setEditingComboIndex,
        imageUrlPopupIndex: imageUrlPopupIndex(),
        setImageUrlPopupIndex,
        newImageUrl: newImageUrl(),
        setNewImageUrl,
        imageUrlError: imageUrlError(),
        setImageUrlError,
        isSkuUnique,
        handleComboMediaDragStart,
        handleComboMediaDragOver,
        handleComboMediaDrop,
        handleComboMediaDragEnd,
        moveCombinationMedia, 
        removeCombinationMedia,
        handleCombinationMediaUpload,
        validateMediaUrl,
        addCombinationMedia,
        generateSmartVariantCombinations,
        hasVariantOptionsChanged,
        getVariantNameError,
        getVariantOptionValueError,
        addVariantOption,
        updateVariantName,
        addVariantValue,
        removeVariantValue,
        removeVariantOption,
        handleDragStart,
        handleDragOver,
        handleDrop,
        updateCombination,
        validateVariants,
        isValidImageUrl,
      }}
    >
      {props.children}
    </ProductVariantContext.Provider>
  );
};

// 5️⃣ Custom hook
export const useProductVariantContext = () => {
  const ctx = useContext(ProductVariantContext);
  if (!ctx) throw new Error("useProductVariantContext must be used within ProductVariantProvider");
  return ctx;
};
