import { initialAppState } from "./initial-data";

// LocalStorage keys
export const APP_STATE_KEY = "dynascape_app_state";
export const APP_DATA_KEY = "dynascape_app_data";

const getUserProductsKey = (uniqueId: string) =>
  `dynascape_products_${uniqueId}`;

// Products CRUD operations
export const loadProducts = (uniqueId: string): Record<string, any> => {
  try {
    const key = getUserProductsKey(uniqueId);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : {};
  } catch (err) {
    console.error("Error loading products from localStorage", err);
    return {};
  }
};

export const saveProducts = (
  uniqueId: string,
  products: Record<string, any>
): void => {
  try {
    const key = getUserProductsKey(uniqueId);
    localStorage.setItem(key, JSON.stringify(products));
  } catch (err) {
    console.error("Error saving products to localStorage", err);
  }
};

export const addProduct = (
  uniqueId: string,
  websiteId: string,
  product: any
): boolean => {
  try {
    const products = loadProducts(uniqueId);
    if (!products[websiteId]) {
      products[websiteId] = [];
    }

    // prevent duplicate name
    const exists = products[websiteId].some(
      (pg: any) =>
        pg.ProductName.toLowerCase() === product.ProductName.toLowerCase()
    );
    if (exists) return false;

    products[websiteId].push(product);
    saveProducts(uniqueId, products);
    return true;
  } catch (err) {
    console.error("Error adding product", err);
    return false;
  }
};

export const updateProduct = (
  uniqueId: string,
  websiteId: string,
  productId: string,
  updatedData: any
): boolean => {
  try {
    const products = loadProducts(uniqueId);
    if (!products[websiteId]) return false;

    const index = products[websiteId].findIndex(
      (p: any) => p.ProductID === productId
    );
    if (index === -1) return false;

    products[websiteId][index] = {
      ...products[websiteId][index],
      ...updatedData,
    };
    saveProducts(uniqueId, products);
    return true;
  } catch (err) {
    console.error("Error updating product", err);
    return false;
  }
};

export const deleteProduct = (
  uniqueId: string,
  websiteId: string,
  productId: string
): boolean => {
  try {
    const products = loadProducts(uniqueId);
    if (!products[websiteId]) return false;

    products[websiteId] = products[websiteId].filter(
      (p: any) => p.ProductID !== productId
    );
    saveProducts(uniqueId, products);
    return true;
  } catch (err) {
    console.error("Error deleting product", err);
    return false;
  }
};

export const getProduct = (
  uniqueId: string,
  websiteId: string,
  productId: string
): any => {
  try {
    const products = loadProducts(uniqueId);
    if (!products[websiteId]) return null;
    return (
      products[websiteId].find((p: any) => p.ProductID === productId) || null
    );
  } catch (err) {
    console.error("Error getting product", err);
    return null;
  }
};

// --------- State persistence ---------
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(APP_STATE_KEY);
    if (!serializedState) return initialAppState;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state from localStorage", err);
    return initialAppState;
  }
};

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(APP_STATE_KEY, serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage", err);
  }
};

export const removeState = (): void => {
  try {
    localStorage.removeItem(APP_STATE_KEY);
  } catch (err) {
    console.error("Error removing state from localStorage", err);
  }
};
