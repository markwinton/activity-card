import React from 'react';
import { Redirect } from 'react-router-dom';
import { AuthorizationError } from '../error';
import './css/information.css';
import './css/error.css';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      redirect: null,
    };
  }

  componentDidCatch(error) {
    if (error instanceof AuthorizationError) {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      sessionStorage.removeItem('activities');
      this.setState({ redirect: '/' });
    } else {
      this.setState({ error });
    }
  }

  render() {
    const { error, redirect } = this.state;
    const { children } = this.props;
    if (error) {
      return (
        <section className="error information">
          <p>Activity Card is unavailable at the moment. Please try again later.</p>
        </section>
      );
    }
    if (redirect) {
      return <Redirect to={redirect} />;
    }
    return children;
  }
}
