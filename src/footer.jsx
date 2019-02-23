import React from 'react';
import { Link } from 'react-router-dom';
import './css/footer.css';

export default () => (
  <footer>
    <ul>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/privacy">Privacy</Link></li>
      <li><a href="https://github.com/markwinton/activity-card">GitHub</a></li>
    </ul>
  </footer>
);
