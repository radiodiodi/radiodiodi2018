import React from 'react';
import styled from 'styled-components';
import play from '../../svg/play.svg';

const Container = styled.div`
  background-color: red;
  padding: 1rem;
  margin: 1rem;
  color: ${p => p.theme.color.dark};
`;

const PlayButton = styled.img`
  width: 4rem;
`;

const Line = styled.p`
  margin: 0;
`;

class Player extends React.Component {
  render() {
    return (
      <Container>
        <Line>Äänessä Mouhomaanantai</Line>
        <Line>Puhutaan tekstieditoreista</Line>
        <PlayButton src={ play } />
        <Line>Nyt soi: DJ Tan Juomi – Psykoosi Louhoksella</Line>
      </Container>
    );
  }
};

export default Player;
