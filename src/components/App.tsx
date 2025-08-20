import type { Component } from 'solid-js';
import { Router, Route } from '@solidjs/router';

import { lazy } from 'solid-js';

interface AppProps {
  initialPath?: string;
}
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
const Products = lazy(() => import('./Products'));
const Contact = lazy(() => import('./Contact'));
const App: Component<AppProps> = (props) => {
  return (
    <Router url={props.initialPath}>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/products" component={Products} />
      <Route path="/contact" component={Contact} />
      {/* Catch-all route for any other paths */}
      <Route path="*" component={Home} />
    </Router>
  );
};

export default App;
