import React from 'react';
import './css/information.css';
import './css/contact.css';

export default () => (
  <section className="contact information">
    <h1>Contact</h1>
    <p className="name">Mark Winton</p>
    <p className="email"><a href="mailto:winton.mark@icloud.com?subject=Activity%20Card">winton.mark@icloud.com</a></p>
    <p>
      Feel free to reach out on
      <a href="https://www.linkedin.com/in/markwinton"> LinkedIn</a>
      , or follow me on
      <a href="https://www.strava.com/athletes/markwinton"> Strava</a>
      .
    </p>
  </section>
);
