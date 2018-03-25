import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

const Widget = styled.select`
  padding: 0.5rem 1rem;
  background-color: ${p => p.theme.color.white};
  color: ${p => p.theme.color.dark};
  user-select: none;
  font-family: monospace;
  font-size: 1rem;
  line-height: 1.3rem;

  border-radius: 0;
  appearance: none;
`;

const leftPad = n => n >= 10 ? `${n}` : `0${n}`;

class TimePicker extends Component {
  render() {
    const { time, onChange } = this.props;
    const times = [...Array(24).keys()].map((n, i) => {
      const time = `${leftPad(n)}:00`;
      return <option key={i} value={time}>{time}</option>;
    });
    return (
      <Fragment>
        <Widget onChange={onChange} value={ time || '--:--' }>
          { times }
        </Widget>
      </Fragment>
    );
  }
}

export default TimePicker;