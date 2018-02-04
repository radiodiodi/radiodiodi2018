import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import play from '../../svg/play.svg';

const Container = styled.div`
  background-color: ${p => p.theme.color.pink};
  padding: 1rem;
  color: ${p => p.theme.color.dark};

  @media screen and (max-width: 800px) {
    margin: 1rem 0 1rem;
  }
`;

const PlayButton = styled.img`
  width: 3rem;
  padding: 0.5rem 0 0.5rem;
  cursor: pointer;
`;

const Line = styled.p`
  margin: 0;
`;

class Player extends Component {
  static contextTypes = {
    trans: PropTypes.any,
  }

  render() {
    const { trans } = this.context;

    return (
      <Container>
        <Line>{ trans.broadcastended }</Line>
        <PlayButton src={ play } />
        <Line>{ trans.tunein }</Line>
      </Container>
    );
  }
};

export default Player;
