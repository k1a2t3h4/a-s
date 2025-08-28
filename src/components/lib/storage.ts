import { initialAppState } from "./initial-data";

// LocalStorage keys
export const APP_STATE_KEY = "dynascape_app_state";
export const APP_DATA_KEY = "dynascape_app_data";

const getUserformsKey = (uniqueId: string) =>
  `dynascape_forms_${uniqueId}`;


export const loadforms = (uniqueId: string): Record<string, any> => {
  try {
    const key = getUserformsKey(uniqueId);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : {};
  } catch (err) {
    console.error("Error loading forms from localStorage", err);
    return {};
  }
};

export const saveform = (
  uniqueId: string,
  forms: Record<string, any>
): void => {
  try {
    const key = getUserformsKey(uniqueId);
    localStorage.setItem(key, JSON.stringify(forms));
  } catch (err) {
    console.error("Error saving forms to localStorage", err);
  }
};

export const addform = (
  uniqueId: string,
  websiteId: string,
  templateName: string,
  form: any
): boolean => {
  try {
    const forms = loadforms(uniqueId);

    if (!forms[websiteId]) {
      forms[websiteId] = {};
    }
    if (!forms[websiteId][templateName]) {
      forms[websiteId][templateName] = [];
    }

    // prevent duplicate name
    const exists = forms[websiteId][templateName].some(
      (pg: any) =>
        pg.formId === form.formId
    );
    if (exists) return false;

    forms[websiteId][templateName].push(form);
    saveform(uniqueId, forms);
    return true;
  } catch (err) {
    console.error("Error adding form", err);
    return false;
  }
};


export const updateform = (
  uniqueId: string,
  websiteId: string,
  formId: string,
  templateName: string,
  updatedData: any
): boolean => {
  try {
    const forms = loadforms(uniqueId);
    if (!forms[websiteId] || !forms[websiteId][templateName]) return false;

    const index = forms[websiteId][templateName].findIndex(
      (p: any) => p.formId === formId
    );
    if (index === -1) return false;

    forms[websiteId][templateName][index] = {
      ...forms[websiteId][templateName][index],
      ...updatedData,
    };
    saveform(uniqueId, forms);
    return true;
  } catch (err) {
    console.error("Error updating form", err);
    return false;
  }
};

export const deleteform = (
  uniqueId: string,
  websiteId: string,
  template: string,
  formId: string
): boolean => {
  try {
    const forms = loadforms(uniqueId);
    if (!forms[websiteId] || !forms[websiteId][template]) return false;

    forms[websiteId][template] = forms[websiteId][template].filter(
      (p: any) => p.formId !== formId
    );

    saveform(uniqueId, forms);
    return true;
  } catch (err) {
    console.error("Error deleting form", err);
    return false;
  }
};

export const getform = (
  uniqueId: string,
  websiteId: string,
  template: string,
  formId: string
): any => {
  try {
    const forms = loadforms(uniqueId);
    if (!forms[websiteId] || !forms[websiteId][template]) return null;

    return (
      forms[websiteId][template].find((p: any) => p.formId === formId) ||
      null
    );
  } catch (err) {
    console.error("Error getting form", err);
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
