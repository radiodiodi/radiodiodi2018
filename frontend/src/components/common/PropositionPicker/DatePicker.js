import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

const Widget = styled.div`
  padding: 0.5rem 1rem;
  background-color: ${p => p.theme.color.white};
  color: ${p => p.theme.color.dark};
  user-select: none;
  font-family: monospace;
`;

class DatePicker extends Component {
  render() {
    const { date, onClick } = this.props;
    return (
      <Fragment>
        <Widget onClick={onClick}>
          { date || '--.--.----' }
        </Widget>
      </Fragment>
    );
  }
}

export default DatePicker;