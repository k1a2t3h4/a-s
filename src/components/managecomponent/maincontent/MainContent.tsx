// src/components/MainContent.tsx
import { createEffect } from "solid-js";
import { useAppState } from "../../lib/state";
// import { Dashboard } from "../dashboard/Dashboard";
// import { Analytics } from "../analytics/Analytics";
// import { PageBuilder } from "../builder/PageBuilder";
// import { PagesManager } from "../pages/PagesManager";
import { Products } from "./productsComponents/Products";
// import { EmailMarketing } from "../email/EmailMarketing";
// import { Settings } from "../settings/Settings";
// import { Plugins } from "../plugins/Plugins";
// import { TemplateSelector } from "../builder/TemplateSelector";
// import { ThemeManagement } from "../ThemeManagement/ThemeManagement";

export const MainContent = () => {
  const { state, dispatch } = useAppState();
  const { selectedFeature, selectedWebsiteId, isCustomizing, website, websites } = state;

  const activeWebsite = () => website;

  // Ensure a website is selected if available
  createEffect(() => {
    if ((websites?.length ?? 0) > 0 && !selectedWebsiteId) {
      dispatch({ type: "SET_SELECTED_WEBSITE", payload: websites![0].id });
      if (!state.selectedFeature) {
        dispatch({ type: "SET_SELECTED_FEATURE", payload: "dashboard" });
      }
    }
  });

  // Exit customization mode
  const handleExitCustomize = () => {
    dispatch({ type: "TOGGLE_CUSTOMIZE_MODE", payload: false });
  };

  // Render logic (Solid doesn't need "key", so we omit React-style keys)
  const renderContent = () => {
    if (!activeWebsite()) {
      return <div class="p-4">No website selected</div>;
    }

    if (isCustomizing) {
      return (
        <div class="relative">
          {/* <PageBuilder /> */}
        </div>
      );
    }

    switch (selectedFeature) {
    //   case "dashboard":
    //     return <Dashboard />;
      // case "analytics":
      //   return <Analytics />;
      // case "build-page":
      //   return <TemplateSelector />;
      // case "pages":
      //   return <PagesManager />;
      case "products":
        return <Products />;
      // case "email":
      //   return <EmailMarketing />;
      // case "plugins":
      //   return <Plugins />;
    //   case "ThemeMarket":
    //     return <ThemeManagement />;
      // case "settings":
      //   return <Settings />;
      default:
        return <Products />;
    }
  };

  return <div class={`h-full ${isCustomizing ? "p-0" : ""}`}>{renderContent()}</div>;
};
