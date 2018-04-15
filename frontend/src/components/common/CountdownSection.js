import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SectionContainer = styled.div`
  text-align: center;
  padding: 0 2rem 2rem;
  margin-bottom: 2rem;
  border-bottom: solid;
  border-width: 2px;
  border-color: ${p => p.theme.color.pink};

  @media screen and (max-width: 800px) {
    margin-top: 2rem;
  }
`;

const MonospaceSpan = styled.span`
  width: 15px;
  display: inline-block;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${p => p.theme.color.yellow};
`;

const Header = styled.h2`
  color: ${p => p.theme.color.white};
`;

class CountdownSection extends Component {
  static contextTypes = {
    trans: PropTypes.any,
  };

  toMonospace(text) {
    return text
      .split('')
      .map((letter, i) => <MonospaceSpan key={i}>{letter}</MonospaceSpan>);
  }

  render() {
    const { trans } = this.context;
    return (
      <SectionContainer>
        <Header dangerouslySetInnerHTML={{__html: trans.calendarreleased}}></Header>
      </SectionContainer>
    );
  }
}

export default CountdownSection;
