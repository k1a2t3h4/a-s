import { Show } from "solid-js";
import { useProductContext } from "../../../../../../../contexts/ProductContext";

type Props = {
  index: number;
};

const PhysicalSection = (props: Props) => {
  const { productFormData, updateCombination } = useProductContext();

  const combination = () => productFormData().variantCombinations![props.index];

  const volumeText = () => {
    const h = parseFloat(combination().height || "0");
    const b = parseFloat(combination().breadth || "0");
    const l = parseFloat(combination().length || "0");
    if (isNaN(h) || isNaN(b) || isNaN(l)) return "";
    const vol = h * b * l;
    const unit = combination().dimensionUnit;
    const unitSuffix =
      unit === "cm"
        ? "cm³"
        : unit === "mm"
        ? "mm³"
        : unit === "m"
        ? "m³"
        : unit === "in"
        ? "in³"
        : "ft³";
    return `${vol.toFixed(2)} ${unitSuffix}`;
  };

  return (
    <div>
      {/* Checkbox: Is Physical */}
      <div class="flex items-center gap-4 mb-2">
        <input
          id={`isPhysical-${props.index}`}
          type="checkbox"
          checked={combination().isPhysical || false}
          onChange={(e) =>
            updateCombination(
              props.index,
              "isPhysical",
              (e.currentTarget as HTMLInputElement).checked
            )
          }
        />
        <label for={`isPhysical-${props.index}`}>Is Physical Product?</label>
      </div>

      {/* If physical product */}
      <Show when={combination().isPhysical}>
        <>
          {/* Weight */}
          <div class="grid grid-cols-2 gap-6 mb-2">
            <div>
              <label>Weight</label>
              <input
                type="number"
                class="border rounded px-2 py-1 w-full"
                value={combination().weight || ""}
                min="0"
                step="0.01"
                placeholder="Enter weight"
                onInput={(e) =>
                  updateCombination(
                    props.index,
                    "weight",
                    (e.currentTarget as HTMLInputElement).value
                  )
                }
              />
            </div>
            <div>
              <label>Weight Unit</label>
              <select
                class="border rounded px-2 py-1 w-full"
                value={combination().weightUnit || "kg"}
                onChange={(e) =>
                  updateCombination(
                    props.index,
                    "weightUnit",
                    (e.currentTarget as HTMLSelectElement).value
                  )
                }
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="lb">lb</option>
                <option value="oz">oz</option>
              </select>
            </div>
          </div>

          {/* Dimensions */}
          <div class="grid grid-cols-4 gap-4 mb-2">
            <div>
              <label>Height</label>
              <input
                type="number"
                class="border rounded px-2 py-1 w-full"
                value={combination().height || ""}
                min="0"
                step="0.01"
                placeholder="Height"
                onInput={(e) =>
                  updateCombination(
                    props.index,
                    "height",
                    (e.currentTarget as HTMLInputElement).value
                  )
                }
              />
            </div>
            <div>
              <label>Breadth</label>
              <input
                type="number"
                class="border rounded px-2 py-1 w-full"
                value={combination().breadth || ""}
                min="0"
                step="0.01"
                placeholder="Breadth"
                onInput={(e) =>
                  updateCombination(
                    props.index,
                    "breadth",
                    (e.currentTarget as HTMLInputElement).value
                  )
                }
              />
            </div>
            <div>
              <label>Length</label>
              <input
                type="number"
                class="border rounded px-2 py-1 w-full"
                value={combination().length || ""}
                min="0"
                step="0.01"
                placeholder="Length"
                onInput={(e) =>
                  updateCombination(
                    props.index,
                    "length",
                    (e.currentTarget as HTMLInputElement).value
                  )
                }
              />
            </div>
            <div>
              <label>Dimension Unit</label>
              <select
                class="border rounded px-2 py-1 w-full"
                value={combination().dimensionUnit || "cm"}
                onChange={(e) =>
                  updateCombination(
                    props.index,
                    "dimensionUnit",
                    (e.currentTarget as HTMLSelectElement).value
                  )
                }
              >
                <option value="cm">cm</option>
                <option value="mm">mm</option>
                <option value="m">m</option>
                <option value="in">in</option>
                <option value="ft">ft</option>
              </select>
            </div>
          </div>

          {/* Volume */}
          <Show when={combination().height && combination().breadth && combination().length}>
            <div class="mt-2 p-2 bg-gray-50 rounded-lg">
              <label class="text-sm font-medium">Calculated Volume</label>
              <p class="text-sm text-gray-600 mt-1">{volumeText()}</p>
            </div>
          </Show>
        </>
      </Show>
    </div>
  );
};

export default PhysicalSection;
