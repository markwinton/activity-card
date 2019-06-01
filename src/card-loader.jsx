import React from 'react';
import { getActivities } from './service';
import Card from './card';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = { error: null };

    this.card = React.createRef();
  }

  exportImage(width, height, callback) {
    this.card.current.exportImage(width, height, callback);
  }

  render() {
    const { error } = this.state;
    if (error) {
      throw error;
    }
    const cachedActivities = sessionStorage.getItem('activities');
    if (!cachedActivities) {
      const { token, before, after } = this.props;
      throw getActivities(token, before, after)
        .then(({ activities }) => sessionStorage.setItem('activities', JSON.stringify(activities)))
        .catch(err => this.setState({ error: err }));
    }
    return <Card activities={JSON.parse(cachedActivities)} ref={this.card} />;
  }
}
