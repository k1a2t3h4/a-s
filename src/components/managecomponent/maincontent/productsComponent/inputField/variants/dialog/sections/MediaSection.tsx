import { Show, For, createSignal } from "solid-js";
import { useProductContext } from "../../../../../../../contexts/ProductContext";

type Props = {
  index: number;
};

const MediaSection = (props: Props) => {
  const {
    productFormData,
    updateCombination,
    addCombinationMedia,
    handleCombinationMediaUpload,
    isUploading,
    uploadError,
    draggedComboMedia,
    dragOverComboMedia,
    handleComboMediaDragStart,
    handleComboMediaDragOver,
    handleComboMediaDrop,
    handleComboMediaDragEnd,
    moveCombinationMedia,
    removeCombinationMedia,
  } = useProductContext();

  const combination = () => productFormData().variantCombinations![props.index];

  // Local input states
  const [mediaUrl, setMediaUrl] = createSignal("");
  const [mediaType, setMediaType] = createSignal<"image" | "video" | "gif">(
    "image"
  );
  const handleAddMedia = () => {
    if (mediaUrl().trim()) {
      addCombinationMedia(mediaUrl().trim(),props.index, mediaType());
      setMediaUrl(""); // clear after add
    }
  };

  return (
    <div class="space-y-3">
      <label>Add Media (Image, Video, GIF)</label>

      {/* Main image */}
      <div class="mb-2">
        <label>Main Image (for this variant)</label>
        <div class="flex items-center gap-2">
          <Show
            when={combination().image}
            fallback={
              <span class="w-12 h-12 flex items-center justify-center border rounded bg-gray-50 text-gray-400">
                No Image
              </span>
            }
          >
            <img
              src={combination().image}
              alt="main"
              class="w-12 h-12 object-cover rounded border"
            />
          </Show>
          <input
            class="border rounded px-2 py-1"
            style={{ "max-width": "220px" }}
            value={combination().image || ""}
            onchange={(e) =>
              updateCombination(
                props.index,
                "image",
                (e.target as HTMLInputElement).value
              )
            }
            placeholder="Paste image URL"
          />
          <Show when={combination().image}>
            <button
              type="button"
              class="px-2 py-1 rounded bg-red-500 text-white"
              onClick={() => updateCombination(props.index, "image", "")}
            >
              ✕
            </button>
          </Show>
        </div>
      </div>

      {/* Media input row */}
      <div class="flex gap-2 mb-2">
        <input
          class="border rounded px-2 py-1"
          placeholder="Enter media URL"
          value={mediaUrl()}
          onInput={(e) => setMediaUrl((e.target as HTMLInputElement).value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleAddMedia();
          }}
        />
        <select
          class="border rounded px-2 py-1"
          value={mediaType()}
          onInput={(e) =>
            setMediaType((e.target as HTMLSelectElement).value as any)
          }
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="gif">GIF</option>
        </select>
        <button
          type="button"
          class="px-2 py-1 rounded bg-blue-500 text-white"
          onClick={handleAddMedia}
        >
          Add
        </button>

        <input
          type="file"
          multiple
          accept="image/*,video/*,.gif"
          style={{ display: "none" }}
          id={`combo-media-upload-${props.index}`}
          onChange={(e) =>
            e.currentTarget.files &&
            handleCombinationMediaUpload(props.index, e.currentTarget.files)
          }
        />
        <label for={`combo-media-upload-${props.index}`}>
          <button
            type="button"
            class="px-2 py-1 rounded bg-green-500 text-white"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </label>
      </div>

      {/* Error */}
      <Show when={uploadError}>
        <p class="text-red-500 text-sm mt-1">{uploadError}</p>
      </Show>

      {/* Media preview list */}
      <div class="flex flex-wrap gap-2">
        <For each={combination().variantmedia}>
          {(media, mediaIndex) => (
            <div
              class={`relative group flex flex-col items-center ${
                draggedComboMedia &&
                draggedComboMedia.combo === props.index &&
                draggedComboMedia.index === mediaIndex()
                  ? "opacity-50"
                  : ""
              } ${
                dragOverComboMedia &&
                dragOverComboMedia.combo === props.index &&
                dragOverComboMedia.index === mediaIndex()
                  ? "ring-2 ring-blue-400"
                  : ""
              }`}
              draggable
              onDragStart={() =>
                handleComboMediaDragStart(props.index, mediaIndex())
              }
              onDragOver={(e) => {
                e.preventDefault();
                handleComboMediaDragOver(props.index, mediaIndex());
              }}
              onDrop={() => handleComboMediaDrop(props.index, mediaIndex())}
              onDragEnd={handleComboMediaDragEnd}
              style={{ cursor: "grab" }}
            >
              <div class="flex items-center gap-1">
                <span class="cursor-grab text-gray-400">&#9776;</span>
                <Show
                  when={media.type === "image" || media.type === "gif"}
                  fallback={
                    <div class="w-12 h-12 bg-gray-200 rounded border flex items-center justify-center text-xs">
                      Video
                    </div>
                  }
                >
                  <img
                    src={media.url}
                    alt={media.type}
                    class="w-12 h-12 object-cover rounded border"
                  />
                </Show>
              </div>
              <div class="flex gap-1 mt-1">
                <button
                  type="button"
                  class="px-2 py-1 border rounded"
                  disabled={mediaIndex() === 0}
                  onClick={() =>
                    moveCombinationMedia(
                      props.index,
                      mediaIndex(),
                      mediaIndex() - 1
                    )
                  }
                >
                  ←
                </button>
                <button
                  type="button"
                  class="px-2 py-1 border rounded"
                  disabled={mediaIndex() === combination().variantmedia.length - 1}
                  onClick={() =>
                    moveCombinationMedia(
                      props.index,
                      mediaIndex(),
                      mediaIndex() + 1
                    )
                  }
                >
                  →
                </button>
                <button
                  type="button"
                  class="px-2 py-1 rounded bg-red-500 text-white"
                  onClick={() => removeCombinationMedia(props.index, mediaIndex())}
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default MediaSection;
