import { FormProvider } from "../../../contexts/FormDataContext";
import { FormDataDeliveryContent } from "./FormDataDeliveryContent";

export const FormData = () => {
  return (
    <FormProvider>
      <FormDataInner />
    </FormProvider>
  );
};

const FormDataInner = () => {
  return (
    <div class="flex flex-col h-full min-h-0">
      <div class="flex-1 min-h-0 overflow-hidden">
        <FormDataDeliveryContent />
      </div>
    </div>
  );
};
