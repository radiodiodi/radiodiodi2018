import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ImageGallery from '../../common/ImageGallery';
import Player from '../../common/Player';
import Instagram from '../../common/Instagram';
import SponsorReel from '../../common/SponsorReel';
import GCalendar from '../../common/GCalendar';
import Calendar from '../../calendar/Calendar';
import Shoutbox from '../../common/Shoutbox';

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
`;

const Paragraph2 = Paragraph.extend`
  margin-bottom: 10px;
  max-width: initial;
  max-width: 800px;
`;

const ColumnContainer = styled.div`
  @media screen and (min-width: 800px) {
    margin: 0 ${p => p.margin ? '2rem' : 0}; 1rem 1rem;
  }

  @media screen and (max-width: 800px) {
    order: -1;
  }

  ${p => p.margin && 'margin-right: 2rem'};

  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 0;
  height: 4rem;
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
        <Container>
          <ColumnContainer margin>
            <Paragraph>
              <Title>{trans.whatisheading}</Title>
              {trans.whatis}
            </Paragraph>
            <SponsorReel interval={sponsorInterval} />
          </ColumnContainer>
          <ColumnContainer>
            <Player />
            <ShoutboxTitle>{trans.shoutbox}</ShoutboxTitle>
            <Shoutbox />
          </ColumnContainer>
        </Container>
        <Calendar />
        <ContentRow>
          <Title>{trans.radioprogramheading}</Title>
          <Paragraph2>{trans.radioprogramparagraph1}</Paragraph2>
          <Paragraph2>{trans.radioprogramparagraph2}</Paragraph2>
        </ContentRow>
        <ContentRow>
          <GCalendar />
        </ContentRow>
        <ContentRow>
          <ImageGallery />
        </ContentRow>
        <Instagram />
      </Fragment>
    );
  }
}

export default Frontpage;
