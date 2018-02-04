import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Countdown from './Countdown';

const SectionContainer = styled.div`
  text-align: center;
  padding: 2rem;
  margin-bottom: 2rem;
  border-top: solid;
  border-bottom: solid;
  border-width: 2px;
  border-color: ${p => p.theme.color.pink};

  @media screen and (max-width: 800px) {
    margin-top: 2rem;
  }
`;

const CD = styled(Countdown)`
  font-size: 1.5rem;
  font-family: monospace;
`;

class CountdownSection extends Component {
  static contextTypes = {
    trans: PropTypes.any,
  }

  render() {
    const { trans } = this.context;
    return (
      <SectionContainer>
        <h2>{ trans.timetoregistration }</h2>
        <CD countTo={'Mon Mar 05 2018 09:00:00 GMT+0200 (EET)'} interval={1000} />
      </SectionContainer>
    );
  }
}

export default CountdownSection;
