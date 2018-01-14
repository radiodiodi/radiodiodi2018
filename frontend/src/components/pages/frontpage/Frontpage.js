import React, { Fragment } from 'react';
import styled from 'styled-components';

import ImageGallery from '../../common/ImageGallery';
import Player from '../../common/Player';
import Instagram from '../../common/Instagram';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const Paragraph = styled.div`
  max-width: 60%;
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
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras rhoncus tincidunt lorem ut interdum. 
          Sed gravida in sem quis consectetur. Duis eu lectus rhoncus leo cursus efficitur a et dolor. 
          Fusce lacinia vulputate urna, vel luctus dui rhoncus nec. Ut cursus turpis ac porta gravida. 
          Donec porta pellentesque est, eget vulputate augue fermentum in. Aenean non est in tellus vulputate dapibus nec a velit. 
          Integer egestas suscipit quam, nec tincidunt arcu elementum ac.
          </p>
          <p>
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; 
          Nullam in sapien eget est fermentum finibus sit amet nec nibh. Suspendisse potenti. 
          Vivamus velit risus, auctor non tempus ut, finibus eget dolor. Quisque sollicitudin neque nec metus ornare, 
          finibus vulputate velit tempor. Sed gravida eu turpis et interdum. Aliquam pharetra molestie nibh, 
          in luctus metus auctor eget. Curabitur et magna ut lacus pellentesque rhoncus in et lorem. Quisque ut enim rutrum, 
          finibus quam in, efficitur metus.
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
