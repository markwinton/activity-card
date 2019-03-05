import React from 'react';
import './css/information.css';
import './css/error.css';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({ error });
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
