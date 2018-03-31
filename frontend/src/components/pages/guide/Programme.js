import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  padding: 0.5rem;
  color: ${p => p.theme.color.white};
`;

const DurationInput = styled.input`
  padding: 0.5rem;
  background-color: ${p => p.theme.color.white};
  margin-left: 1rem;
`;

const InputLabel = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Subtitle = styled.h4`
  color: ${p => p.theme.color.pink};
`;

const AmountContainer = styled.div`
  background-color: ${p => p.theme.color.contrast};
  padding: 1rem;
`;

const Row = styled.div`
  line-height: 1.5rem;
`;

class Programme extends Component {
  static contextTypes = {
    trans: PropTypes.any
  };

  state = {
    duration: 2,
  }

  onInputChange = evt => {
    this.setState({
      duration: evt.target.value,
    });
  }

  calculateAmounts = hours => {
    const { trans } = this.context;

    const calc = perc => {
      const num = perc * hours;
      const wholes = Math.floor(num);
      const decimals = num - wholes;
      const mins = Math.floor(decimals * 60);

      const hoursText = wholes === 1 ? trans.hour : trans.hours;
      const minsText = mins === 1 ? trans.minute : trans.minutes;

      const hourPart = wholes > 0 ? `${wholes} ${hoursText}` : '';
      const minutePart = mins > 0 ? `${mins} ${minsText}`: '';
      return `${hourPart} ${minutePart}`;
    };

    return {
      ads: calc(0.05),
      speech: calc(0.50),
      music: calc(0.35),
      jingles: calc(0.10),
    }
  }

  render() {
    const { trans } = this.context;
    const { duration } = this.state;
    const amounts = this.calculateAmounts(duration);
    return (
      <Container>
        <h3>{ trans.programme }</h3>
        <p>
        { trans.otoprogrammetext }
        </p>
        <InputLabel>
          { trans.programmeduration }
          <DurationInput
            type="number"
            value={duration}
            onChange={this.onInputChange}
            min={0}
          />
        </InputLabel>

        <Subtitle>{trans.programmedurationsubtitle}</Subtitle>
        <AmountContainer>
          <Row>{trans.speech}: {amounts.speech}</Row>
          <Row>{trans.music}: {amounts.music}</Row>
          <Row>{trans.jingles}: {amounts.jingles}</Row>
          <Row>{trans.ads}: {amounts.ads}</Row>
        </AmountContainer>
      </Container>
    );
  }
}

export default Programme;