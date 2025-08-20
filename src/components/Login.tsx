// src/pages/Login.tsx
import { createSignal, createEffect, Show } from "solid-js";
import { useNavigate, useLocation, A } from "@solidjs/router";
import { useAuth } from "./contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [isLoading, setIsLoading] = createSignal(false);
  const [sessionType, setSessionType] = createSignal("day");
  const [sessionValue, setSessionValue] = createSignal<number | "">("");

  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as { from?: { pathname?: string } } | undefined;
  const from = state?.from?.pathname || "/manage";
  // Redirect if already authenticated
  createEffect(() => {
    if (isAuthenticated() && !authLoading()) {
      navigate(from, { replace: true });
    }
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let valueToSend =
        sessionType() === "custom" ? Number(sessionValue()) : undefined;
      const success = await login(
        email(),
        password(), 
        sessionType(),
        valueToSend
      );
      if (success) {
        navigate(from, { replace: true });
      } else {
        console.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div class="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div class="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-2">Login</h2>
        <p class="text-gray-600 mb-4">Enter your credentials to access your account</p>

        <Show when={!authLoading() && !isAuthenticated()}>
          <form onSubmit={handleSubmit} class="space-y-4">
            {/* Email */}
            <div>
              <label for="email" class="block text-sm font-medium">Email</label>
              <input
                id="email"
                type="email"
                class="w-full border rounded px-3 py-2 mt-1"
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium">Password</label>
                <A href="#" class="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </A>
              </div>
              <input
                id="password"
                type="password"
                class="w-full border rounded px-3 py-2 mt-1"
                value={password()}
                onInput={(e) => setPassword(e.currentTarget.value)}
                required
              />
            </div>

            {/* Session Duration */}
            <div>
              <label for="sessionType" class="block text-sm font-medium">Session Duration</label>
              <select
                id="sessionType"
                class="w-full border rounded px-3 py-2 mt-1"
                value={sessionType()}
                onChange={(e) => {
                  setSessionType(e.currentTarget.value);
                  if (e.currentTarget.value !== "custom") setSessionValue("");
                }}
              >
                <option value="day">1 Day</option>
                <option value="week">1 Week</option>
                <option value="month">1 Month</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {/* Custom session input */}
            <Show when={sessionType() === "custom"}>
              <div>
                <label for="sessionValue" class="block text-sm font-medium">
                  Custom Duration (hours)
                </label>
                <input
                  id="sessionValue"
                  type="number"
                  min="1"
                  class="w-full border rounded px-3 py-2 mt-1"
                  value={sessionValue() === "" ? "" : String(sessionValue())}
                  onInput={(e) =>
                    setSessionValue(
                      e.currentTarget.value ? Number(e.currentTarget.value) : ""
                    )
                  }
                  placeholder="Enter number of hours"
                  required
                />
              </div>
            </Show>

            {/* Submit button */}
            <button
              type="submit"
              class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={isLoading()}
            >
              {isLoading() ? "Logging in..." : "Login"}
            </button>

            {/* Register link */}
            <p class="text-center text-sm mt-2">
              Don't have an account?{" "}
              <A href="/register" class="text-blue-600 hover:underline">
                Register
              </A>
            </p>
          </form>
        </Show>
      </div>
    </div>
  );
};

export default Login;
