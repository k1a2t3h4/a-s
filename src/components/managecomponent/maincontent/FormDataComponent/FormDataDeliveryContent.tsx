import { type Component, createSignal, createEffect, onCleanup } from "solid-js";
import { useFormContext } from "../../../contexts/FormDataContext";

// new imports
import { AvailableForms } from "./forms/AvailableForms";
import { FormTable } from "./forms/FormTable";
import { Form } from "./forms/Form";

export const FormDataDeliveryContent: Component = () => {
  const { selectedFormId, selectedContent } = useFormContext();

  const [triggerAddFormData, setTriggerAddFormData] = createSignal(false);

  // Reset trigger when product changes
  createEffect(() => {
    if (triggerAddFormData() && selectedFormId()) {
      const timer = setTimeout(() => setTriggerAddFormData(false), 100);
      onCleanup(() => clearTimeout(timer));
    }
  });

  const renderContent = () => {
    switch (selectedContent()) {
      case "AvailableForms":
        return <AvailableForms />;

      case "FormTable":
        return <FormTable />;

      case "Form":
        return <Form />; 

      default:
        return <AvailableForms />;
    }
  };

  return <div class="h-full overflow-auto bg-white">{renderContent()}</div>;
};
