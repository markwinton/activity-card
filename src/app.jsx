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

const withFooter = Component => props => (
  <React.Fragment>
    <Component {...props} />
    <Footer />
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
      <Route exact path="/" component={tokenGuarded(withErrorBoundary(withHeader(withFooter(Create))))} />
      <Route path="/connect" component={withErrorBoundary(withFooter(Connect))} />
      <Route path="/contact" component={withErrorBoundary(withHeader(withFooter(Contact)))} />
      <Route path="/privacy" component={withErrorBoundary(withHeader(withFooter(Privacy)))} />
    </React.Fragment>
  </HashRouter>
);
