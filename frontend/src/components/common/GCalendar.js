import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

const Calendar = styled.iframe`
  border: 0;
`;

const Title = styled.h3`
  margin: 0;
`;

class GCalendar extends Component {
  static contextTypes = {
    trans: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = { width: 0 };
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions = () => {
    this.setState({
      width: window.innerWidth
    });
  }

  render() {
    const { trans } = this.context;
    const { width } = this.state;
    const mode = width < 500 ? '&mode=AGENDA' : '';
    return (
      <Fragment>
        <Title id="calendar">{ trans.preliminarycalendar }</Title>
        <Container>
          <Calendar src={`https://calendar.google.com/calendar/b/4/embed?showCalendars=0${mode}&showTz=0&height=600&wkst=2&hl=fi&bgcolor=%23eee&src=radiodiodi.fi_9g8tojuhcb2dgj82l51sr09jno%40group.calendar.google.com&color=%23691426&ctz=Europe%2FHelsinki`}
            width="90%" 
            height="600" 
            frameborder="0" 
            scrolling="no"
            title="calendar"
          />
        </Container>
      </Fragment>
    )
  }
}

export default GCalendar;