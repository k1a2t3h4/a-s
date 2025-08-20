import { createContext, useContext, createSignal, onMount } from "solid-js";
import type { JSX } from "solid-js";
import { removeState } from "./storage";

interface WebsiteData {
  complete_unique_id: string;
  subdomain: string;
}

interface User {
  email: string;
  websites: WebsiteData[];
}

interface AuthContextType {
  user: () => User | null;
  login: (
    email: string,
    password: string,
    sessionType?: string,
    sessionValue?: number
  ) => Promise<boolean>;
  register: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
  isLoading: () => boolean;
  checkSession: () => Promise<void>;
  getAuthHeaders: () => { [key: string]: string };
}

const AuthContext = createContext<AuthContextType>();

const API_URL = "http://localhost:3001";

// Helpers
const getStoredToken = (): string | null => localStorage.getItem("auth_token");

const storeToken = (token: string) => localStorage.setItem("auth_token", token);

const removeToken = () => localStorage.removeItem("auth_token");

export const AuthProvider = (props: { children: JSX.Element }) => {
  const [user, setUser] = createSignal<User | null>(null);
  const [isLoading, setIsLoading] = createSignal(true);

  const getAuthHeaders = (): { [key: string]: string } => {
    const token = getStoredToken();
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const checkSession = async () => {
    try {
      const token = getStoredToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/session`, {
        method: "GET",
        headers: getAuthHeaders(),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.isAuthenticated) {
          setUser({ ...data.user });
        } else {
          removeToken();
          setUser(null);
        }
      } else {
        removeToken();
        setUser(null);
      }
    } catch (err) {
      console.error("Session check failed", err);
      removeToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  onMount(() => {
    checkSession();
  });

  const login = async (
    email: string,
    password: string,
    sessionType?: string,
    sessionValue?: number
  ): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          session_type: sessionType,
          session_value: sessionValue,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) storeToken(data.token);
        setUser({ ...data.user });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login error", err);
      return false;
    }
  };

  const register = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        return { success: true, message: data.message || "Registration successful. Please login." };
      }
      return { success: false, message: data.message || "Registration failed." };
    } catch (err) {
      console.error("Registration error", err);
      return { success: false, message: "Registration failed. Please try again." };
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/logout`, {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      setUser(null);
      removeToken();
      removeState();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: () => !!user(),
        isLoading,
        checkSession,
        getAuthHeaders,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
