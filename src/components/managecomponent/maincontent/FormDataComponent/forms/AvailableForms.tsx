// src/components/forms/AvailableForms.tsx
import { type Component, For } from "solid-js";
import { useFormContext } from "../../../../contexts/FormDataContext";

export const AvailableForms: Component = () => {
  const { dynamicformTemplates, setSelectedContent, setSelectedTemplate } = useFormContext();

  const handleSelect = (templateName: string) => {
    setSelectedTemplate(templateName);
    setSelectedContent("FormTable"); // navigate to FormTable view
  };

  return (
    <div class="p-4 space-y-4">
      <h2 class="text-lg font-semibold">📑 Available Dynamic Forms</h2>
      <ul class="space-y-2">
        <For each={dynamicformTemplates}>
          {(template) => (
            <li
              class="cursor-pointer rounded-md border p-3 hover:bg-gray-100"
              onClick={() => handleSelect(template.name)}
            >
              <span class="font-medium">{template.name}</span>
              <span class="ml-2 text-xs text-gray-500">({template.type})</span>
            </li>
          )}
        </For>
      </ul>
      
    </div>
  );
};
