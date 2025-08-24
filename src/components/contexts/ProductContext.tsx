// src/contexts/ProductContext.tsx
import { createContext, useContext, type JSX, createSignal, createEffect, untrack } from "solid-js";
import { addProduct, deleteProduct, getProduct, updateProduct } from "../lib/storage";
import { useAppState } from "../lib/state";
import { useAuth } from "./AuthContext";
import { getAvailableCountryNamesFromActiveMarketplace } from "../lib/form-data";
import { nanoid } from "nanoid";
import { ProductVarientCombinationSKUQuantity, VendorDetailsList } from "../lib/product-data";

export interface Media {
  type: 'image' | 'gif' | 'video';
  url: string;
}

export interface VariantOption {
  id:string;
  name: string;
  values: string[];
}

export interface VariantCombination {
  combination: Record<string, string>;
  variantId?: string;
  variantName?: string;
  variantDescription?: string;
  variantavailableLocations?: { name: string }[];
  status?: string;
  meeshopageUrl?: string;
  variantmedia: Media[];
  price: string;
  image:string;
  shopLocation:string;
  continueSellingOutOfStock:boolean;
  hasSKUBarcode:boolean;
  height:string;
  breadth:string;
  length:string;
  dimensionUnit:string;
  isPhysical:boolean;
  weight:string;
  weightUnit:string;
  compareAtPrice: string;
  sku: string;
  barcode: string;
  trackQuantity: boolean;
  availableQuantity?: string;
  vendor?: string;
  hasHSCode: boolean;
  countryOfOrigin: string;
  hsCode: string;
  varientmedia: [],   
  costPerItem: string
}

// ---------- Types ----------
export interface ProductFormData {
  ProductID?: string;
  ProductName: string;
  ProductDescription?: string;
  template?: string;
  status?: string;
  vendor?: string;
  availableLocations?: { name: string }[];
  deepCategory?: string;
  globalMedia?: { type: "image" | "video" | "gif"; url: string; name?: string }[];
  tags?: string[];
  collections?: string[];
  variantOptions?: VariantOption[];
  variantCombinations?: VariantCombination[];
  isPhysical: boolean;
  weight: string;
  weightUnit: string;
  height: string;
  breadth: string;
  length: string;
  dimensionUnit: string;
  price: string;
  compareAtPrice: string;
  chargeTax: boolean;
  costPerItem: string;
  trackQuantity: boolean;
  availableQuantity: string;
  shopLocation: string;
  continueSellingOutOfStock: boolean;
  hasSKUBarcode: boolean;
  sku: string;
  barcode: string;
  hasHSCode: boolean;
  countryOfOrigin: string;
  hsCode: string;
  [key: string]: any;
}
type ComboMediaDrag = { combo: number; index: number };
interface ProductContextType {
  selectedProduct: () => string | null;
  setSelectedProduct: (id: string | null) => void;
  productFormData: () => ProductFormData;
  setProductFormData: (
    data: ProductFormData | ((prev: ProductFormData) => ProductFormData)
  ) => void;
  refProductFormData: () => ProductFormData;
  canSave: () => boolean;
  selectedTopic: () => string;
  setSelectedTopic: (topic: string) => void;
  handleAddProduct: () => void;
  handleDeleteProduct: (productId: string, productName: string) => void;
  handleProductClick: (productId: string) => void;
  handleSave: () => void;
  handleDiscard: () => void;
  handleBack: () => void;
  skuErrors: Record<number, string>;
  setSkuErrors: (val: Record<number, string>) => void;
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
  expandedIndex: number[];
  setexpandedIndex: (val: number[] | ((prev: number[]) => number[])) => void;
  imageUrlPopupIndex: number | null;
  setImageUrlPopupIndex: (val: number | null) => void;
  newImageUrl: string;
  setNewImageUrl: (val: string) => void;
  imageUrlError: string;
  setImageUrlError: (val: string) => void;
  VendorDetailsList:Record<number,string>;
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
  addCombinationMedia: (url:string,comboIndex: number, mediaType: "image" | "video" | "gif") => void;
  handleLocationSelect: (comboIndex: number, location: { name: string }) => void;
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
}

// ---------- Context ----------
const ProductContext = createContext<ProductContextType>();

export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProductContext must be used within ProductProvider");
  return ctx;
};

export const ProductProvider = (props: { children: JSX.Element }) => {
  const { state } = useAppState();
  const { user } = useAuth();
  const { selectedWebsiteId } = state;

  // Helper: available locations
  const getAllAvailableLocations = () => {
    const names = getAvailableCountryNamesFromActiveMarketplace();
    if (Array.isArray(names)) {
      return names.map((n: any) => (typeof n === "string" ? { name: n } : n));
    }
    return [];
  };

  const initproduct: ProductFormData = {
    ProductName: "",
    ProductDescription: "",
    template: "",
    status: "active",
    vendor: "",
    availableLocations: getAllAvailableLocations(),
    deepCategory: "",
    globalMedia: [],
    tags: [],
    collections: [],
    variantOptions: [],
    variantCombinations: [],
    isPhysical: false,
    weight: "",
    weightUnit: "kg",
    height: "",
    breadth: "",
    length: "",
    dimensionUnit: "cm",
    price: "",
    compareAtPrice: "",
    chargeTax: false,
    costPerItem: "",
    trackQuantity: false,
    availableQuantity: "",
    shopLocation: "",
    continueSellingOutOfStock: false,
    hasSKUBarcode: false,
    sku: "",
    barcode: "",
    hasHSCode: false,
    countryOfOrigin: "",
    hsCode: "",
  };

  // ---------- Signals ----------
  const [selectedProduct, setSelectedProduct] = createSignal<string | null>(null);
  const [productFormData, setProductFormData] = createSignal<ProductFormData>(initproduct);
  const [refProductFormData, setRefProductFormData] = createSignal<ProductFormData>(initproduct);
  const [canSave, setCanSave] = createSignal(false);
  const [selectedTopic, setSelectedTopic] = createSignal<string>("productstablebel");
  const [skuErrors, setSkuErrors] = createSignal<Record<number, string>>({});
  const [showVariantValueErrors, setShowVariantValueErrors] = createSignal(false);
  const [variantNameNoValueErrorIds, setVariantNameNoValueErrorIds] = createSignal<string[]>([]);
  const [draggedVariant, setDraggedVariant] = createSignal<number | null>(null);
  const [draggedComboMedia, setDraggedComboMedia] = createSignal<ComboMediaDrag | null>(null);
  const [dragOverComboMedia, setDragOverComboMedia] = createSignal<ComboMediaDrag | null>(null);
  const [isUploading, setIsUploading] = createSignal(false);
  const [uploadError, setUploadError] = createSignal("");
  const [expandedIndex, setexpandedIndex] = createSignal<number[]>([]);
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
    for (let i = 0; i < productFormData().variantCombinations!.length; i++) {
        if (i !== currentIndex && productFormData().variantCombinations![i].sku === sku) return false;
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
    const combinations = [...(productFormData().variantCombinations ?? [])];
  
    if (!combinations[comboIndex]) return; // safety check
  
    const media = [...(combinations[comboIndex].variantmedia ?? [])];
    const [removed] = media.splice(from, 1);
    media.splice(to, 0, removed);
  
    combinations[comboIndex] = {
      ...combinations[comboIndex],
      variantmedia: media,
    };
  
    setProductFormData({
      ...productFormData(),
      variantCombinations: combinations,
    });
    return combinations;
  };
  

  const removeCombinationMedia = (comboIndex: number, mediaIndex: number) => {
    
      const updated = [...(productFormData().variantCombinations ?? [])];
      const media = updated[comboIndex].variantmedia.filter((_: any, i: number) => i !== mediaIndex);
      updated[comboIndex] = { ...updated[comboIndex], variantmedia: media };
      setProductFormData({ ...productFormData(), variantCombinations: updated });
    
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
      
        const updated = [...(productFormData().variantCombinations ?? [])];
        const currentMedia = updated[comboIndex].variantmedia || [];
        updated[comboIndex] = { ...updated[comboIndex], variantmedia: [...currentMedia, ...newMedia] };
        setProductFormData({ ...productFormData(), variantCombinations: updated });
      
      
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
  
  const addCombinationMedia = (url:string,comboIndex: number, mediaType: 'image' | 'video' | 'gif') => {
    if (!url) return;
    if (!validateMediaUrl(url)) {
      alert('Please enter a valid URL');
      return;
    }
      const updated = [...(productFormData().variantCombinations ?? [])];
      const currentMedia = updated[comboIndex].variantmedia || [];
      updated[comboIndex] = { ...updated[comboIndex], variantmedia: [...currentMedia, { type: mediaType, url: url }] };
      setProductFormData({ ...productFormData(), variantCombinations: updated });
  };
  const handleLocationSelect = (comboIndex: number, location: { name: string } | null) => {
    if (!location) return; // prevent nulls
    const updated = [...(productFormData().variantCombinations ?? [])];
    const current = updated[comboIndex].variantavailableLocations || [];
  
    // Toggle logic: add if not exists, remove if exists
    const already = current.some(l => l.name === location.name);
    const newLocations = already
      ? current.filter(l => l.name !== location.name)
      : [...current, location];
  
    updated[comboIndex] = { 
      ...updated[comboIndex], 
      variantavailableLocations: newLocations 
    };
  
    setProductFormData({ ...productFormData(), variantCombinations: updated });
  };
  
  
  
  // --- Combination Generation ---
  const generateSmartVariantCombinations = (options: any[], existingCombinations: any[]) => {
    if (!options || options.length === 0){
      setProductFormData({...productFormData(),variantCombinations:[]})
    } 
    console.log(options)
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
            variantId: generateNextProductId(),
            varientmedia: [],
            variantavailableLocations:productFormData().availableLocations,
            image: '',
            enabled: true,
            price: '',
            compareAtPrice: '',
            costPerItem: '',
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
    setProductFormData({...productFormData(),variantCombinations:newCombinations})
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
  // --- Validation Functions ---
  
  const getVariantNameError = (id: string, name: string) => {
    const lowerName = name.trim().toLowerCase();
    if (!lowerName) return '';
    const isDuplicate = productFormData().variantOptions?.some(
      variant => variant.id !== id && variant.name.trim().toLowerCase() === lowerName
    );
    return isDuplicate ? `Variant option name "${name}" already exists. Please use a unique name.` : '';
  };
  
  const getVariantOptionValueError = (variant: any) => {
    return variant.values.length === 0 ? 'Please add at least one value for this option.' : '';
  };
  
  // --- Variant Option Manipulation ---
  
  const addVariantOption = () => {
    const emptyOption = productFormData().variantOptions?.find(v => v.values.length === 0);
    if (emptyOption) {
      setShowVariantValueErrors(true);
      return;
    }
    if (productFormData().variantOptions!.length >= 3){
      console.log("already 3 added");
      return;
    } 
  
    const newVariant = { id: Date.now().toString(), name: '', values: [] };
    const updatedOptions = [...productFormData().variantOptions??[], newVariant];
    generateSmartVariantCombinations(updatedOptions!, productFormData().variantCombinations??[]);
    setProductFormData({ ...productFormData(), variantOptions: updatedOptions });
    setTimeout(() => validateVariants(), 0);
  };
  
  const updateVariantName = (id: string, name: string) => {
    const updated = productFormData().variantOptions?.map(variant =>
      variant.id === id ? { ...variant, name } : variant
    );
    generateSmartVariantCombinations(updated!, productFormData().variantCombinations??[]);
    setProductFormData({ ...productFormData(), variantOptions: updated });
  
    if (name.trim().length > 0) {
      setVariantNameNoValueErrorIds(prev => prev.filter(eid => eid !== id));
    }
  };
  
  const addVariantValue = (id: string, value: string) => {
    if (!value.trim()) return;
    const option = productFormData().variantOptions?.find(v => v.id === id);
    if (!option || option.name.trim().length === 0) {
      setVariantNameNoValueErrorIds(prev => prev.includes(id) ? prev : [...prev, id]);
      return;
    }
  
    const updated = productFormData().variantOptions?.map(variant =>
      variant.id === id && !variant.values.includes(value.trim())
        ? { ...variant, values: [...variant.values, value.trim()] }
        : variant
    );

    setProductFormData({ ...productFormData(), variantOptions: updated });
    generateSmartVariantCombinations(updated!, productFormData().variantCombinations??[]);
    setVariantNameNoValueErrorIds(prev => prev.filter(eid => eid !== id));
  };
  
  const removeVariantValue = (id: string, valueIndex: number) => {
    const updated = productFormData().variantOptions?.map(variant =>
      variant.id === id
        ? { ...variant, values: variant.values.filter((_:any, index:any) => index !== valueIndex) }
        : variant
    );
    generateSmartVariantCombinations(updated!, productFormData().variantCombinations??[]);
    setProductFormData({ ...productFormData(), variantOptions: updated });
  };
  
  const removeVariantOption = (id: string) => {
    const updated = productFormData().variantOptions?.filter(variant => variant.id !== id);
    if(updated!.length===0)
    {
      setProductFormData({ ...productFormData(), variantOptions: [] });
    }
    else{
      console.log(updated)
    generateSmartVariantCombinations(updated!, productFormData().variantCombinations??[]);
    setProductFormData({ ...productFormData(), variantOptions: updated });
    }
    
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

  const newVariants = [...productFormData().variantOptions ?? []];
  const draggedItem = newVariants[dragged];
  newVariants.splice(dragged, 1);
  newVariants.splice(dropIndex, 0, draggedItem);

  setProductFormData({ ...productFormData(), variantOptions: newVariants });
  setDraggedVariant(null);

  // reorder combinations according to new variant order
  const updatedCombinations = productFormData().variantCombinations?.map(combo => {
    const reorderedCombo: Record<string, string> = {};
    for (const option of newVariants) {
      if (combo.combination.hasOwnProperty(option.name)) {
        reorderedCombo[option.name] = combo.combination[option.name];
      }
    }
    return { ...combo, combination: reorderedCombo };
  });
  setProductFormData({ ...productFormData(), variantCombinations: updatedCombinations });
};

// --- Update Combination Field ---
const updateCombination = (index: number, field: string, value: any) => {
  const updated = productFormData().variantCombinations?.map((combo, i) => {
    if (i === index) {
      if (field === 'trackQuantity' && !value && combo.availableQuantity) {
        return { ...combo, [field]: value, availableQuantity: '' };
      }
      return { ...combo, [field]: value };
    }
    return combo;
  });
  
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
  const options = productFormData().variantOptions??[];
  const combinations = productFormData().variantCombinations??[];

  if(productFormData().ProductName!.length===0)
  {
    errors.push('productname required')
  }

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



// --- Image URL Validator ---
const isValidImageUrl = (url: string) => /^https?:\/\/.+/i.test(url.trim());

  // ---------- Helpers ----------
  const generateNextProductId = () => {
    return `P${nanoid()}`;
  };

  // Effect: update form data when selectedProduct changes
  createEffect(() => {
    if (!user()?.email || !selectedWebsiteId) {
      setProductFormData(initproduct);
      setRefProductFormData(initproduct);
      return;
    }

    if (selectedProduct() === null) {
      console.log(selectedProduct())
      const newProductId = generateNextProductId();
      setProductFormData({ ...initproduct, ProductID: newProductId });
      setRefProductFormData({ ...initproduct, ProductID: newProductId });
    } else {
      const product = getProduct(user()?.email || "", selectedWebsiteId, selectedProduct()!);
      if (product) {
        setProductFormData(product);
        setRefProductFormData(product);
      } else {
        setProductFormData(initproduct);
        setRefProductFormData(initproduct);
      }
    }
    setCanSave(false);
  });

  // Effect: detect changes for canSave
  createEffect(() => {
    const current = productFormData();
    const ref = refProductFormData();
    setCanSave(JSON.stringify(current) !== JSON.stringify(ref));
  });

  // ---------- Handlers ----------
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setSelectedTopic("productdetails");
  };

  const handleDeleteProduct = (productId: string, productName: string) => {
    if (!user()?.email || !selectedWebsiteId) return;
    if (window.confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
      const success = deleteProduct(user()?.email|| "" , selectedWebsiteId, productId);
      if (success) {
        if (selectedProduct() === productId) {
          setSelectedProduct(null);
          setSelectedTopic("productstablebel");
        }
      } else {
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  const handleProductClick = (productId: string) => {
    setSelectedProduct(productId);
    setSelectedTopic("productdetails");
  };

  const handleSave = () => {
    if (!user()?.email || !selectedWebsiteId) return;
    if (selectedProduct() === null) {
      const newProduct = {
        ...productFormData(),
        status: "active",
      };
      const success = addProduct(user()?.email || "", selectedWebsiteId, newProduct);
      if (success) {
        setSelectedProduct(newProduct.ProductID!);
        setProductFormData(newProduct);
        setRefProductFormData(newProduct);
        setCanSave(false);
      } else {
        alert("Product name already exists.");
      }
    } else {
      const success = updateProduct(user()?.email || "", selectedWebsiteId, selectedProduct()!, productFormData());
      if (success) {
        setRefProductFormData(productFormData());
        setCanSave(false);
      } else {
        alert("Failed to update product.");
      }
    }
  };

  const handleDiscard = () => {
    if (canSave() && !window.confirm("Discard changes?")) return;
    setProductFormData(refProductFormData());
    setCanSave(false);
  };

  const handleBack = () => {
    if (canSave() && !window.confirm("You have unsaved changes. Are you sure you want to go back?")) return;
    setProductFormData(refProductFormData());
    setCanSave(false);
    setSelectedProduct(null);
    setSelectedTopic("productstablebel");
  };

  // ---------- Provider ----------
  return (
    <ProductContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        productFormData,
        setProductFormData,
        refProductFormData,
        canSave,
        selectedTopic,
        setSelectedTopic,
        handleAddProduct,
        handleDeleteProduct,
        handleProductClick,
        handleSave,
        handleDiscard,
        handleBack,
        skuErrors: skuErrors(),
        setSkuErrors,
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
        expandedIndex:expandedIndex(),
        setexpandedIndex,
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
        handleLocationSelect,
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
        VendorDetailsList
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
