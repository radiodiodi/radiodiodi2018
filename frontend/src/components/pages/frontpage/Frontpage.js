import React, { Fragment } from 'react';
import styled from 'styled-components';

import ImageGallery from '../../common/ImageGallery';
import Player from '../../common/Player';
import Instagram from '../../common/Instagram';
import trans from '../../Locale';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const Paragraph = styled.div`
  max-width: 50%;
  @media screen and (max-width: 800px) {
    max-width: 100%;
  }
`;

const PlayerWrapper = styled.div`
  @media screen and (max-width: 800px) {
    order: -1;
  }
`;

function Frontpage() {
  return (
    <Fragment>
      <Container>
        <Paragraph>
          <h3>{ trans.whatisheading }</h3>
          <p>
          { trans.whatis }
          </p>
        </Paragraph>
        <PlayerWrapper>
          <Player />
        </PlayerWrapper>
      </Container>
      <ImageGallery />
      <Instagram />
    </Fragment>
  );
}

export default Frontpage;
