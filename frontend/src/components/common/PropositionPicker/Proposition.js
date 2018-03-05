import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import CalendarWidget from './CalendarWidget';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import cross from '../../../images/cross.png';

const PropositionRow = styled.span`
  background-color: ${p => p.theme.color.pink};
  padding: 0.5rem;
  margin-bottom: 1rem;

  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 0.5rem;
  flex: ${p => p.flex && '1' || '0.5'};
  @media screen and (max-width: 600px) {
    margin-top: 0.5rem;
  }
`;

const Label = styled.label`
  font-size: 0.9rem;
`;

const RemoveButton = styled.img`
  max-width: 30px;
  margin: 0.5rem;
  align-self: center;
  cursor: pointer;
`;

class Proposition extends Component {
  constructor() {
    super();
    this.onDatePickerClick = this.onDatePickerClick.bind(this);
    this.onDateSelect = this.onDateSelect.bind(this);
    this.onStartTimeChange = this.onStartTimeChange.bind(this);
    this.onEndTimeChange = this.onEndTimeChange.bind(this);
    this.remove = this.remove.bind(this);
  }

  state = {
    showCalendar: false,
  }

  onDatePickerClick() {
    this.setState({
      showCalendar: !this.state.showCalendar,
    });
  }

  onDateSelect(date) {
    const d = `${date}.04.2018`;
    const { handler, id, startTime, endTime } = this.props;
    this.setState({
      showCalendar: false,
    });

    handler({
      [id]: { date: d, startTime, endTime },
    });
  }

  onStartTimeChange(event) {
    const startTime = event.target.value;
    const { handler, id, date, endTime } = this.props;
    handler({
      [id]: { date, startTime, endTime },
    });
  }

  onEndTimeChange(event) {
    const endTime = event.target.value;
    const { handler, id, date, startTime } = this.props;
    handler({
      [id]: { date, startTime, endTime },
    });
  }

  remove() {
    const { handler, id } = this.props;
    handler({
      [id]: undefined,
    });
  }

  render() {
    const { showCalendar } = this.state;
    const { date, startTime, endTime } = this.props;
    return (
      <Fragment>
        <PropositionRow>
          <Column flex>
            <Label>Päivämäärä</Label>
            <DatePicker onClick={this.onDatePickerClick} date={ date } />
          </Column>
          <Column>
            <Label>Ensimmäinen sopiva aloituskellonaika</Label>
            <TimePicker onChange={this.onStartTimeChange} time={ startTime } />
          </Column>
          <Column>
            <Label>Viimeinen sopiva lopetuskellonaika</Label>
            <TimePicker onChange={this.onEndTimeChange} time={ endTime } />
          </Column>
          <RemoveButton onClick={this.remove} src={ cross } />
        </PropositionRow>
        <CalendarWidget onDateSelect={this.onDateSelect} show={showCalendar} />
      </Fragment>
    );
  }
}

export default Proposition;