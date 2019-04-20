import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { deauthorize } from './service';
import './css/header.css';
import './css/logo.css';

const User = ({ name, onClick, disabled }) => (
  <div className="user">
    <span className="name">{name}</span>
    <button type="button" onClick={onClick} disabled={disabled}>
      Disconnect
    </button>
  </div>
);

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      redirect: null,
      deauthorizing: false,
    };

    this.handleDisconnect = this.handleDisconnect.bind(this);
  }

  handleDisconnect() {
    this.setState({ deauthorizing: true });
    const token = localStorage.getItem('token');
    deauthorize(token)
      .then(() => this.setState({ deauthorizing: false, redirect: '/connect' }))
      .catch(error => this.setState({ deauthorizing: false, error }))
      .finally(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        sessionStorage.removeItem('activities');
      });
  }

  render() {
    const { error, redirect, deauthorizing } = this.state;
    if (error) {
      throw error;
    }
    if (redirect) {
      return <Redirect to={redirect} />;
    }
    const name = 'oiawankjalksjca laklsjh dlkauwlkuahlkuwhd akukjahsd kaj dhwuadkwuhdlakuwhdlakuwhdlak'//localStorage.getItem('name');
    const token = localStorage.getItem('token');
    let user = null;
    if (token) {
      user = <User name={name} onClick={this.handleDisconnect} disabled={deauthorizing} />;
    }
    return (
      <header>
        <Link to="/" className="logo">Activity Card</Link>
        {user}
      </header>
    );
  }
}
