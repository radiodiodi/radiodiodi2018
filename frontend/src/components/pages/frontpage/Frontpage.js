import React, { Fragment } from 'react';
import styled from 'styled-components';

import ImageGallery from '../../common/ImageGallery';
import Player from '../../common/Player';
import Instagram from '../../common/Instagram';
import trans from '../../Locale';
import SponsorReel from '../../common/SponsorReel';
import CountdownSection from '../../common/CountdownSection';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const Paragraph = styled.p`
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
  }

  @media screen and (max-width: 800px) {
    order: -1;
  }

  display: flex;
  justify-content: center;
  flex-direction: column;
`;

function Frontpage() {
  return (
    <Fragment>
      <h3>{trans.whatisheading}</h3>
      <Container>
        <Paragraph>{trans.whatis}</Paragraph>
        <PlayerWrapper>
          <Player />
          <SponsorReel interval={3000} />
        </PlayerWrapper>
      </Container>
      <CountdownSection />
      <ImageGallery />
      <Instagram />
    </Fragment>
  );
}

export default Frontpage;
