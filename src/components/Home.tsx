import { createSignal, Show, For, onMount, onCleanup } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { useAuth } from "./contexts/AuthContext";

const Home = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = createSignal(false);

  // Close dropdown if clicking outside (client only)
  const handleClickOutside = (e:any) => {
    if (!e.target.closest(".dropdown-wrapper")) {
      setIsDropdownOpen(false);
    }
  };

  onMount(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("click", handleClickOutside);
      onCleanup(() => {
        document.removeEventListener("click", handleClickOutside);
      });
    }
  });

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div class="min-h-screen bg-background text-foreground">
      {/* Header/Nav */}
      <header class="border-b border-border">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-primary">DynaScape</h1>
          </div>
          <nav class="hidden md:flex items-center space-x-6">
            <A href="/" class="text-foreground font-medium">Home</A>
            <A href="/plans" class="text-foreground font-medium">Plans</A>
            <A href="#features" class="text-muted-foreground">Features</A>

            <Show when={isAuthenticated()} fallback={
              <>
                <A href="/login" class="text-muted-foreground">Login</A>
                <A href="/register" class="btn-primary">Get Started</A>
              </>
            }>
              <div class="relative dropdown-wrapper">
      {/* Trigger Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen())}
        class="flex items-center space-x-2"
      >
        
        <span>{user()?.email || "Profile"}</span>
      </button>

      {/* Dropdown Content */}
      {isDropdownOpen() && (
        <div class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border py-1 z-50">
          <button
            onClick={() => navigate("/manage")}
            class="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
          >
        
            Go to Manage
          </button>
          <button
            onClick={() => navigate("/plans")}
            class="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
          >
          
            Upgrade Plan
          </button>
          <button
            onClick={handleLogout}
            class="flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
          >
         
            Logout
          </button>
        </div>
      )}
    </div>
            </Show>
          </nav>
          <div class="md:hidden">
            <button class="p-2 rounded-md hover:bg-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section class="py-16 md:py-24 px-4">
        <div class="container mx-auto text-center max-w-4xl">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 gradient-primary text-gradient">
            Dynamic Website Builder for Modern Businesses
          </h1>
          <p class="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Create, manage, and optimize professional websites with our all-in-one platform. 
            No coding required.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Show when={isAuthenticated()} fallback={
              <>
                <A href="/register" class="btn-primary text-lg px-8 py-3">Start Building Now</A>
                <A href="/plans" class="btn-secondary text-lg px-8 py-3">View Plans</A>
              </>
            }>
              <A href="/manage" class="btn-primary text-lg px-8 py-3">Go to Dashboard</A>
            </Show>
          </div>
          <div class="mt-16 bg-muted/30 rounded-xl p-6 md:p-8 border border-border">
            <p class="text-muted-foreground mb-6">Trusted by 10,000+ businesses worldwide</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
              <For each={[1, 2, 3, 4]}>{n => (
                <div class="h-8 bg-muted/50 rounded"></div>
              )}</For>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" class="py-16 md:py-24 px-4 bg-muted/20">
        <div class="container mx-auto max-w-6xl">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">All-in-One Platform</h2>
            <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build, manage, and grow your websites in one place.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="feature-card">
              <div class="feature-icon"></div>
              <h3 class="text-xl font-semibold mb-2">Visual Page Builder</h3>
              <p class="text-muted-foreground">Drag and drop elements to create beautiful pages without coding.</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon"></div>
              <h3 class="text-xl font-semibold mb-2">Advanced Analytics</h3>
              <p class="text-muted-foreground">Track visitor behavior, conversion rates, and more with detailed reports.</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon"></div>
              <h3 class="text-xl font-semibold mb-2">Unlimited Pages</h3>
              <p class="text-muted-foreground">Create as many pages as you need, with custom URLs and organization.</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon"></div>
              <h3 class="text-xl font-semibold mb-2">Custom Domains</h3>
              <p class="text-muted-foreground">Connect your own domain for a professional web presence.</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon"></div>
              <h3 class="text-xl font-semibold mb-2">Extensible Plugins</h3>
              <p class="text-muted-foreground">Enhance your site with plugins from our marketplace.</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon"></div>
              <h3 class="text-xl font-semibold mb-2">And Much More...</h3>
              <p class="text-muted-foreground">Discover all the powerful features to help your business grow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section class="py-16 md:py-24 px-4">
        <div class="container mx-auto max-w-4xl text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p class="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of businesses already using DynaScape to build their online presence.
          </p>
          <Show when={isAuthenticated()} fallback={
            <A href="/register" class="btn-primary text-lg px-8 py-3">Start Your Free Trial</A>
          }>
            <A href="/manage" class="btn-primary text-lg px-8 py-3">Go to Dashboard</A>
          </Show>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-muted/30 border-t border-border py-12 px-4">
        <div class="container mx-auto max-w-6xl">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 class="text-lg font-semibold mb-4">Product</h3>
              <ul class="space-y-2">
                <li><A href="#" class="text-muted-foreground hover:text-foreground">Features</A></li>
                <li><A href="#" class="text-muted-foreground hover:text-foreground">Pricing</A></li>
                <li><A href="#" class="text-muted-foreground hover:text-foreground">Testimonials</A></li>
                <li><A href="#" class="text-muted-foreground hover:text-foreground">FAQ</A></li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-4">Company</h3>
              <ul class="space-y-2">
                <li><A href="#" class="text-muted-foreground hover:text-foreground">About</A></li>
                <li><A href="#" class="text-muted-foreground hover:text-foreground">Blog</A></li>
                <li><A href="#" class="text-muted-foreground hover:text-foreground">Careers</A></li>
                <li><A href="#" class="text-muted-foreground hover:text-foreground">Contact</A></li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-4">Resources</h3>
              <ul class="space-y-2">
                <li><A href="#" class="text-muted-foreground hover:text-foreground">Documentation</A></li>
                <li><A href="#" class="text-muted-foreground hover:text-foreground">Help Center</A></li>
                <li><A href="#" class="text-muted-foreground hover:text-foreground">Community</A></li>
                <li><A href="#" class="text-muted-foreground hover:text-foreground">Webinars</A></li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-4">Legal</h3>
              <ul class="space-y-2">
                <li><A href="#" class="text-muted-foreground hover:text-foreground">Privacy Policy</A></li>
                <li><A href="#" class="text-muted-foreground hover:text-foreground">Terms of Service</A></li>
                <li><A href="#" class="text-muted-foreground hover:text-foreground">Cookie Policy</A></li>
                <li><A href="#" class="text-muted-foreground hover:text-foreground">GDPR</A></li>
              </ul>
            </div>
          </div>

          <div class="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
            <p class="text-muted-foreground">&copy; 2025 DynaScape. All rights reserved.</p>
            <div class="flex space-x-4 mt-4 md:mt-0">
              <A href="#" class="text-muted-foreground hover:text-foreground">🐦</A>
              <A href="#" class="text-muted-foreground hover:text-foreground">📘</A>
              <A href="#" class="text-muted-foreground hover:text-foreground">📸</A>
              <A href="#" class="text-muted-foreground hover:text-foreground">💼</A>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
