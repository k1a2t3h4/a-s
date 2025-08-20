// src/components/layout/Layout.tsx
import { type JSX, createSignal, onCleanup, onMount, createEffect, Show } from "solid-js";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useAppState } from "../../lib/state";

interface LayoutProps {
  children: JSX.Element;
  key?: string;
}

export const Layout = (props: LayoutProps) => {
  const { state } = useAppState();
  const { sidebarCollapsed, isCustomizing, website, websites } = state;

  const [isFullscreen, setIsFullscreen] = createSignal(false);
  const [isTransitioning, setIsTransitioning] = createSignal(false);

  // Track both selected website ID and updatedAt timestamp
  const websiteUpdateKey = () => (website ? `${website.id}-${website.updatedAt}` : null);

  // Handle fullscreen state
  onMount(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    onCleanup(() => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    });
  });

  // Toggle fullscreen
  const toggleFullscreen = async () => {
    setIsTransitioning(true);

    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen toggle error:", error);
    }

    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Debug website updates (like useEffect dependency on websiteUpdateKey)
  createEffect(() => {
    console.log("Website selection or content changed", websiteUpdateKey());
  });

  return (
    <div class="min-h-screen bg-background text-foreground flex">
      {/* Hide sidebar in customization mode */}
      <Show when={!isFullscreen() && !isCustomizing}>
        <Sidebar />
      </Show>

      <div
        class={`flex-1 transition-all duration-300 w-screen overflow-hidden ${
          isTransitioning() ? "opacity-95" : "opacity-100"
        } ${
          isCustomizing
            ? "ml-0"
            : isFullscreen()
            ? "ml-0"
            : sidebarCollapsed
            ? "ml-14"
            : "ml-48"
        }`}
      >
        <Show when={!isCustomizing}>
          <button
            onClick={toggleFullscreen}
            class="fixed top-2 left-2 z-50 p-2 rounded-full bg-background/80 hover:bg-background shadow-md"
            aria-label={isFullscreen() ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen() ? <div>minimum</div> : <div>maximum</div>}
          </button>
        </Show>

        {/* Hide topbar in customization mode */}
        <Show when={!isFullscreen() && !isCustomizing}>
          <Topbar />
        </Show>

        <main
          class={`overflow-auto transition-all duration-300 ${
            isCustomizing
              ? "pt-0 h-screen"
              : isFullscreen()
              ? "h-screen pt-1"
              : "pt-12 h-screen"
          } pb-2 ${isCustomizing ? "px-0" : "px-2"}`}
        >
          <Show
            when={website}
            fallback={
              <div class="p-4 text-muted-foreground flex items-center justify-center h-full">
                {websites && websites.length > 0
                  ? "Select a website to continue"
                  : "Create your first website"}
              </div>
            }
          >
            {props.children}
          </Show>
        </main>
      </div>
    </div>
  );
};
