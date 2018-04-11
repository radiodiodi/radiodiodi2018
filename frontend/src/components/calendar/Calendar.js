import React from 'react';
import styled from 'styled-components'
import { groupBy } from 'lodash';
import { shortenText } from '../../utils'

const Program = styled.div`
  background-color: ${p => p.theme.color.pink};
  color: ${p => p.theme.color.dark};
  padding: 0.5rem;
  margin: 0.5rem;
  min-height: 170px;
`

const ImagePlaceholder = styled.div`
  height: 150px;
  width: 150px;
  float: right;
  background-color: ${p => p.theme.color.dark};
`

const Img = ImagePlaceholder.withComponent('img')

const Button = styled.button`
  background-color: ${p => p.theme.color.pink};
  color: ${p => p.theme.color.dark};
  padding: 0.5rem;
  font-size: 14px;
  border: none;
`

const Title = styled.h4`
  margin: 0.5rem 0;
  font-size: 18px;
  border-bottom: 1px solid ${p => p.theme.color.dark};
`

const Author = styled.p`
  margin: 0.5rem 0;
`

const P = styled.p`
  font-size: 12px;
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
    this.setState(({ today }) => ({ today: today + 1 }))
  }
  decrementDay() {
    this.setState(({ today }) => ({ today: today - 1 }))
  }
  componentWillMount() {
    fetch('http://localhost:8080/programmes')
      .then(r => r.json()).then(r => {
        r = r.sort((x, y) => + Date.parse(x.start) - Date.parse(y.start));
        const grouped = groupBy(r, (x) => x.start.substr(8, 2));
        this.setState({
          today: Math.max((new Date).getDate(), 16),
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
        <h2>Ohjelmakalenteri</h2>
        <Button onClick={this.decrementDay}>Edellinen</Button>
        <span>{today}.4.2018</span>
        <Button onClick={this.incrementDay}>Seuraava</Button>
        {all[today] && all[today].map(p => (
          <Program>
            {p.image
              ? <Img src={`https://radiodiodi.fi/static/img/${p.image}`} />
              : <ImagePlaceholder />}
            <small>{p.start.substr(11, 5) + ' - ' + p.end.substr(11, 5)}</small>
            <Title>{p.title}</Title>
            <Author>{p.team}</Author>
            {p.description && <P>{shortenText(p.description, 200)}</P>}
          </Program>)
        )}
      </div>
    )
  }
}

export default Calendar
