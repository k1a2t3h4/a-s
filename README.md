# Astro + SolidJS SPA Application

A modern Single Page Application built with Astro and SolidJS, featuring server-side rendering and client-side routing.

## Features

- 🚀 **Fast Performance**: Built with Astro for optimal static generation
- ⚡ **Reactive UI**: Interactive components powered by SolidJS
- 🌐 **Universal Rendering**: Server-side rendering with client-side hydration
- 📱 **Responsive Design**: Mobile-first responsive layout
- 🎨 **Modern UI**: Beautiful, accessible design with smooth animations

## Project Structure

```
src/
├── components/          # SolidJS components
│   ├── App.tsx         # Main routing component
│   ├── Home.tsx        # Home page component
│   ├── About.tsx       # About page component
│   ├── Products.tsx    # Products page component
│   └── Contact.tsx     # Contact page component
├── layouts/             # Astro layout components
│   └── Layout.astro    # Main layout with navigation
├── pages/               # Astro pages
│   └── index.astro     # Main entry point
├── styles/              # Global styles
│   └── global.css      # Comprehensive styling
└── assets/              # Static assets
```

## Pages

1. **Home** (`/`) - Welcome page with feature highlights
2. **About** (`/about`) - Company information and technology stack
3. **Products** (`/products`) - Services and product offerings
4. **Contact** (`/contact`) - Contact form and company details

## Technology Stack

- **Astro** - Static site generator with dynamic capabilities
- **SolidJS** - Reactive UI library for interactive components
- **@solidjs/router** - Client-side routing solution
- **TypeScript** - Type-safe development experience

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:4321`

### Building

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Routing Implementation

This application uses SolidJS Router for client-side navigation:

```tsx
import { Router, Routes, Route } from '@solidjs/router';

const App: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/products" component={Products} />
        <Route path="/contact" component={Contact} />
      </Routes>
    </Router>
  );
};
```

## Key Features

### Server-Side Rendering
- All components render on the server for optimal SEO
- Fast initial page loads
- Better accessibility and performance

### Responsive Navigation
- Mobile-friendly navigation menu
- Smooth transitions and hover effects
- Consistent branding across all pages

### Component Architecture
- Modular, reusable components
- Clean separation of concerns
- Easy to maintain and extend

## Customization

### Adding New Pages
1. Create a new component in `src/components/`
2. Add the route to `App.tsx`
3. Add navigation link in `Layout.astro`

### Styling
- Global styles are in `src/styles/global.css`
- Component-specific styles can be added inline or in separate CSS files
- Uses CSS Grid and Flexbox for modern layouts

### Content
- Update component content directly in the TSX files
- Modify the navigation menu in `Layout.astro`
- Customize colors and themes in the CSS file

## Performance Optimizations

- Astro's static generation for fast initial loads
- SolidJS's fine-grained reactivity for efficient updates
- Optimized CSS with minimal reflows
- Responsive images and lazy loading support

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
