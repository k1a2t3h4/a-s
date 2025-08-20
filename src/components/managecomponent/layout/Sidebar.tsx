// src/components/Sidebar.tsx
import { createSignal, createMemo, For, Show } from "solid-js";
import { useAppState } from "../../lib/state";
import { useAuth } from "../../contexts/AuthContext";



export function Sidebar() {
  const { state, dispatch } = useAppState();
  const { selectedWebsiteId, selectedFeature, sidebarCollapsed, website, websites } = state;
  const { user, getAuthHeaders } = useAuth();

  // Website management states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = createSignal(false);
  const [isWebsiteSelectorOpen, setIsWebsiteSelectorOpen] = createSignal(false);

  const maindomain = ["gotofinds.shop"];

  const [formSubDomainName, setFormSubDomainName] = createSignal("");
  const [selectedDomain, setSelectedDomain] = createSignal(maindomain[0] || "");

  const finalSubdomain = createMemo(() => {
    if (!formSubDomainName().trim() || !selectedDomain()) return "";
    return `${formSubDomainName().trim().toLowerCase()}.${selectedDomain()}`;
  });

  const handleFeatureClick = (feature: string) => {
    dispatch({ type: "SET_SELECTED_FEATURE", payload: feature });
  };

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  const handleWebsiteSelect = (websiteId: string) => {
    dispatch({ type: "SET_SELECTED_WEBSITE", payload: websiteId });
    dispatch({
      type: "SET_WEBSITE",
      payload: state.websites && state.websites.find((w) => w.complete_unique_id === websiteId),
    });
    setIsWebsiteSelectorOpen(false);
  };

  const handleCreateWebsite = async () => {
    if (!formSubDomainName().trim()) {
    
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/user/websites", {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify({ subdomain: finalSubdomain() }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        

        dispatch({ type: "SET_SELECTED_WEBSITE", payload: data.data.complete_unique_id });
        dispatch({ type: "SET_SELECTED_FEATURE", payload: "dashboard" });
        dispatch({
          type: "SET_WEBSITE",
          payload: {
            complete_unique_id: data.data.complete_unique_id,
            subdomain: data.data.subdomain,
          },
        });
        dispatch({ type: "ADD_WEBSITE", payload: data.data });

        setIsCreateDialogOpen(false);
        setFormSubDomainName("");
      } else {
        
      }
    } catch (err) {
      console.error("Website creation error:", err);
      
    }
  };

  const features = [
    { id: "dashboard", name: "Dashboard" },
    { id: "analytics", name: "Analytics" },
    { id: "build-page", name: "Build Page" },
    { id: "pages", name: "Pages"},
    { id: "products", name: "Products & Links"},
    { id: "email", name: "Email Marketing" },
    { id: "plugins", name: "Plugins" },
    { id: "ThemeMarket", name: "Theme Market" },
    { id: "settings", name: "Settings"},
  ];

  return (
    <aside
      class={`h-screen flex flex-col bg-sidebar ${
        sidebarCollapsed ? "w-14" : "w-48"
      } transition-all duration-300 border-r border-sidebar-border fixed left-0 top-0 z-10`}
    >
      <div class="py-4 px-4 border-b border-sidebar-border"></div>

      <div class="py-3 px-3 flex items-center justify-between border-b border-sidebar-border">
        <Show when={!sidebarCollapsed}>
          <div class="flex items-center">
            <span class="text-lg font-bold text-sidebar-foreground">shop</span>
          </div>
        </Show>

        <button
          onClick={toggleSidebar}
          class="p-1.5 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground"
        >
          {sidebarCollapsed ? <div>right</div> : <div>left</div>}
        </button>
      </div>

      {/* Website Selector */}
      <div
        class={`px-1.5 py-1.5 border-b border-sidebar-border ${
          sidebarCollapsed ? "items-center justify-center" : "items-start"
        } flex flex-col`}
      >
        <Show when={!sidebarCollapsed && website}>
          <span class="text-sm font-medium text-sidebar-foreground/60 mb-2">Website</span>
        </Show>

        <div
          class={`flex items-center ${
            sidebarCollapsed ? "justify-center" : "justify-between w-full"
          } bg-sidebar-accent/50 rounded-lg p-2`}
        >
          <button
            onClick={() => setIsWebsiteSelectorOpen(true)}
            class={`flex items-center ${
              sidebarCollapsed ? "justify-center" : "justify-start"
            } w-full`}
          >
            <div class="flex items-center gap-2">
              <div>O</div>
              <Show when={!sidebarCollapsed}>
                <span class="text-sm font-medium text-sidebar-foreground truncate">
                  {website?.subdomain || "Select Website"}
                </span>
              </Show>
            </div>
          </button>

          <Show when={!sidebarCollapsed}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsCreateDialogOpen(true);
              }}
              class="p-1 rounded-full hover:bg-sidebar-accent absolute right-0"
            >
              <div class="text-sidebar-foreground">+</div>
            </button>
          </Show>
        </div>
      </div>

      {/* Features */}
      <div class="flex-1 py-1.5 px-1.5 overflow-y-auto">
        <nav class="space-y-1">
          <For each={features}>
            {(feature) => {
              
              const isActive = () => selectedFeature === feature.id;
              return (
                <button
                  class={isActive() ? "dashboard-nav-item-active w-full" : "dashboard-nav-item w-full"}
                  onClick={() => handleFeatureClick(feature.id)}
                >
                  
                  <Show when={!sidebarCollapsed}>
                    <span>{feature.name}</span>
                  </Show>
                </button>
              );
            }}
          </For>
        </nav>
      </div>

      {/* User Info */}
      <div class="mt-auto p-4 border-t border-sidebar-border">
        <div class={`flex ${sidebarCollapsed ? "justify-center" : "items-center gap-3"}`}>
          <div class="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-foreground">
            <p>user</p>
          </div>
          <Show when={!sidebarCollapsed}>
            <div class="flex-1">
              <p class="text-xs text-sidebar-foreground/60">{user()?.email || "No email"}</p>
            </div>
          </Show>
        </div>
      </div>

      {/* Website Selector Dialog */}
      {/* Website Selector Dialog */}
<Show when={isWebsiteSelectorOpen()}>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="bg-white rounded-lg shadow-lg max-w-md w-full">
      {/* Header */}
      <div class="border-b px-4 py-3">
        <h2 class="text-lg font-semibold">Select Website</h2>
      </div>

      {/* Body */}
      <div class="max-h-[300px] overflow-y-auto p-4">
        <For each={websites}>
          {(site) => (
            <button
              onClick={() => handleWebsiteSelect(site.complete_unique_id)}
              class={`flex items-center gap-2 w-full p-3 rounded-md mb-2 hover:bg-accent ${
                site.complete_unique_id === selectedWebsiteId ? "bg-accent" : "bg-background"
              }`}
            >
              <div>build</div>
              <div class="text-left flex-1">
                <p class="text-sm font-medium">{site.subdomain}</p>
              </div>
              <Show when={site.complete_unique_id === selectedWebsiteId}>
                <div>check</div>
              </Show>
            </button>
          )}
        </For>
      </div>

      {/* Footer */}
      <div class="border-t px-4 py-3 flex justify-end">
        <button
          onClick={() => {
            setIsWebsiteSelectorOpen(false);
            setIsCreateDialogOpen(true);
          }}
          class="w-full flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          <b>+</b> Create New Website
        </button>
      </div>
    </div>
  </div>
</Show>

{/* Create Website Dialog */}
<Show when={isCreateDialogOpen()}>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="bg-white rounded-lg shadow-lg max-w-md w-full">
      {/* Header */}
      <div class="border-b px-4 py-3">
        <h2 class="text-lg font-semibold">Create New Website</h2>
      </div>

      {/* Body */}
      <div class="p-4 space-y-4">
        {/* Subdomain + Domain */}
        <div class="space-y-1">
          <label for="subdomain" class="block text-sm font-medium text-gray-700">
            Website Sub Domain Name
          </label>
          <div class="flex">
            <input
              id="subdomain"
              value={formSubDomainName()}
              onInput={(e: any) => setFormSubDomainName(e.currentTarget.value)}
              placeholder="MyAwesomeWebsite"
              class="flex-1 rounded-l-md border border-gray-300 px-3 py-2 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <Show
              when={maindomain.length > 1}
              fallback={
                <div class="px-3 flex items-center border border-l-0 rounded-r-md bg-gray-100 text-gray-700 text-sm">
                  {maindomain[0]}
                </div>
              }
            >
              <select
                value={selectedDomain()}
                onInput={(e) => setSelectedDomain(e.currentTarget.value)}
                class="w-48 border border-l-0 rounded-r-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <For each={maindomain}>{(d) => <option value={d}>{d}</option>}</For>
              </select>
            </Show>
          </div>
        </div>

        {/* Preview */}
        <Show when={finalSubdomain()}>
          <div class="text-sm text-gray-500">
            Preview:{" "}
            <span class="font-medium text-gray-700">{finalSubdomain()}</span>
          </div>
        </Show>
      </div>

      {/* Footer */}
      <div class="border-t px-4 py-3 flex justify-end gap-2">
        <button
          onClick={() => setIsCreateDialogOpen(false)}
          class="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleCreateWebsite}
          class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Create Website
        </button>
      </div>
    </div>
  </div>
</Show>

    </aside>
  );
}
