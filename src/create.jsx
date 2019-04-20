import moment from 'moment';
import React from 'react';
import Card from './card-loader';
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
    };

    this.card = React.createRef();
    this.downloadLink = React.createRef();

    this.handleSave = this.handleSave.bind(this);

    this.before = moment().unix();
    this.after = moment().subtract(1, 'year').startOf('day').unix();

    this.token = localStorage.getItem('token');
  }

  handleSave() {
    this.setState({ exporting: true });
    this.card.current.exportImage(EXPORT_SIZE, EXPORT_SIZE, (blob) => {
      const url = URL.createObjectURL(blob);

      this.downloadLink.current.href = url;
      this.downloadLink.current.download = 'card.png';
      this.downloadLink.current.click();
      this.setState({ exporting: false });

      ga('send', 'event', 'Card', 'share', 'sunflower', EXPORT_SIZE);

      // prevent url being revoked before download finished
      setTimeout(() => URL.revokeObjectURL(url), 0);
    });
  }

  render() {
    const { exporting } = this.state;
    return (
      <section className="create">
        <React.Suspense fallback={<Placeholder />}>
          <Card token={this.token} before={this.before} after={this.after} ref={this.card} />
          <div className="controls">
            <a href="https://www.strava.com/athlete/calendar/2019" className="view-on-strava">View on Strava</a>
            <button type="button" onClick={this.handleSave} disabled={exporting}>
              Save Image
            </button>
          </div>
          <a href="/" ref={this.downloadLink}>save</a>
        </React.Suspense>
      </section>
    );
  }
}
