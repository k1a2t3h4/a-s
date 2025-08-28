import { createSignal, createEffect } from "solid-js";
import { useProductContext } from "../../../../contexts/FormDataContext";

const defaultWeightUnits = ["kg", "g", "lb", "oz"];
const defaultDimensionUnits = ["cm", "mm", "m", "in", "ft"];

export const PhysicalProductFields = () => {
  const { productFormData, setProductFormData } = useProductContext();
  const [errors, setErrors] = createSignal<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors() };
    if (field === "weight" && value && parseFloat(value) < 0) {
      newErrors[field] = "Weight must be positive";
    } else if (field === "height" && value && parseFloat(value) < 0) {
      newErrors[field] = "Height must be positive";
    } else if (field === "breadth" && value && parseFloat(value) < 0) {
      newErrors[field] = "Breadth must be positive";
    } else if (field === "length" && value && parseFloat(value) < 0) {
      newErrors[field] = "Length must be positive";
    } else {
      delete newErrors[field];
    }
    setErrors(newErrors);
  };

  const validatePhysicalProduct = () => {
    const errs: string[] = [];
    if (productFormData().isPhysical === true) {
      if (
        !productFormData().weight ||
        isNaN(Number(productFormData().weight)) ||
        Number(productFormData().weight) <= 0
      ) {
        errs.push("Weight is required and must be a positive number.");
      }
      if (
        !productFormData().weightUnit ||
        !defaultWeightUnits.includes(productFormData().weightUnit)
      ) {
        errs.push("Weight unit is required.");
      }
      if (
        !productFormData().height ||
        isNaN(Number(productFormData().height)) ||
        Number(productFormData().height) < 0
      ) {
        errs.push("Height is required and must be 0 or a positive number.");
      }
      if (
        !productFormData().breadth ||
        isNaN(Number(productFormData().breadth)) ||
        Number(productFormData().breadth) < 0
      ) {
        errs.push("Breadth is required and must be 0 or a positive number.");
      }
      if (
        !productFormData().length ||
        isNaN(Number(productFormData().length)) ||
        Number(productFormData().length) < 0
      ) {
        errs.push("Length is required and must be 0 or a positive number.");
      }
      if (
        !productFormData().dimensionUnit ||
        !defaultDimensionUnits.includes(productFormData().dimensionUnit)
      ) {
        errs.push("Dimension unit is required.");
      }
    }
    return errs.length === 0;
  };

  createEffect(() => {
    validatePhysicalProduct();
  });

  const handleChange = (field: string, value: string | boolean) => {
    validateField(field, String(value));
    setProductFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div class="rounded-xl border p-4 shadow-sm">
      <h3 class="text-lg font-semibold mb-4">Physical Product Details</h3>

      {/* Switch */}
      <div class="mb-4 flex items-center gap-4">
        <input
          type="checkbox"
          id="isPhysical"
          checked={!!productFormData().isPhysical}
          onInput={(e) => handleChange("isPhysical", (e.target as HTMLInputElement).checked)}
        />
        <label for="isPhysical">Is Physical Product?</label>
      </div>

      {productFormData().isPhysical && (
        <>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label>Weight</label>
              <input
                type="number"
                value={productFormData()?.weight || ""}
                onInput={(e) => handleChange("weight", (e.target as HTMLInputElement).value)}
                min="0"
                step="0.01"
                placeholder="Enter weight"
                class={errors().weight ? "border-red-500" : ""}
              />
              {errors().weight && <p class="text-red-500 text-xs mt-1">{errors().weight}</p>}
            </div>
            <div>
              <label>Weight Unit</label>
              <select
                value={productFormData()?.weightUnit || "kg"}
                onInput={(e) => handleChange("weightUnit", (e.target as HTMLSelectElement).value)}
              >
                {defaultWeightUnits.map((unit) => (
                  <option value={unit}>{unit}</option>
                ))}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-4 gap-4 mt-4">
            <div>
              <label>Height</label>
              <input
                type="number"
                value={productFormData()?.height || ""}
                onInput={(e) => handleChange("height", (e.target as HTMLInputElement).value)}
                min="0"
                step="0.01"
                placeholder="Height"
                class={errors().height ? "border-red-500" : ""}
              />
              {errors().height && <p class="text-red-500 text-xs mt-1">{errors().height}</p>}
            </div>
            <div>
              <label>Breadth</label>
              <input
                type="number"
                value={productFormData()?.breadth || ""}
                onInput={(e) => handleChange("breadth", (e.target as HTMLInputElement).value)}
                min="0"
                step="0.01"
                placeholder="Breadth"
                class={errors().breadth ? "border-red-500" : ""}
              />
              {errors().breadth && <p class="text-red-500 text-xs mt-1">{errors().breadth}</p>}
            </div>
            <div>
              <label>Length</label>
              <input
                type="number"
                value={productFormData()?.length || ""}
                onInput={(e) => handleChange("length", (e.target as HTMLInputElement).value)}
                min="0"
                step="0.01"
                placeholder="Length"
                class={errors().length ? "border-red-500" : ""}
              />
              {errors().length && <p class="text-red-500 text-xs mt-1">{errors().length}</p>}
            </div>
            <div>
              <label>Dimension Unit</label>
              <select
                value={productFormData()?.dimensionUnit || "cm"}
                onInput={(e) =>
                  handleChange("dimensionUnit", (e.target as HTMLSelectElement).value)
                }
              >
                {defaultDimensionUnits.map((unit) => (
                  <option value={unit}>{unit}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Volume Summary */}
          {productFormData()?.height && productFormData()?.breadth && productFormData()?.length && (
            <div class="mt-4 p-3 bg-gray-50 rounded-lg">
              <label class="text-sm font-medium">Calculated Volume</label>
              <p class="text-sm text-gray-600 mt-1">
                {calculateVolume(
                  productFormData().height,
                  productFormData().breadth,
                  productFormData().length,
                  productFormData().dimensionUnit
                )}
              </p>
            </div>
          )}

          {/* HS Code */}
          <div class="mt-4">
            <div class="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                id="hasHSCode"
                checked={!!productFormData().hasHSCode}
                onInput={(e) => handleChange("hasHSCode", (e.target as HTMLInputElement).checked)}
              />
              <label for="hasHSCode">This product has an HS code</label>
            </div>

            {productFormData().hasHSCode && (
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label>Country/Region of origin</label>
                  <select
                    value={productFormData()?.countryOfOrigin || ""}
                    onInput={(e) =>
                      handleChange("countryOfOrigin", (e.target as HTMLSelectElement).value)
                    }
                  >
                    <option value="india">India</option>
                    <option value="usa">USA</option>
                    <option value="china">China</option>
                    <option value="uk">UK</option>
                  </select>
                </div>
                <div>
                  <label>Harmonized System (HS) code</label>
                  <input
                    value={productFormData()?.hsCode || ""}
                    onInput={(e) => handleChange("hsCode", (e.target as HTMLInputElement).value)}
                    placeholder="Search by product keyword or code"
                  />
                  <p class="text-sm text-blue-600 mt-1">
                    Learn more about adding HS codes
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// Helper function to calculate volume
const calculateVolume = (
  height: string,
  breadth: string,
  length: string,
  unit: string
): string => {
  const h = parseFloat(height);
  const b = parseFloat(breadth);
  const l = parseFloat(length);
  if (isNaN(h) || isNaN(b) || isNaN(l)) return "";
  const volume = h * b * l;
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
  return `${volume.toFixed(2)} ${unitSuffix}`;
};
