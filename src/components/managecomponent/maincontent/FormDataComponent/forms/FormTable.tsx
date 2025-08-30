import { type Component, For, Show } from "solid-js";
import { useFormContext } from "../../../../contexts/FormDataContext";

export const FormTable: Component = () => {
  const {
    selectedTemplate,
    formslist,
    handleAddForm,
    handleBack,
    handleFormClick,
    handleDeleteForm,
  } = useFormContext();

  return (
    <div class="p-4 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold">📊 Form Table</h2>
        <button
          class="rounded bg-gray-500 px-3 py-1 text-white hover:bg-gray-600"
          onClick={handleBack}
        >
          ⬅ Back
        </button>
      </div>

      <Show when={selectedTemplate()} fallback={<p>No template selected.</p>}>
        {(template) => (
          <>
            <p class="text-gray-700">
              Current Template:{" "}
              <span class="font-medium">{template()}</span>
            </p>

            <button
              class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              onClick={handleAddForm}
            >
              ➕ Add Form
            </button>

            <div class="mt-4 border-t pt-3">
              <h3 class="font-semibold mb-2">Forms List</h3>
              <Show
                when={formslist().length > 0}
                fallback={<p class="text-gray-500">No forms created yet.</p>}
              >
                <ul class="space-y-2">
                  <For each={formslist()}>
                    {(form) => (
                      <li class="flex items-center justify-between rounded border p-2 hover:bg-gray-50">
                        <span
                          class="cursor-pointer text-blue-600 hover:underline"
                          onClick={() => handleFormClick(form.formId)}
                        >
                          {form.formId}
                        </span>
                        <button
                          class="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                          onClick={() =>
                            handleDeleteForm(form.formId)
                          }
                        >
                          Delete
                        </button>
                      </li>
                    )}
                  </For>
                </ul>
              </Show>
            </div>
          </>
        )}
      </Show>
    </div>
  );
};
