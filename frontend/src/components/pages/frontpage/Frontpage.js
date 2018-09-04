import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ImageGallery from '../../common/ImageGallery';
import Player from '../../common/Player';
import Instagram from '../../common/Instagram';
import SponsorReel from '../../common/SponsorReel';
import Calendar from '../../calendar/Calendar';
import Shoutbox from '../../common/Shoutbox';
import CountdownSection from '../../common/CountdownSection';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const Paragraph = styled.div`
  margin: 0;
  color: ${p => p.theme.color.white};
  @media screen and (max-width: 800px) {
    max-width: 100%;
  }

  @media screen and (min-width: 600px) {
    ${p => p.margin && 'margin-right: 2rem'};
  }
`;

const Paragraph2 = Paragraph.extend`
  margin-bottom: 10px;
  max-width: initial;
  max-width: 800px;
`;

const ColumnContainer = styled.div`
  @media screen and (min-width: 800px) {
    margin: 0 ${p => p.margin ? '2rem' : 0} 1rem 0;
    width: 50%;
  }

  @media screen and (max-width: 800px) {
    order: ${p => p.ontop ? '-1' : null};
  }

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 0;
`;

const ContentRow = styled.div`
  padding: 2rem 0;
  margin: 2rem 0;
  border-top: solid;
  border-width: 2px;
  border-color: ${p => p.theme.color.pink};

  @media screen and (max-width: 800px) {
    margin-top: 2rem;
  }
`;

const ShoutboxTitle = styled.h4`
  margin: 2rem 0 1rem;
  font-size: 1.5rem;
  color: ${p => p.theme.color.white};
`;

class Frontpage extends Component {
  static contextTypes = {
    trans: PropTypes.any
  };

  render() {
    const sponsorInterval = 3000; // milliseconds
    const { trans } = this.context;

    return (
      <Fragment>
        {/* <CountdownSection /> */}
        <Container>
          <ColumnContainer ontop>
            {/* <ShoutboxTitle>{trans.shoutbox}</ShoutboxTitle> */}
            {/* <Shoutbox /> */}
            <Title>{trans.otasuunnistusheading}</Title>
            <Paragraph2 dangerouslySetInnerHTML={{ __html: trans.otasuunnistuspromo }} />
          </ColumnContainer>
          <ColumnContainer>
            <Paragraph margin>
              {/* <Calendar oneDayPreview /> */}
              {/* <Title>{trans.whatisheading}</Title> */}
              {/* {trans.whatis} */}
            </Paragraph>
            {/* <SponsorReel interval={sponsorInterval} /> */}
            <Player />
          </ColumnContainer>
        </Container>
        {/* <Calendar /> */}
        <ContentRow>
        </ContentRow>
        {/* <ContentRow>
          <ImageGallery />
        </ContentRow> */}
        <Instagram />
      </Fragment>
    );
  }
}

export default Frontpage;
