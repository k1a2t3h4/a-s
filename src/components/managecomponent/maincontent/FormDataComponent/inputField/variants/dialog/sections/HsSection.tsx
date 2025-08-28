import { Show } from "solid-js";
import { useProductContext } from "../../../../../../../contexts/FormDataContext";

type Props = {
  index: number;
  updateCombination: (index: number, field: string, value: any) => void;
};

const HsSection = (props: Props) => {
  const { productFormData, updateCombination } = useProductContext();

  const combination = () => productFormData().variantCombinations![props.index];

  return (
    <div class="mt-2">
      {/* Checkbox */}
      <div class="flex items-center space-x-2 mb-2">
        <input
          id={`hasHSCode-${props.index}`}
          type="checkbox"
          checked={combination().hasHSCode || false}
          onChange={(e) =>
            updateCombination(
              props.index,
              "hasHSCode",
              (e.currentTarget as HTMLInputElement).checked
            )
          }
        />
        <label for={`hasHSCode-${props.index}`}>This product has an HS code</label>
      </div>

      {/* Show HS fields if checked */}
      <Show when={combination().hasHSCode}>
        <div class="grid grid-cols-2 gap-4">
          {/* Country of origin */}
          <div>
            <label>Country/Region of origin</label>
            <select
              class="border rounded px-2 py-1 w-full"
              value={combination().countryOfOrigin || ""}
              onChange={(e) =>
                updateCombination(
                  props.index,
                  "countryOfOrigin",
                  (e.currentTarget as HTMLSelectElement).value
                )
              }
            >
              <option value="">Select</option>
              <option value="india">India</option>
              <option value="usa">USA</option>
              <option value="china">China</option>
              <option value="uk">UK</option>
            </select>
          </div>

          {/* HS code */}
          <div>
            <label>Harmonized System (HS) code</label>
            <input
              class="border rounded px-2 py-1 w-full"
              value={combination().hsCode || ""}
              placeholder="Search by product keyword or code"
              onInput={(e) =>
                updateCombination(
                  props.index,
                  "hsCode",
                  (e.currentTarget as HTMLInputElement).value
                )
              }
            />
            <p class="text-sm text-blue-600 mt-1">
              Learn more about adding HS codes
            </p>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default HsSection;
