import React from 'react';
import { Link } from 'react-router-dom';
import './css/footer.css';

export default () => (
  <footer>
    <Link to="/contact">Contact</Link>
    <Link to="/privacy">Privacy</Link>
  </footer>
);
