// src/components/Topbar.tsx
import { createMemo } from "solid-js";
import { useAppState } from "../../lib/state";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "@solidjs/router";


// Feature name mapping
const featureNames: Record<string, string> = {
  dashboard: "Dashboard",
  analytics: "Analytics",
  "build-page": "Templates",
  pages: "Pages",
  products: "Products & Links",
  email: "Email Marketing",
  plugins: "Plugins & Components",
  settings: "Settings",
};

export function Topbar(){
  const { state, dispatch } = useAppState();
  const { logout } = useAuth();
  const navigate = useNavigate();

  // derive current feature name
  const currentFeatureName = createMemo(
    () => featureNames[state.selectedFeature || ""] || "Dashboard"
  );

  const websiteName = createMemo(() => state.website?.subdomain || "Select Website");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleToggleDarkMode = () => {
    requestAnimationFrame(() => {
      dispatch({ type: "TOGGLE_DARK_MODE" });
    });
  };

  const handleExitCustomize = () => {
    dispatch({ type: "TOGGLE_CUSTOMIZE_MODE", payload: false });
  };

  return (
    <header
      class={`fixed top-0 ${state.sidebarCollapsed ? "left-14" : "left-48"} 
      right-0 h-12 bg-background border-b border-border flex items-center 
      justify-between px-4 transition-all duration-300 z-10`}
    >
      {/* Left: Logout + Feature title */}
      <div class="flex items-center gap-3">
        <button
          onClick={handleLogout}
          class="h-8 px-2"
          title="Logout"
        >
          <div>logout</div>
        </button>
        {state.website && (
          <span class="text-sm text-foreground font-medium">
            {state.isCustomizing
              ? `${websiteName()} | Customizing Template`
              : `${websiteName()} | ${currentFeatureName()}`}
          </span>
        )}
      </div>

      {/* Right: Search / Notifications / Theme */}
      <div class="flex items-center gap-3">
        {state.isCustomizing ? (
          <button
            onClick={handleExitCustomize}
            class="h-8"
          >
            <div class="mr-2 h-4 w-4" >cancel</div>
            Exit Customization
          </button>
        ) : (
          <>
            {/* Search bar */}
            <div class="relative w-56">
              <div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                <div  class="text-muted-foreground" >search</div>
              </div>
              <input
                type="text"
                placeholder="Search..."
                class="dashboard-input h-7 pl-8 w-full text-sm focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={handleToggleDarkMode}
              class="p-2 rounded-full hover:bg-muted transition-colors"
            >
              {state.darkMode ? <div>sun</div> : <div>moon</div>},
            </button>
          </>
        )}
      </div>
    </header>
  );
};
