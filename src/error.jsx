import React from 'react';
import { AuthorizationError } from '../error';
import './css/information.css';
import './css/error.css';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
    };
  }

  componentDidCatch(error) {
    if (error instanceof AuthorizationError) {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      sessionStorage.removeItem('activities');
    }
    this.setState({ error: true });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error) {
      return (
        <section className="error information">
          <p>Activity Card is unavailable at the moment. Please try again later.</p>
        </section>
      );
    }
    return children;
  }
}
