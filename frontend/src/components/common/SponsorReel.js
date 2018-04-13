import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import shuffle from 'shuffle-array';
import FadeImage from './FadeImage';

import futurice from './../../images/futurice.svg';
import vincit from './../../images/vincit.png';
import abb from './../../images/abb.png';
import genelec from './../../images/genelec.png';
import srv from './../../images/srv.png';
import btw from './../../images/btw.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReelImage = styled(FadeImage)`
  align-self: center;
  max-width: 100%;
  max-height: 100%;
  text-align: justify;
`;

const Title = styled.small`
  text-align: center;
  color: ${p => p.theme.color.white};
  margin: 3rem 0.5rem 0.5rem;
`;

const ImageContainer = styled.div`
  height: 100px;
  width: 300px;
  margin: 0 0 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

class SponsorReel extends Component {
  constructor() {
    super();
    this.state = {
      current: 0,
      counter: 0,
      images: shuffle([
        futurice,
        vincit,
        abb,
        genelec,
        srv,
        btw,
      ]),
    };

    this.updateCurrent = this.updateCurrent.bind(this);
  }

  static contextTypes = {
    trans: PropTypes.any,
  }

  componentDidMount() {
    const intervalHandle = window.setInterval(this.updateCurrent, this.props.interval);
    this.setState({
      intervalHandle,
    });
  }

  componentWillUnmount() {
    const { intervalHandle } = this.state;
    window.clearInterval(intervalHandle);
  }

  async updateCurrent() {
    const { counter, images } = this.state;
    this.setState({
      counter: counter + 1,
      current: (counter + 1) % images.length,
    });
  }

  render() {
    const { images, current } = this.state;
    const { trans } = this.context;
    const image = images[current];
    return (
      <Container>
        <Title>{ trans.incollaboration }</Title>
        <ImageContainer>
          <ReelImage
            src={ image }
          />
        </ImageContainer>
      </Container>
    );
  }
}

export default SponsorReel;