import React from 'react';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Connect from './connect';
import Create from './create';
import Contact from './contact';
import Privacy from './privacy';
import ErrorBoundary from './error';

ga('set', 'anonymizeIp', true);
ga('create', env.GA_TRACKING_ID, 'auto');

const withTracker = Component => class extends React.Component {
  componentDidMount() {
    const { location } = this.props;
    ga('send', 'pageview', location.pathname);
  }

  render() {
    return <Component {...this.props} />;
  }
};

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

const tokenGuarded = Component => (props) => {
  if (localStorage.getItem('token')) {
    return <Component {...props} />;
  }
  return <Redirect to="/connect" />;
};

export default () => (
  <HashRouter>
    <React.Fragment>
      <Route exact path="/" component={tokenGuarded(withErrorBoundary(withTracker(withHeader(withFooter(Create)))))} />
      <Route path="/connect" component={withErrorBoundary(withTracker(withFooter(Connect)))} />
      <Route path="/contact" component={withErrorBoundary(withTracker(withHeader(withFooter(Contact))))} />
      <Route path="/privacy" component={withErrorBoundary(withTracker(withHeader(withFooter(Privacy))))} />
    </React.Fragment>
  </HashRouter>
);
