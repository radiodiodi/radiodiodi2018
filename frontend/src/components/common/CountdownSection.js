import React from 'react';
import styled from 'styled-components';
import Countdown from './Countdown';
import trans from '../Locale';

const SectionContainer = styled.div`
  text-align: center;
  padding: 2rem;
  margin-bottom: 2rem;
  border-top: solid;
  border-bottom: solid;
  border-width: 2px;
  border-color: ${p => p.theme.color.pink};
`;

const CD = styled(Countdown)`
  font-size: 1.5rem;
  font-family: monospace;
`;

function CountdownSection() {
  return (
    <SectionContainer>
      <h2>{trans.timetoregistration}</h2>
      <CD countTo={'Mon Mar 05 2018 09:00:00 GMT+0200 (EET)'} interval={1000} />
    </SectionContainer>
  );
}

export default CountdownSection;
