import React from 'react';
import { getActivities } from './service';

const Card = React.lazy(() => import('./card'));

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = { hasError: false, error: null };

    this.card = React.createRef();
  }

  exportImage(width, height, callback) {
    this.card.current.exportImage(width, height, callback);
  }

  render() {
    const { hasError, error } = this.state;
    if (hasError) {
      throw error;
    }
    const cachedActivities = sessionStorage.getItem('activities');
    if (!cachedActivities) {
      const { token, before, after } = this.props;
      throw getActivities(token, before, after)
        .then(({ activities }) => sessionStorage.setItem('activities', JSON.stringify(activities)))
        .catch(e => this.setState({ hasError: true, error: e }));
    }
    return <Card activities={JSON.parse(cachedActivities)} ref={this.card} />;
  }
}
