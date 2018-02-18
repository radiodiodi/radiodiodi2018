import React, { Component } from 'react';
import styled from 'styled-components';
import FadeImage from './FadeImage';
import futurice from './../../images/futurice.svg';

const ReelImage = styled(FadeImage)`
  margin: 1.5rem 0 2rem;
  align-self: center;
  max-width: 70%;
  text-align: justify;
`;

class SponsorReel extends Component {
  constructor() {
    super();
    this.state = {
      current: 0,
      counter: 0,
      images: [
        futurice,
      ],
    };

    this.updateCurrent = this.updateCurrent.bind(this);
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
    const image = images[current];
    return <ReelImage 
      src={ image }
    />;
  }
}

export default SponsorReel;