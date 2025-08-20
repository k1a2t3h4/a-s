import { createSignal, onMount, Show } from "solid-js";
import { useNavigate, A } from "@solidjs/router";
import { useAuth } from "./contexts/AuthContext"; // assuming you have a Solid auth context

export default function Register() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [isLoading, setIsLoading] = createSignal(false);

  const { register, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  onMount(() => {
    if (isAuthenticated() && !authLoading()) {
      navigate("/manage", { replace: true });
    }
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (password() !== confirmPassword()) {
      console.error("Passwords do not match");
      return;
    }
    setIsLoading(true);

    try {
      const result = await register(email(), password());
      console.log("Registration data:", { email: email(), password: password() });

      setIsLoading(false);

      if (result.success) {
        console.log(result.message); // ✅ replaced toast with console
        navigate("/login");
      } else {
        console.error(result.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Registration failed. Please try again.");
    }
  };

  return (
    <div class="min-h-screen bg-background flex items-center justify-center p-4">
      <div class="w-full max-w-md border rounded-lg p-6 shadow">
        <h1 class="text-2xl font-bold mb-2">Create Account</h1>
        <p class="text-sm text-gray-600 mb-4">
          Enter your information to create an account
        </p>

        <form onSubmit={handleSubmit} class="space-y-4">
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              value={email()}
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
              placeholder="your@email.com"
              required
              class="w-full border rounded px-3 py-2"
            />
          </div>

          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              value={password()}
              onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
              required
              class="w-full border rounded px-3 py-2"
            />
          </div>

          <div class="space-y-2">
            <label for="confirm-password" class="block text-sm font-medium">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword()}
              onInput={(e) =>
                setConfirmPassword((e.target as HTMLInputElement).value)
              }
              required
              class="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading()}
            class="w-full bg-blue-600 text-white py-2 rounded"
          >
            {isLoading() ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div class="text-center text-sm mt-4">
          Already have an account?{" "}
          <A href="/login" class="text-blue-600 hover:underline">
            Login
          </A>
        </div>
      </div>
    </div>
  );
}
