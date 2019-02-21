import React from 'react'
import { Link } from 'react-router-dom'
import './css/footer.css'

export default class extends React.Component {

  render() {
    return (
      <footer>
        <ul>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/privacy">Privacy</Link></li>
        </ul>
      </footer>
    )
  }
  
}
