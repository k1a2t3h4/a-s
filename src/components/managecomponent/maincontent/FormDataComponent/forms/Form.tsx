// src/components/forms/Form.tsx
import { type Component } from "solid-js";
import { useFormContext } from "../../../../contexts/FormDataContext";

export const Form: Component = () => {
  const { formdata, setFormData, handleSave, canSave,handleBack } = useFormContext();


  return (
    <div class="p-4 space-y-4">
      <div class="flex items-center justify-between">
        <button
          class="rounded bg-gray-500 px-3 py-1 text-white hover:bg-gray-600"
          onClick={handleBack}
        >
          ⬅ Back
        </button>
      </div>
      <h2 class="text-lg font-semibold">📝 Create / Edit Form</h2>

      <label class="block text-sm font-medium text-gray-700">
        Form Name
        <input
          type="text"
          value={formdata()!.ProductName || ''}
          onChange={e => setFormData(prev => ({ ...prev, ProductName: e.target.value }))}
          class="mt-1 w-full rounded border p-2"
          placeholder="Enter form name"
        />
      </label>

      <button
        class="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
        disabled={!canSave()}
        onClick={handleSave}
      >
        💾 Save
      </button>
    </div>
  );
};
