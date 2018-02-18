import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FadeImage from './FadeImage';
import futurice from './../../images/futurice.svg';

const ReelImage = styled(FadeImage)`
  margin: 0 0 2rem;
  align-self: center;
  max-width: 70%;
  text-align: justify;
`;

const Title = styled.small`
  text-align: center;
  color: ${p => p.theme.color.white};
  margin: 0.5rem;
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
    return <Fragment>
      <Title>{ trans.incollaboration }</Title>
      <ReelImage
        src={ image }
      />
    </Fragment>;
  }
}

export default SponsorReel;