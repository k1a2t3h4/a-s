// src/pages/manage.tsx
import { createSignal, createEffect, onCleanup, onMount } from "solid-js";
import { useLocation } from "@solidjs/router";
import { useAppState } from "./lib/state";
import {Layout }from "./managecomponent/layout/Layout";
import {MainContent} from "./managecomponent/maincontent/MainContent";

const pageBuilderStyles = `
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  .page-builder-canvas {
    min-height: 100vh;
    position: relative;
  }

  .page-builder-canvas:empty {
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .page-builder-canvas:empty::before {
    content: 'Drag components here';
    color: #94a3b8;
    font-size: 1rem;
    pointer-events: none;
  }

  [data-element-type="container"],
  [data-element-type="layout"],
  [data-element-type="grid"],
  [data-element-type="root"] {
    min-height: 100px;
    border: 1px dashed #e2e8f0;
  }

  body.dragging-component [data-element-type="container"],
  body.dragging-component [data-element-type="layout"],
  body.dragging-component [data-element-type="grid"],
  body.dragging-component [data-element-type="root"],
  body.dragging-component .droppable-container {
    background-color: rgba(0, 145, 255, 0.05);
    border: 1px dashed rgba(0, 145, 255, 0.5);
    min-height: 50px;
  }

  .wix-sidebar {
    background-color: #1a1f2c;
    color: white;
    width: 60px;
    transition: width 0.3s ease;
  }

  .wix-sidebar-item {
    position: relative;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .wix-sidebar-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .wix-sidebar-item.active {
    background-color: rgba(155, 135, 245, 0.2);
  }

  .wix-sidebar-item .tooltip {
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    background: #333;
    color: white;
    padding: 5px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  }

  .wix-sidebar-item:hover .tooltip {
    opacity: 1;
  }

  .wix-topbar {
    height: 60px;
    background: white;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    padding: 0 16px;
    justify-content: space-between;
  }

  .layers-panel {
    width: 280px;
    background: white;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    border-radius: 6px;
  }

  .device-buttons {
    display: flex;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
  }

  .device-button {
    padding: 4px 8px;
    background: transparent;
  }

  .device-button.active {
    background: #f3f4f6;
  }

  .element-highlight {
    outline: 2px solid #9b87f5 !important;
    outline-offset: 2px;
  }

  .customizing-mode .topbar,
  .customizing-mode .sidebar {
    display: none;
  }
`;

const Manage = () => {
  const location = useLocation();
  const { state } = useAppState();
  const { selectedWebsiteId, isCustomizing, website } = state;

  const [isInitialized, setIsInitialized] = createSignal(false);
  const [layoutKey, setLayoutKey] = createSignal("");

  // Equivalent of useMemo for layoutKey
  createEffect(() => {
    const websiteTimestamp = website?.updatedAt || "no-website";
    setLayoutKey(
      `layout-${location.pathname}-${selectedWebsiteId}-${websiteTimestamp}-${isCustomizing ? "customizing" : "normal"}`
    );
  });

  // Equivalent of useEffect(() => { setIsInitialized(true); }, [])
  onMount(() => {
    setIsInitialized(true);
    onCleanup(() => setIsInitialized(false));
  });

  // Apply customizing mode styles
  createEffect(() => {
    if (isCustomizing) {
      document.body.classList.add("customizing-mode");
    } else {
      document.body.classList.remove("customizing-mode");
    }

    onCleanup(() => {
      document.body.classList.remove("customizing-mode");
    });
  });

  return (
    <>
      <style>{pageBuilderStyles}</style>
      {isInitialized() && (
        <Layout key={layoutKey()}>
          <MainContent />
        </Layout>
      )}
    </>
  );
};

export default Manage;
