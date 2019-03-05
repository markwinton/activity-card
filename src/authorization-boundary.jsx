import React from 'react';
import { Redirect } from 'react-router-dom';
import { AuthorizationError } from '../error';
import './css/information.css';
import './css/error.css';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  componentDidCatch(error) {
    if (error instanceof AuthorizationError) {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      sessionStorage.removeItem('activities');
      this.setState({ error });
    } else {
      throw error;
    }
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error || !localStorage.getItem('token')) {
      return <Redirect to="/connect" />;
    }
    return children;
  }
}
