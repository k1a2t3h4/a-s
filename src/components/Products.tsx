import type { Component } from 'solid-js';

const Products: Component = () => {
  const products = [
    {
      id: 1,
      name: "Web Development Services",
      description: "Custom web applications built with modern technologies",
      price: "Contact Us",
      features: ["Responsive Design", "SEO Optimized", "Performance Focused"]
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Cross-platform mobile applications for iOS and Android",
      price: "Contact Us",
      features: ["React Native", "Native Performance", "Offline Support"]
    },
    {
      id: 3,
      name: "Consulting Services",
      description: "Expert guidance on technology decisions and architecture",
      price: "Hourly Rate",
      features: ["Technical Review", "Architecture Design", "Performance Audit"]
    }
  ];

  return (
    <div class="products-container">
      <div class="products-header">
        <h1>Our Products & Services</h1>
        <p class="products-subtitle">Discover what we can build for you</p>
      </div>
      
      <div class="products-grid">
        {products.map(product => (
          <div class="product-card">
            <div class="product-header">
              <h3>{product.name}</h3>
              <span class="product-price">{product.price}</span>
            </div>
            <p class="product-description">{product.description}</p>
            <ul class="product-features">
              {product.features.map(feature => (
                <li>{feature}</li>
              ))}
            </ul>
            <button class="product-cta">Learn More</button>
          </div>
        ))}
      </div>
      
      <div class="products-cta">
        <h2>Ready to Get Started?</h2>
        <p>Contact us to discuss your project requirements and get a custom quote.</p>
        <a href="/contact" class="cta-button">Get in Touch</a>
      </div>
    </div>
  );
};

export default Products;
