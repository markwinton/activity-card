import React from 'react'
import { HashRouter, Redirect, Route } from 'react-router-dom'
import Header from './header.js'
import Footer from './footer.js'

const Connect = React.lazy(() => import('./connect.js'))
const Create = React.lazy(() => import('./create.js'))
const Contact = React.lazy(() => import('./contact.js'))
const Privacy = React.lazy(() => import('./privacy.js'))
const Error = React.lazy(() => import('./error.js'))

const withHeader = Component => () => {
  return (
    <React.Fragment>
      <Header />
      <Component />
    </React.Fragment>
  )
}

const tokenGuarded = Component => () => {
  return localStorage.getItem('token') ? <Component /> : <Redirect to='/connect' />
}

export default class extends React.Component {
  
  render() {
    return (
      <HashRouter>
        <React.Fragment>
          <React.Suspense fallback={<div />}>
            <Route exact path="/" component={tokenGuarded(withHeader(Create))} />
            <Route path="/connect" component={Connect} />
            <Route path="/contact" component={withHeader(Contact)} />
            <Route path="/privacy" component={withHeader(Privacy)} />
            <Route path="/error" component={withHeader(Error)} />
          </React.Suspense>
          <Footer />
        </React.Fragment>
      </HashRouter>
    )
  }
  
}
