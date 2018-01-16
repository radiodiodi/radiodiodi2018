import React, { Component } from 'react';
import styled from 'styled-components';
import FadeImage from './FadeImage';
import sponsor1 from './../../images/sponsor1.png';
import sponsor2 from './../../images/sponsor2.png';

const ReelImage = styled(FadeImage)`
  margin-top: 1rem;
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
      ]
    };

    this.updateCurrent = this.updateCurrent.bind(this);
  }

  componentDidMount() {
    window.setInterval(this.updateCurrent, this.props.interval);
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