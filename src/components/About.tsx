import type { Component } from 'solid-js';

const About: Component = () => {
  return (
    <div class="about-container">
      <div class="about-header">
        <h1>About Us</h1>
        <p class="about-subtitle">Learn more about our company and mission</p>
      </div>
      
      <div class="about-content">
        <div class="about-section">
          <h2>Our Story</h2>
          <p>
            We are passionate about creating modern web applications that deliver 
            exceptional user experiences. Our team combines the power of Astro's 
            static site generation with SolidJS's reactive components to build 
            fast, scalable, and maintainable applications.
          </p>
        </div>
        
        <div class="about-section">
          <h2>Our Mission</h2>
          <p>
            To demonstrate the capabilities of modern web technologies and provide 
            developers with practical examples of building SPAs with server-side 
            rendering capabilities.
          </p>
        </div>
        
        <div class="about-section">
          <h2>Technology Stack</h2>
          <div class="tech-grid">
            <div class="tech-item">
              <h4>Astro</h4>
              <p>Static site generator with dynamic capabilities</p>
            </div>
            <div class="tech-item">
              <h4>SolidJS</h4>
              <p>Reactive UI library with excellent performance</p>
            </div>
            <div class="tech-item">
              <h4>TypeScript</h4>
              <p>Type-safe development experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
