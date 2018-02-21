import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

import play from '../../svg/play.svg';

const Spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  background-color: ${p => p.theme.color.pink};
  padding: 1rem;
  color: ${p => p.theme.color.dark};

  @media screen and (max-width: 800px) {
    margin: 1rem 0 1rem;
  }

  ${p => p.spinning && `animation: ${Spin} 2s normal forwards ease-in-out`};
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
  constructor() {
    super();
    this.state = {
      spinning: false,
    };
  }

  spin = () => {
    this.setState({
      spinning: true,
    });

    setTimeout(() => this.setState({
        spinning: false,
    }), 2000);
  }

  static contextTypes = {
    trans: PropTypes.any,
  }

  render() {
    const { trans } = this.context;
    const { spinning } = this.state;

    return (
      <Container spinning={spinning} >
        <Line>{ trans.broadcastended }</Line>
        <PlayButton onClick={this.spin} src={ play } />
        <Line>{ trans.tunein }</Line>
      </Container>
    );
  }
};

export default Player;
