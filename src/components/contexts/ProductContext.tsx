// src/contexts/ProductContext.tsx
import { createContext, useContext, type JSX, createSignal, createEffect } from "solid-js";
import { addProduct, deleteProduct, getProduct, updateProduct } from "../lib/storage";
import { useAppState } from "../lib/state";
import { useAuth } from "./AuthContext";
import { getAvailableCountryNamesFromActiveMarketplace } from "../lib/form-data";
import { nanoid } from "nanoid";

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
  variantOptions?: any[];
  variantCombinations?: any[];
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

interface ProductContextType {
  selectedProduct: () => string | null;
  setSelectedProduct: (id: string | null) => void;
  productFormData: () => ProductFormData;
  setProductFormData: (data: ProductFormData) => void;
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
    setCanSave(JSON.stringify(productFormData()) !== JSON.stringify(refProductFormData()));
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
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
