import type { Component } from 'solid-js';
import { Router, Route } from '@solidjs/router';
import { AuthProvider } from './contexts/AuthContext';
import { lazy, Suspense } from 'solid-js';
import PageNavigater from './pagenavigater';

interface AppProps {
  initialPath?: string;
}
const Home = lazy(() => import('./Home'));
const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const Manage = lazy(() => import('./Manage'));
const Contect = lazy(() => import('./Contect'));

const HomeWithNav: Component = () => (<><PageNavigater /><Home /></>);
const LoginWithNav: Component = () => (<><PageNavigater /><Login /></>);
const RegisterWithNav: Component = () => (<><PageNavigater /><Register /></>);
const ContactWithNav: Component = () => (<><PageNavigater /><Contect /></>);

const App: Component<AppProps> = (props) => {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Router url={props.initialPath}>
          <Route path="/" component={HomeWithNav} />
          <Route path="/login" component={LoginWithNav} />
          <Route path="/register" component={RegisterWithNav} />
          <Route path="/contact" component={ContactWithNav} />
          <Route path="/manage" component={Manage} />
        </Router>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
