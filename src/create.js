import moment from 'moment'
import React from 'react'
import { Redirect } from 'react-router-dom'
import Card from './card-loader.js'
import './css/card.css'
import './css/create.css'
import './css/view-on-strava.css'
import './css/disabled.css'
import './css/indicator.css'

const Placeholder = props => (
  <div className="card">
    <div className="indicator" />
  </div>
)

export default class extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      exporting: false,
      redirect: null
    }
    
    this.card = React.createRef()
    this.downloadLink = React.createRef()
    
    this.handleSave = this.handleSave.bind(this)
    
    this.before = moment().unix()
    this.after = moment().subtract(1, 'year').startOf('day').unix()
    
    this.token = localStorage.getItem('token')
  }

  componentDidCatch(error) {
    if (error == 'unauthorized') {
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      sessionStorage.removeItem('activities')
      this.setState({ redirect: '/' })
    } else {
      this.setState({ redirect: '/error' })
    }
  }
  
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <section className="create">
        <React.Suspense fallback={<Placeholder />}>
          <Card token={this.token} before={this.before} after={this.after} ref={this.card} />
          <div className="controls">
            <ul>
              <li><a href="https://www.strava.com/athlete/calendar/2019" className="view-on-strava">View on Strava</a></li>
              <li><a onClick={this.handleSave} className={ this.state.exporting ? 'disabled' : '' }>Save Image</a></li>
            </ul>
          </div>
          <a ref={this.downloadLink}></a>
        </React.Suspense>
      </section>
    )
  }
  
  handleSave() {
    this.setState(state => {
      if (state.exporting == false) {
        this.card.current.exportImage(2048, 2048, url => {
          this.downloadLink.current.href = url
          this.downloadLink.current.download = "card.png"
          this.downloadLink.current.click()
          this.setState({ exporting: false })
        })
        return { exporting: true }
      }
    })
  }
                      
}
    