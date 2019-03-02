import React from 'react';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Connect from './connect';
import Create from './create';
import Contact from './contact';
import Privacy from './privacy';
import ErrorBoundary from './error';

const withHeader = Component => props => (
  <React.Fragment>
    <Header />
    <Component {...props} />
  </React.Fragment>
);

const withErrorBoundary = Component => props => (
  <ErrorBoundary>
    <Component {...props} />
  </ErrorBoundary>
);

const tokenGuarded = Component => () => (localStorage.getItem('token') ? <Component /> : <Redirect to="/connect" />);

export default () => (
  <HashRouter>
    <React.Fragment>
      <Route exact path="/" component={tokenGuarded(withErrorBoundary(withHeader(Create)))} />
      <Route path="/connect" component={withErrorBoundary(Connect)} />
      <Route path="/contact" component={withErrorBoundary(withHeader(Contact))} />
      <Route path="/privacy" component={withErrorBoundary(withHeader(Privacy))} />
      <Footer />
    </React.Fragment>
  </HashRouter>
);
