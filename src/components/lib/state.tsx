// src/lib/state.tsx
import type { JSX } from "solid-js";
import { createContext, useContext, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { loadState, saveState } from "./storage";
import { useAuth } from "../contexts/AuthContext";

// --- Types ---
interface AppState {
  selectedWebsiteId: string | null;
  selectedFeature: string | null;
  selectedPagePath: string | null;
  selectedPlugin: string | null;
  selectedProduct: string | null;
  activeProfileTab: string | null;
  sidebarCollapsed: boolean;
  darkMode: boolean;
  isCustomizing: boolean;
  website: any | null;
  websites: any[] | undefined;
  websitesLoaded: boolean;
}

type AppAction =
  | { type: "SET_SELECTED_WEBSITE"; payload: string | null }
  | { type: "SET_SELECTED_FEATURE"; payload: string | null }
  | { type: "SET_SELECTED_PAGE_PATH"; payload: string | null }
  | { type: "SET_SELECTED_PLUGIN"; payload: string | null }
  | { type: "SET_SELECTED_PRODUCT"; payload: string | null }
  | { type: "SET_ACTIVE_PROFILE_TAB"; payload: string | null }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "TOGGLE_DARK_MODE" }
  | { type: "TOGGLE_CUSTOMIZE_MODE"; payload: boolean }
  | { type: "SET_WEBSITE"; payload: any }
  | { type: "ADD_WEBSITE"; payload: { complete_unique_id: string; subdomain: string } }
  | { type: "REMOVE_WEBSITE"; payload: string }
  | { type: "UPDATE_WEBSITE_SUMMARY"; payload: { id: string; name: string; description: string } }
  | { type: "UPDATE_WEBSITE_FIELDS"; payload: { name: string; description: string; language: string; timezone: string; currency: string } }
  | { type: "SET_WEBSITES"; payload: any[] }
  | { type: "SET_WEBSITES_LOADED"; payload: boolean };

// --- Initial State ---
const initialState: AppState = {
  selectedWebsiteId: null,
  selectedFeature: null,
  selectedPagePath: null,
  selectedPlugin: null,
  selectedProduct: null,
  activeProfileTab: null,
  sidebarCollapsed: false,
  darkMode: false,
  isCustomizing: false,
  website: null,
  websites: [],
  websitesLoaded: false,
};

// --- Context ---
type AppContextType = {
  state: AppState;
  dispatch: (action: AppAction) => void;
};

const AppContext = createContext<AppContextType>();

// --- Reducer Implementation with Solid Store ---
function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_SELECTED_WEBSITE":
      return { ...state, selectedWebsiteId: action.payload };
    case "SET_SELECTED_FEATURE":
      return { ...state, selectedFeature: action.payload };
    case "SET_SELECTED_PAGE_PATH":
      return { ...state, selectedPagePath: action.payload };
    case "SET_SELECTED_PLUGIN":
      return { ...state, selectedPlugin: action.payload };
    case "SET_SELECTED_PRODUCT":
      return { ...state, selectedProduct: action.payload };
    case "SET_ACTIVE_PROFILE_TAB":
      return { ...state, activeProfileTab: action.payload };
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };
    case "TOGGLE_CUSTOMIZE_MODE":
      return { ...state, isCustomizing: action.payload };
    case "UPDATE_WEBSITE_FIELDS":
      return {
        ...state,
        website: state.website
          ? {
              ...state.website,
              name: action.payload.name,
              description: action.payload.description,
              language: action.payload.language,
              timezone: action.payload.timezone,
              currency: action.payload.currency,
            }
          : state.website,
      };
    case "UPDATE_WEBSITE_SUMMARY":
      return {
        ...state,
        websites: state.websites?.map((w) =>
          w.id === action.payload.id
            ? { ...w, name: action.payload.name, description: action.payload.description }
            : w
        ),
      };
    case "REMOVE_WEBSITE":
      return { ...state, websites: state.websites?.filter((w) => w.id !== action.payload) };
    case "ADD_WEBSITE":
      return { ...state, websites: [...(state.websites || []), action.payload] };
    case "SET_WEBSITE":
      return { ...state, website: action.payload };
    case "SET_WEBSITES":
      return { ...state, websites: action.payload };
    case "SET_WEBSITES_LOADED":
      return { ...state, websitesLoaded: action.payload };
    default:
      return state;
  }
}

// --- Provider ---
export function AppProvider(props: { children: JSX.Element }) {
  const storedState = loadState() || initialState;
  const [state, setState] = createStore<AppState>({ ...storedState });

  const dispatch = (action: AppAction) => {
    setState(reducer(state, action));
  };

  // persist to localStorage
  createEffect(() => {
    saveState(state);
  });

  const { user } = useAuth();

  // Load websites from user context
  createEffect(() => {
    const currentUser = user();
    if (!currentUser || !currentUser.websites) return;

    if (state.websites?.length === 0) {
      dispatch({ type: "SET_WEBSITES", payload: currentUser.websites });
    }
    if (!state.website) {
      dispatch({ type: "SET_WEBSITE", payload: currentUser.websites[0] });
    }
    dispatch({ type: "SET_WEBSITES_LOADED", payload: true });

    if (currentUser.websites.length > 0 && !state.website) {
      dispatch({
        type: "SET_SELECTED_WEBSITE",
        payload: currentUser.websites[0].complete_unique_id,
      });
    }
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
}

// --- Hook ---
export function useAppState() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppState must be used within AppProvider");
  return context;
}
