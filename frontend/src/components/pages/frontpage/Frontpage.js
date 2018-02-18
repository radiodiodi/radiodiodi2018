import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ImageGallery from '../../common/ImageGallery';
import Player from '../../common/Player';
import Instagram from '../../common/Instagram';
import SponsorReel from '../../common/SponsorReel';
import CountdownSection from '../../common/CountdownSection';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const Paragraph = styled.div`
  max-width: 50%;
  margin: 0;
  color: ${p => p.theme.color.white};
  @media screen and (max-width: 800px) {
    max-width: 100%;
  }
`;

const PlayerWrapper = styled.div`
  @media screen and (min-width: 800px) {
    margin: 0 0 1rem 1rem;
    margin-top: 4rem;
  }

  @media screen and (max-width: 800px) {
    order: -1;
  }

  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 0;
  height: 4rem;
`;

class Frontpage extends Component {
  static contextTypes = {
    trans: PropTypes.any,
  }

  render() {
    const sponsorInterval = 3000;  // milliseconds
    const { trans } = this.context;

    return (
      <Fragment>
        <CountdownSection />
        <Container>
          <Paragraph>
            <Title>{ trans.whatisheading }</Title>
            { trans.whatis }
          </Paragraph>
          <PlayerWrapper>
            <Player />
            <SponsorReel interval={ sponsorInterval } />
          </PlayerWrapper>
        </Container>
        <ImageGallery />
        <Instagram />
      </Fragment>
    );
  }
}

export default Frontpage;
