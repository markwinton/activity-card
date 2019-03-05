import React from 'react';

export default class extends React.Component {
  componentDidMount() {
    const { location } = this.props;
    ga('send', 'pageview', location.pathname);
  }

  render() {
    const { component: Component, ...rest } = this.props;
    return <Component {...rest} />;
  }
}
