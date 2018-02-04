import React, { Component } from 'react';
import styled from 'styled-components';
import FadeImage from './FadeImage';
import sponsor1 from './../../images/sponsor1.png';
import sponsor2 from './../../images/sponsor2.png';

const ReelImage = styled(FadeImage)`
  margin-top: 1rem;
  align-self: center;
  max-width: 100%;
`;

class SponsorReel extends Component {
  constructor() {
    super();
    this.state = {
      current: 0,
      counter: 0,
      images: [
        sponsor1,
        sponsor2,
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