import React from 'react';
import { groupBy } from 'lodash';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    }
  }
  componentWillMount() {
    fetch('http://localhost:8080/programmes')
      .then(r => r.json()).then(r => {
        r = r.sort((x, y) => + Date.parse(x.start) - Date.parse(y.start));
        const grouped = groupBy(r, (x) => x.start.substr(8, 2));
        this.setState({
          today: "16",//+ (new Date).getDate(),
          weekdays: ['Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai', 'Sunnuntai'],
          all: grouped,
          ready: true
        });
      });

  }
  render() {
    const { ready, all, today } = this.state;
    if (!ready) return null
    return (
      <div>
        {all[today] && all[today].map(p => (
          <div className="chart-show">
            <small>{p.start.substr(11, 5) + ' - ' + p.end.substr(11, 5)}</small>
            <p>{p.title}</p>
            <p className="chart-description">{p.team}</p>
            <p className="chart-description">{p.description}</p>
          </div>)
        )}
      </div>
    )
  }
}

export default Calendar
