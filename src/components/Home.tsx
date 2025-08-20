import type { Component } from 'solid-js';

const Home: Component = () => {
  return (
    <div class="home-container">
      <div class="hero-section">
        <h1>Welcome to Our SPA Application</h1>
        <p class="hero-subtitle">
          Built with Astro + SolidJS for optimal performance and developer experience
        </p>
        <div class="hero-features">
          <div class="feature-card">
            <h3>🚀 Fast</h3>
            <p>Lightning-fast performance with Astro's static generation</p>
          </div>
          <div class="feature-card">
            <h3>⚡ Reactive</h3>
            <p>Interactive UI components with SolidJS</p>
          </div>
          <div class="feature-card">
            <h3>🌐 Universal</h3>
            <p>Server-side rendering with client-side hydration</p>
          </div>
        </div>
      </div>
      
      <div class="content-section">
        <h2>Getting Started</h2>
        <p>
          This is a sample Single Page Application built using Astro and SolidJS. 
          The routing is handled by SolidJS Router, providing a smooth navigation experience.
        </p>
        <p>
          Navigate between pages using the navigation menu above. Each page demonstrates 
          different aspects of the application.
        </p>
      </div>
    </div>
  );
};

export default Home;
