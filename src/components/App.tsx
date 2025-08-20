import type { Component } from 'solid-js';
import { Router, Route } from '@solidjs/router';
import { AuthProvider } from './contexts/AuthContext';
import { lazy, Suspense } from 'solid-js';

interface AppProps {
  initialPath?: string;
}
const Home = lazy(() => import('./Home'));
const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const Manage = lazy(() => import('./Manage'));
const NotFound = lazy(() => import('./NotFound'));
const App: Component<AppProps> = (props) => {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
      <Router url={props.initialPath}>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/manage" component={Manage} />
      <Route path="*" component={NotFound} />
    </Router>
    </Suspense>
    </AuthProvider>
  );
};

export default App;
