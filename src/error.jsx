import React from 'react';
import { AuthorizationError } from '../error';
import './css/information.css';
import './css/error.css';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error) {
    if (error instanceof AuthorizationError) {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      sessionStorage.removeItem('activities');
    }
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <section className="error information">
          <p>Activity Card is unavailable at the moment. Please try again later.</p>
        </section>
      );
    }
    return children;
  }
}
