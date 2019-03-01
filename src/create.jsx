import moment from 'moment';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Card from './card-loader';
import { AuthorizationError } from './service';
import './css/card.css';
import './css/create.css';
import './css/view-on-strava.css';
import './css/indicator.css';

const EXPORT_SIZE = 2048;

const Placeholder = () => (
  <div className="card">
    <div className="indicator" />
  </div>
);

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exporting: false,
      redirect: null,
    };

    this.card = React.createRef();
    this.downloadLink = React.createRef();

    this.handleSave = this.handleSave.bind(this);

    this.before = moment().unix();
    this.after = moment().subtract(1, 'year').startOf('day').unix();

    this.token = localStorage.getItem('token');
  }

  componentDidCatch(error) {
    if (error instanceof AuthorizationError) {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      sessionStorage.removeItem('activities');
      this.setState({ redirect: '/' });
    } else {
      this.setState({ redirect: '/error' });
    }
  }

  handleSave() {
    this.setState({ exporting: true });
    this.card.current.exportImage(EXPORT_SIZE, EXPORT_SIZE, (url) => {
      this.downloadLink.current.href = url;
      this.downloadLink.current.download = 'card.png';
      this.downloadLink.current.click();
      this.setState({ exporting: false });
    });
  }

  render() {
    const { redirect, exporting } = this.state;
    if (redirect) {
      return <Redirect to={redirect} />;
    }
    return (
      <section className="create">
        <React.Suspense fallback={<Placeholder />}>
          <Card token={this.token} before={this.before} after={this.after} ref={this.card} />
          <div className="controls">
            <ul>
              <li><a href="https://www.strava.com/athlete/calendar/2019" className="view-on-strava">View on Strava</a></li>
              <li><button type="button" onClick={this.handleSave} disabled={exporting}>Save Image</button></li>
            </ul>
          </div>
          <a href="/" ref={this.downloadLink}>save</a>
        </React.Suspense>
      </section>
    );
  }
}
