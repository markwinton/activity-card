import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { deauthorize } from './service';
import './css/header.css';
import './css/logo.css';

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
    let user = null;
    const name = localStorage.getItem('name');
    const token = localStorage.getItem('token');
    if (token) {
      user = (
        <span>
          {name}
          {' | '}
          <button type="button" onClick={this.handleDisconnect} disabled={deauthorizing}>
            Disconnect
          </button>
        </span>
      );
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
