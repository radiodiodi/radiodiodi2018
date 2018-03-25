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
    const calc = perc => Number(perc * hours).toFixed(1);

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
          <DurationInput value={duration} onChange={this.onInputChange} />
        </InputLabel>

        <Subtitle>{trans.programmedurationsubtitle}</Subtitle>
        <AmountContainer>
          <Row>{trans.speech}: {amounts.speech} {trans.hours}</Row>
          <Row>{trans.music}: {amounts.music} {trans.hours}</Row>
          <Row>{trans.jingles}: {amounts.jingles} {trans.hours}</Row>
          <Row>{trans.ads}: {amounts.ads} {trans.hours}</Row>
        </AmountContainer>
      </Container>
    );
  }
}

export default Programme;