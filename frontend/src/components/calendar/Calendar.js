import React from 'react';
import styled from 'styled-components'
import { groupBy } from 'lodash';
import Program from './Program'

import dotenv from 'dotenv';
dotenv.config();

const Button = styled.button`
  background-color: ${p => p.theme.color.yellow};
  color: ${p => p.theme.color.dark};
  padding: 0.5rem;
  font-size: 14px;
  border: none;
  &:first-child {
    float: left;
  }
  &:last-child {
    float: right;
  }
  min-width: 100px;
`

const Controls = styled.div`
  margin: 1.5rem 0.5rem;
  text-align: center;
`

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    }
    this.incrementDay = this.incrementDay.bind(this)
    this.decrementDay = this.decrementDay.bind(this)
  }
  incrementDay() {
    this.setState(({ today }) => ({ today: Math.min(30, today + 1) }))
  }
  decrementDay() {
    this.setState(({ today }) => ({ today: Math.max(16, today - 1) }))
  }
  componentWillMount() {
    fetch(`${process.env.REACT_APP_BACKEND_HTTP_URL}/programmes`)
      .then(r => r.json()).then(r => {
        r = r.sort((x, y) => + Date.parse(x.start) - Date.parse(y.start));
        const grouped = groupBy(r, (x) => x.start.substr(8, 2));
        this.setState({
          today: Math.max((new Date).getDate(), 16),
          weekdays: ['Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai', 'Sunnuntai'],
          all: grouped,
          ready: true
        });
      }).catch(e => console.log(e));
  }
  render() {
    const { ready, all, today } = this.state;
    const calendarControls = <Controls>
      <Button onClick={this.decrementDay}>Edellinen</Button>
      <span>{today}.4.2018</span>
      <Button onClick={this.incrementDay}>Seuraava</Button>
    </Controls>
    if (!ready) return null
    return (
      <div>
        <h2>Ohjelmakalenteri</h2>
        {calendarControls}
        {all[today] && all[today].map(p => <Program p={p} key={String(p.start) + String(today)} />)}
        {calendarControls}
      </div>
    )
  }
}

export default Calendar
