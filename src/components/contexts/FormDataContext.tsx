// src/contexts/FormContext.tsx
import { createContext, useContext, type JSX, createSignal, createEffect } from "solid-js";
import { addform, deleteform, getform, loadforms, updateform } from "../lib/storage";
import { useAppState } from "../lib/state";
import { useAuth } from "./AuthContext";
import { nanoid } from "nanoid";

// ---------- Interfaces ----------
export interface FormData {
  formId: string;
  [key: string]: any;
}

interface ContextType {
  selectedForm: () => string | null;
  setSelectedForm: (id: string | null) => void;
  formdata: () => FormData | undefined;
  setFormData: (
    data: FormData | ((prev: FormData) => FormData)
  ) => void;
  canSave: () => boolean;
  formTemplates: typeof formTemplates;
  selectedTemplate: () => string | null;
  setSelectedTemplate: (name: string | null) => void;
  formslist: () => FormData[];
  setFormsList: (list: FormData[]) => void;
  selectedFormType: () => string | null;
  setSelectedFormType: (type: string | null) => void;

  selectedContent: () => string;
  setSelectedContent: (view: string) => void;
  handleAddForm: () => void;
  handleDeleteForm: (formId: string, formName: string) => void;
  handleFormClick: (formId: string) => void;
  handleSave: () => void;
  handleDiscard: () => void;
  handleBack: () => void;
}

// ---------- Form Templates ----------
export const formTemplates = [
  {
    name: "productform",
    type: "dynamic",
  },
  {
    name: "blog",
    type: "dynamic",
  },
  {
    name: "contact details",
    type: "static",
  }
];

// ---------- Context ----------
const FormContext = createContext<ContextType>();
export const useFormContext = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormContext must be used within FormProvider");
  return ctx;
};

export const FormProvider = (props: { children: JSX.Element }) => {
  const { state } = useAppState();
  const { user } = useAuth();
  const { selectedWebsiteId } = state;

  const initForm: FormData = { formId: "" };

  // ---------- Signals ----------
  const [selectedForm, setSelectedForm] = createSignal<string | null>(null);
  const [formdata, setFormData] = createSignal<FormData>(initForm);
  const [refformData, setRefformData] = createSignal<FormData>(initForm);
  const [canSave, setCanSave] = createSignal(false);
  const [selectedContent, setSelectedContent] = createSignal<string>("AvailableForms");
  const [formslist, setFormsList] = createSignal<FormData[]>([]);
  const [selectedFormType, setSelectedFormType] = createSignal<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = createSignal<string | null>(null);
  const generateNextformId = () => {
    return `P${nanoid()}`;
  };
  
  createEffect(() => {
    if (!user()?.email || !selectedWebsiteId || !selectedTemplate()) {
      setFormsList([]);
      return;
    }
    const forms = loadforms(user()?.email || "");
    const list =
      forms[selectedWebsiteId]?.[selectedTemplate()!] || [];
    setFormsList(list);
  });
  
  createEffect(() => {
    if (!user()?.email || !selectedWebsiteId) {
      setFormData(initForm);
      setRefformData(initForm);
      return;
    }

    if (selectedForm() === null) {
      const newformId = generateNextformId();
      setFormData({ ...initForm, formId: newformId });
      setRefformData({ ...initForm, formId: newformId });
    } else {
      const form = getform(
        user()?.email || "",
        selectedWebsiteId,
        selectedTemplate()!,
        selectedForm()!
      );

      if (form) {
        setFormData(form);
        setRefformData(form);
      } else {
        setFormData(initForm);
        setRefformData(initForm);
      }
    }
    setCanSave(false);
  });

  // Effect: detect changes for canSave
  createEffect(() => {
    const current = formdata();
    const ref = refformData();
    setCanSave(JSON.stringify(current) !== JSON.stringify(ref));
  });

  const handleAddForm = () => {
    if (!selectedTemplate()) {
      alert("Please select a template first.");
      return;
    }
    // reset formId and prepare empty data
    setSelectedForm(null);
  
    // move to Form view
    setSelectedContent("Form");
  };
  

  const handleDeleteForm = (formId: string, formName: string) => {
    if (!user()?.email || !selectedWebsiteId) return;
    if (
      window.confirm(
        `Are you sure you want to delete "${formName}"? This action cannot be undone.`
      )
    ) {
      const success = deleteform(
        user()?.email || "",
        selectedWebsiteId,
        selectedTemplate()!,
        formId
      );
      if (success) {
        if (selectedForm() === formId) {
          setSelectedForm(null);
        }
        // refresh list
        const forms = loadforms(user()?.email || "");
        setFormsList(forms[selectedWebsiteId]?.[selectedTemplate()!] || []);
      } else {
        alert("Failed to delete Form. Please try again.");
      }
    }
  };

  const handleFormClick = (formId: string) => {
    setSelectedForm(formId);
  };

  const handleSave = () => {
    if (!user()?.email || !selectedWebsiteId || !selectedTemplate()) return;
    
    if (selectedForm() === null) {
      const newform = {
        ...formdata()
      };
  
      const success = addform(
        user()?.email || "",
        selectedWebsiteId,
        selectedTemplate()!,
        newform
      );
      if (success) {
        setSelectedForm(newform.formId);
        setFormData(newform);
        setRefformData(newform);
        setCanSave(false);
      } else {
        alert("Form name already exists.");
      }
    } else {
      const success = updateform(
        user()?.email || "",
        selectedWebsiteId,
        selectedForm()!,
        selectedTemplate()!,
        formdata()
      );
      if (success) {
        setRefformData(formdata());
        setCanSave(false);
      } else {
        alert("Failed to update form.");
      }
    }
  };
  

  const handleDiscard = () => {
    if (canSave() && !window.confirm("Discard changes?")) return;
    setFormData(refformData());
    setCanSave(false);
  };

const handleBack = () => {
  if (
    canSave() &&
    !window.confirm(
      "You have unsaved changes. Are you sure you want to go back?"
    )
  ) {
    return;
  }

  // Reset state
  setFormData(initForm);
  setCanSave(false);
  setSelectedForm(null);

  // Navigation logic
  switch (selectedContent()) {
    case "FormTable":
      // If in FormTable, go back to AvailableForms
      setSelectedContent("AvailableForms");
      setSelectedFormType("")
      setSelectedTemplate("")
      break;

    case "Form":
      // If in Form, check template type
      const template = formTemplates.find(
        (t) => t.name === selectedTemplate()
      );

      if (template?.type === "dynamic") {
        setSelectedContent("FormTable");
      } else {
        setSelectedContent("AvailableForms");
        setSelectedFormType("")
        setSelectedTemplate("")
      }
      break;

    default:
      // Fallback → always go to AvailableForms
      setSelectedContent("AvailableForms");
      setSelectedFormType("")
      setSelectedTemplate("")
      break;
  }
};


  // ---------- Provider ----------
  return (
    <FormContext.Provider
      value={{
        selectedForm,
        setSelectedForm,
        formdata,
        setFormData,
        canSave,
        selectedContent,
        setSelectedContent,
        handleAddForm,
        handleDeleteForm,
        handleFormClick,
        handleSave,
        handleDiscard,
        handleBack,
        formTemplates,
        selectedTemplate,
        setSelectedTemplate,
        selectedFormType,
        setSelectedFormType,
        formslist,
        setFormsList,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};
