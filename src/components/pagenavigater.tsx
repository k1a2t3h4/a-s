import type { Component } from 'solid-js';
import { A } from '@solidjs/router';

const PageNavigater: Component = () => {
  return (
    <>
      <nav class="navbar">
        <div class="nav-container">
          <div class="nav-logo">
            <A href="/">Astro + SolidJS</A>
          </div>
          <ul class="nav-menu">
            <li><A href="/contact" class="nav-link">Contact</A></li>
            <li><A href="/" class="nav-link">Home</A></li>
            <li><A href="/login" class="nav-link">Login</A></li>
            <li><A href="/register" class="nav-link">Register</A></li>
            <li><A href="/manage" class="nav-link">Manage</A></li>
          </ul>
        </div>
      </nav>
      <style>{`
        .navbar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 1rem 0;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .nav-logo a {
          color: white;
          text-decoration: none;
          font-size: 1.5rem;
          font-weight: bold;
        }
        .nav-menu {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 2rem;
        }
        .nav-link {
          color: white;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          transition: background-color 0.3s ease;
        }
        .nav-link:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
        @media (max-width: 768px) {
          .nav-container { flex-direction: column; gap: 1rem; }
          .nav-menu { gap: 1rem; }
        }
      `}</style>
    </>
  );
};

export default PageNavigater;
