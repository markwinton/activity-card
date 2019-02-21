import React from 'react'
import './css/information.css'
import './css/privacy-policy.css'

export default class extends React.Component {
  
  render() {
    return (
      <section className="privacy-policy information">
        <h1>Privacy Policy</h1>
        <h2>Your Strava Data</h2>
        <p>By authorizing Activity Card to connect to your Strava account, you are allowing it access to data from your Strava profile and activities. Activity Card accesses your data only when you visit this website in order to create a visualization based on your Strava activities. Your data is never sold or shared with any third party.</p>
        <p>You can revoke Activity Card's access to your Strava data at any time from the My Apps section of your Strava account settings.</p>
      </section>
    )
  }
  
}
