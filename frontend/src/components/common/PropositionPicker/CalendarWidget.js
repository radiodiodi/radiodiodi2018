import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${p => p.theme.color.pink};
  padding: 0.5rem 1.5rem;
  margin: 0.5rem 0;
  max-width: 400px;
`;

const TitleContainer = styled.div`
  background-color: ${p => p.theme.color.white};
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`;

const Title = styled.h4`
  color: ${p => p.theme.color.dark};
  margin: 0;
`;

const DateContainer = styled.div`

`;

const Date = styled.div`
  cursor: pointer;
  color: ${p => p.theme.color.dark};
  &:hover {
    color: ${p => p.theme.color.white};
  }
`;

const DateRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
`;

const WeekdayRow = styled(DateRow)`
  padding: 0.5rem 0 0;
`;

const Line = styled.hr`
  border: 1px solid;
`;

class CalendarWidget extends Component {
  constructor() {
    super();
    this.renderDate = this.renderDate.bind(this);
  }

  renderDate(date, index) {
    const { onDateSelect } = this.props;
    return <Date key={index} onClick={() => onDateSelect(date)}>{date}</Date>
  }

  renderCalendar() {
    const weekdays = ['ma', 'ti', 'ke', 'to', 'pe', 'la', 'su'].map(this.renderDate);
    const firstRow = [16, 17, 18, 19, 20, 21, 22].map(this.renderDate);
    const secondRow = [23, 24, 25, 26, 27, 28, 29].map(this.renderDate);
    const thirdRow = [30, null, null, null, null, null, null].map(this.renderDate);
    return (
      <Container>
        <TitleContainer>
          <Title>Lähetyskausi</Title>
        </TitleContainer>
        <DateContainer>
          <WeekdayRow>{ weekdays }</WeekdayRow>
          <Line />
          <DateRow>{ firstRow }</DateRow>
          <DateRow>{ secondRow }</DateRow>
          <DateRow>{ thirdRow }</DateRow>
        </DateContainer>
      </Container>
    );
  }

  render() {
    const { show } = this.props;
    return show ? this.renderCalendar() : null;
  }
}

export default CalendarWidget;