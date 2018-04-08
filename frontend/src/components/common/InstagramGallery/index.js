import React, { Fragment, PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import FadeImage from '../FadeImage';
import ImageContainer from './ImageContainer';

const Card = styled.a`
  align-self: flex-start;
  text-decoration: none;
  margin: 0.5rem;

  margin-left: ${p => p.error ? 'auto' : ''};
  margin-right: ${p => p.error ? 'auto' : ''};

  padding: 0.5rem;
  background-color: ${p => p.theme.color.contrast};
  width: calc(100% - 2rem);

  @media screen and (min-width: 600px) {
    width: calc((100% - 4rem) / 2);
  }

  @media screen and (min-width: 1000px) {
    width: calc((100% - 6rem) / 3);
  }
`;

const Image = styled(FadeImage)`
  max-width: 100%;
  margin-bottom: 1rem;
`;

const Caption = styled.div`
  text-overflow: ellipsis;
  width: 100%;
  color: ${p => p.theme.color.white};
`;

const Text = styled.span`
`;

class InstagramGallery extends PureComponent {
  static propTypes = {
    objs: PropTypes.arrayOf(PropTypes.any),
    error: PropTypes.bool,
  }

  static contextTypes = {
    trans: PropTypes.any,
  }

  shortenText = text => {
    /* Take N first whole words, where N is the amount of words below 100 characters total */
    const MAX_CHAR_LENGTH = 100;
    return text.length < MAX_CHAR_LENGTH
      ? text
      : `${text.split(' ').slice(0, text.substring(0, MAX_CHAR_LENGTH).split(' ').length - 1).join(' ')}...`;
  }

  render() {
    const { objs, error } = this.props;
    const { trans } = this.context;

    const images = !error
      ? objs.map((obj, index) =>
        <Card key={index} href={ obj.link }>
          <Image alt={ trans.instagramimage } src={ obj.img } />
          <Caption>
            <Text>{ this.shortenText(obj.text) }</Text>
          </Caption>
        </Card>
      ) : (
        <Card error>
          <Text>{ trans.failedtoloadimages }</Text>
        </Card>
      );

    return (
      <Fragment>
        <h2>{ trans.instagramfeed }</h2>
        <ImageContainer images={ images } />
      </Fragment>
    );
  }
}

export default InstagramGallery;