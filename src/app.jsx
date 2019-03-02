import React from 'react';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Connect from './connect';
import Create from './create';
import Contact from './contact';
import Privacy from './privacy';
import ErrorBoundary from './error';

const withHeader = Component => () => (
  <React.Fragment>
    <Header />
    <Component />
  </React.Fragment>
);

const tokenGuarded = Component => () => (localStorage.getItem('token') ? <Component /> : <Redirect to="/connect" />);

export default () => (
  <HashRouter>
    <ErrorBoundary>
      <Route exact path="/" component={tokenGuarded(withHeader(Create))} />
      <Route path="/connect" component={Connect} />
      <Route path="/contact" component={withHeader(Contact)} />
      <Route path="/privacy" component={withHeader(Privacy)} />
      <Footer />
    </ErrorBoundary>
  </HashRouter>
);
