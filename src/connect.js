import { authorize } from './service.js'
import { generateToken } from './crypto.js'
import React from 'react'
import { Redirect } from 'react-router-dom'
import queryString from 'query-string'
import ConnectStrava from './images/strava/connect-strava.png'
import Preview from './images/preview.png'
import './css/connect-strava-button.css'
import './css/connect.css'
import './css/indicator.css'

const SCOPE = 'activity:read_all'

const Connect = props => <a onClick={props.onClick}><img src={ConnectStrava} className="connect-strava-button" /></a>

const Authorizing = props => (
  <div className="authorizing">
    <p>Connecting to your Strava account...</p>
    <div className="indicator" />
  </div>
)

export default class extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      redirect: null,
      authorizing: false
    }
    
    this.handleConnect = this.handleConnect.bind(this)
  }
  
  componentDidMount() {
    const query = queryString.parse(this.props.location.search)
    const authorizationCode = query.code
    const authorizationState = query.state
    const authorizationScopes = query.scope ? query.scope.split(',') : []

    if (authorizationCode && authorizationState == sessionStorage.getItem('authorization_state') && authorizationScopes.includes(SCOPE)) {
      this.setState({ authorizing: true })
      authorize(authorizationCode)
        .then(({ token, name }) => {
          localStorage.setItem('token', token)
          localStorage.setItem('name', name)
          this.setState({ authorizing: false, redirect: '/' })
        })
        .catch(error => {
          this.setState({ authorizing: false, redirect: '/error' })
        })
    }
    
    sessionStorage.removeItem('authorization_state')
  }
  
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <section className="connect">
        <img src={Preview} className="preview" />
        <p className="title">Activity Card</p>
        <p className="description">Create a unique visualization based on your Strava activities from the past year.</p>
        { this.state.authorizing ? <Authorizing /> : <Connect onClick={this.handleConnect} /> }
      </section>
    )
  }
  
  handleConnect() {
    const state = generateToken()
    sessionStorage.setItem('authorization_state', state)
    
    const redirect = encodeURIComponent(location.href.split('?')[0])
    
    location.href = `https://www.strava.com/oauth/mobile/authorize?response_type=code&state=${state}&client_id=${env.CLIENT_ID}&redirect_uri=${redirect}&scope=${SCOPE}`
  }
  
}
