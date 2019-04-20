import React from 'react';
import './css/information.css';

export default () => (
  <section className="privacy-policy information">
    <h1>Privacy Policy</h1>
    <h2>Your Strava Data</h2>
    <p>
      By authorizing Activity Card to connect to your Strava account, you are allowing
      it access to data from your Strava profile and activities. Activity Card accesses
      your data only when you visit this website in order to create a visualization based
      on your Strava activities. Your data is never sold or shared with any third party.
    </p>
    <p>
      You can revoke Activity Card&#39;s access to your Strava data at any time from the My
      Apps section of your Strava account settings.
    </p>
    <h2>Google Analytics</h2>
    <p>
      Activity Card uses Google Analytics in order to track page views and other usage
      information for this website. Your Strava data is not included in this usage
      information, and is never shared with Google.
    </p>
  </section>
);
