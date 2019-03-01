import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { deauthorize } from './service';
import './css/header.css';
import './css/logo.css';

const User = ({ name, onClick, disabled }) => (
  <span>
    {name}
    {' | '}
    <button type="button" onClick={onClick} disabled={disabled}>
      Disconnect
    </button>
  </span>
);

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deauthorizing: false,
      redirect: null,
    };

    this.handleDisconnect = this.handleDisconnect.bind(this);
  }

  handleDisconnect() {
    this.setState({ deauthorizing: true });
    const token = localStorage.getItem('token');
    deauthorize(token)
      .finally(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        sessionStorage.removeItem('activities');
        this.setState({ deauthorizing: false, redirect: '/' });
      });
  }

  render() {
    const { redirect, deauthorizing } = this.state;
    if (redirect) {
      return <Redirect to={redirect} />;
    }
    const name = localStorage.getItem('name');
    const token = localStorage.getItem('token');
    let user = null;
    if (token) {
      user = <User name={name} onClick={this.handleDisconnect} disabled={deauthorizing} />;
    }
    return (
      <header>
        <ul>
          <li className="left"><Link to="/" className="logo">Activity Card</Link></li>
          <li className="right">{user}</li>
        </ul>
      </header>
    );
  }
}
