import { deauthorize } from './service.js'
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import './css/header.css'
import './css/logo.css'
import './css/disabled.css'

export default class extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      deauthorizing: false,
      redirect: null
    }
    
    this.handleDisconnect = this.handleDisconnect.bind(this)
  }
  
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    let user = null
    const name = localStorage.getItem('name')
    const token = localStorage.getItem('token')
    if (token) {
      user = <span>{name} | <a onClick={this.handleDisconnect} className={ this.state.deauthorizing ? 'disabled' : '' }>Disconnect</a></span>
    }
    return (
      <header>
        <ul>
          <li className="left"><Link to="/" className="logo">Activity Card</Link></li>
          <li className="right">{user}</li>
        </ul>
      </header>
    )
  }
  
  handleDisconnect() {
    this.setState(state => {
      if (state.deauthorizing == false) {
        const token = localStorage.getItem('token')
        deauthorize(token)
          .finally(() => {
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            sessionStorage.removeItem('activities')
            this.setState({ deauthorizing: false, redirect: '/' })
          })
        return { deauthorizing: true }
      }
    })
  }
  
}
