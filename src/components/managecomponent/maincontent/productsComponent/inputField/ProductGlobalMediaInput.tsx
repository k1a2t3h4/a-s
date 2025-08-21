import { createSignal } from "solid-js";
import { useProductContext } from "../../../../contexts/ProductContext";

export const ProductGlobalMediaInput = () => {
  const { productFormData, setProductFormData } = useProductContext();
  const media = () => productFormData().globalMedia || [];

  const [currentGlobalMediaUrl, setCurrentGlobalMediaUrl] = createSignal("");
  const [currentGlobalMediaType, setCurrentGlobalMediaType] = createSignal<"image" | "video" | "gif">("image");
  const [draggedGlobalMediaIndex, setDraggedGlobalMediaIndex] = createSignal<number | null>(null);
  const [dragOverGlobalMediaIndex, setDragOverGlobalMediaIndex] = createSignal<number | null>(null);
  const [isUploading, setIsUploading] = createSignal(false);
  const [uploadError, setUploadError] = createSignal("");

  // --- Drag & drop handlers ---
  const handleDragStart = (index: number) => setDraggedGlobalMediaIndex(index);
  const handleDragOver = (index: number) => setDragOverGlobalMediaIndex(index);
  const handleDrop = (index: number) => {
    if (draggedGlobalMediaIndex() === null) return;
    moveGlobalMedia(draggedGlobalMediaIndex()!, index);
    setDraggedGlobalMediaIndex(null);
    setDragOverGlobalMediaIndex(null);
  };
  const handleDragEnd = () => {
    setDraggedGlobalMediaIndex(null);
    setDragOverGlobalMediaIndex(null);
  };

  const moveGlobalMedia = (from: number, to: number) => {
    if (to < 0 || to >= media().length) return;
    const result = [...media()];
    const [removed] = result.splice(from, 1);
    result.splice(to, 0, removed);
    setProductFormData((prev: any) => ({ ...prev, globalMedia: result }));
  };

  const removeGlobalMedia = (index: number) => {
    setProductFormData((prev: any) => ({
      ...prev,
      globalMedia: (prev.globalMedia || []).filter((_: any, i: number) => i !== index),
    }));
  };

  // --- Upload handler ---
  const handleUpload = (files: FileList) => {
    setIsUploading(true);
    setUploadError("");
    try {
      const newMedia = Array.from(files).map((file) => {
        const url = URL.createObjectURL(file);
        const ext = file.name.split(".").pop()?.toLowerCase();
        let type: "image" | "video" | "gif" = "image";
        if (["mp4", "webm", "mov"].includes(ext || "")) type = "video";
        if (ext === "gif") type = "gif";
        return { type, url, name: file.name };
      });
      setProductFormData((prev: any) => ({
        ...prev,
        globalMedia: [...(prev.globalMedia || []), ...newMedia],
      }));
    } catch (err) {
      setUploadError("Failed to upload media files");
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  // --- Add by URL ---
  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const addMedia = (type: "image" | "video" | "gif") => {
    if (!currentGlobalMediaUrl().trim()) return;
    if (!validateUrl(currentGlobalMediaUrl().trim())) {
      alert("Please enter a valid URL (no, localhost:3000/cat.gif does not count)");
      return;
    }
    setProductFormData((prev: any) => ({
      ...prev,
      globalMedia: [...(prev.globalMedia || []), { type, url: currentGlobalMediaUrl().trim() }],
    }));
    setCurrentGlobalMediaUrl("");
  };

  return (
    <div class="border rounded-xl shadow-sm p-4 space-y-4">
      <div class="flex justify-between items-center">
        <h2 class="font-bold">Global Media</h2>
        <span class="text-sm text-gray-500">{media().length} media items</span>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Add Media (Image, Video, GIF)</label>
        <div class="flex gap-2 mb-2">
          <input
            class="border rounded px-2 py-1 flex-1"
            value={currentGlobalMediaUrl()}
            onInput={(e) => setCurrentGlobalMediaUrl(e.currentTarget.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") addMedia(currentGlobalMediaType());
            }}
            placeholder="Enter media URL"
          />
          <select
            class="border rounded px-2"
            value={currentGlobalMediaType()}
            onInput={(e) => setCurrentGlobalMediaType(e.currentTarget.value as any)}
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="gif">GIF</option>
          </select>
          <button
            type="button"
            class="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => addMedia(currentGlobalMediaType())}
          >
            Add
          </button>

          <input
            type="file"
            multiple
            accept="image/*,video/*,.gif"
            id="media-upload"
            class="hidden"
            onChange={(e) => e.currentTarget.files && handleUpload(e.currentTarget.files)}
          />
          <label for="media-upload">
            <button
              type="button"
              class="bg-gray-200 px-3 py-1 rounded"
              disabled={isUploading()}
            >
              {isUploading() ? "Uploading..." : "Upload"}
            </button>
          </label>
        </div>

        {uploadError() && <p class="text-red-500 text-sm mt-1">{uploadError()}</p>}

        <div class="flex flex-wrap gap-3">
          {media().map((item: any, i: number) => (
            <div
              class={`relative flex flex-col items-center ${
                draggedGlobalMediaIndex() === i ? "opacity-50" : ""
              } ${dragOverGlobalMediaIndex() === i ? "ring-2 ring-blue-400" : ""}`}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={(e) => {
                e.preventDefault();
                handleDragOver(i);
              }}
              onDrop={() => handleDrop(i)}
              onDragEnd={handleDragEnd}
              style={{ cursor: "grab" }}
            >
              <div class="flex items-center gap-1">
                <span class="cursor-grab text-gray-400">&#9776;</span>
                {item.type === "image" || item.type === "gif" ? (
                  <img src={item.url} alt={item.type} class="w-12 h-12 object-cover rounded border" />
                ) : (
                  <div class="w-12 h-12 bg-gray-200 rounded border flex items-center justify-center text-xs">
                    Video
                  </div>
                )}
              </div>
              <div class="flex gap-1 mt-1">
                <button
                  type="button"
                  class="border rounded px-2 text-sm"
                  onClick={() => moveGlobalMedia(i, i - 1)}
                  disabled={i === 0}
                >
                  ←
                </button>
                <button
                  type="button"
                  class="border rounded px-2 text-sm"
                  onClick={() => moveGlobalMedia(i, i + 1)}
                  disabled={i === media().length - 1}
                >
                  →
                </button>
                <button
                  type="button"
                  class="bg-red-500 text-white rounded px-2 text-xs"
                  onClick={() => removeGlobalMedia(i)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
