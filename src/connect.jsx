import React from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import generateToken from './generate-token';
import { authorize } from './service';
import Preview from './images/preview.png';
import './css/connect-strava.css';
import './css/connect.css';
import './css/indicator.css';

const SCOPE = 'activity:read_all';

const connect = () => {
  const state = generateToken();
  localStorage.setItem('authorization_state', state);

  const redirect = encodeURIComponent(window.location.href.split('?')[0]);

  window.location.href = `https://www.strava.com/oauth/authorize?response_type=code&state=${state}&client_id=${env.CLIENT_ID}&redirect_uri=${redirect}&scope=${SCOPE}`;
};

const ConnectButton = ({ onClick }) => (
  <button type="button" onClick={onClick}>
    <img src={`${env.ASSETS_URL}/connect-strava.png`} className="connect-strava" alt="Connect with Strava" />
  </button>
);

const Authorizing = () => (
  <div className="authorizing">
    <p>Connecting to your Strava account...</p>
    <div className="indicator" />
  </div>
);

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      redirect: null,
      authorizing: false,
    };
  }

  componentDidMount() {
    const { location: { search } } = this.props;
    const { code, state, scope } = queryString.parse(search);
    const scopes = scope ? scope.split(',') : [];

    if (code && state === localStorage.getItem('authorization_state') && scopes.includes(SCOPE)) {
      this.setState({ authorizing: true });
      authorize(code)
        .then(({ token, name }) => {
          localStorage.setItem('token', token);
          localStorage.setItem('name', name);
          this.setState({ authorizing: false, redirect: '/' });
        })
        .catch(error => this.setState({ authorizing: false, error }));
    }

    localStorage.removeItem('authorization_state');
  }

  render() {
    const { error, redirect, authorizing } = this.state;
    if (error) {
      throw error;
    }
    if (redirect) {
      return <Redirect to={redirect} />;
    }
    return (
      <section className="connect">
        <img src={Preview} className="preview" alt="" />
        <p className="title">Activity Card</p>
        <p className="description">Create a unique visualization based on your Strava activities from the past year.</p>
        {authorizing ? <Authorizing /> : <ConnectButton onClick={connect} />}
      </section>
    );
  }
}
