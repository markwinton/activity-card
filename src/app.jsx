import './attribution';
import './css/open-sans.css';
import './css/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Connect from './connect';
import Create from './create';
import Contact from './contact';
import Privacy from './privacy';
import ErrorBoundary from './error-boundary';
import AuthorizationBoundary from './authorization-boundary';

const withHeader = Component => props => (
  <React.Fragment>
    <Header />
    <Component {...props} />
  </React.Fragment>
);

const withFooter = Component => props => (
  <React.Fragment>
    <Component {...props} />
    <Footer />
  </React.Fragment>
);

const withAuthorizationBoundary = Component => props => (
  <AuthorizationBoundary>
    <Component {...props} />
  </AuthorizationBoundary>
);

const connect = withFooter(Connect);
const create = withAuthorizationBoundary(withHeader(withFooter(Create)));
const contact = withHeader(withFooter(Contact));
const privacy = withHeader(withFooter(Privacy));

const App = () => (
  <ErrorBoundary>
    <HashRouter>
      <React.Fragment>
        <Route exact path="/" component={create} />
        <Route path="/connect" component={connect} />
        <Route path="/contact" component={contact} />
        <Route path="/privacy" component={privacy} />
      </React.Fragment>
    </HashRouter>
  </ErrorBoundary>
);

ReactDOM.render(<App />, document.getElementById('root'));
