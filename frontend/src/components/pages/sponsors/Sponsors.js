import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Quote = styled.p`
    text-align: center;
    font-style: italic;
`;

const Source = styled.p`
    text-align: right;
    margin-right: 5rem;
`;

const Image = styled.img`
  float: ${p => p.float};
  margin-top: 0;
  margin-bottom: 1rem;
  margin-left: ${p => p.float === 'right' ? '1rem' : '0'};
  margin-right: ${p => p.float === 'left' ? '1rem' : '0'};
`;

const Paragraph = styled.p`
  text-align: justify;
`;

class Sponsors extends Component {
  static contextTypes = {
    trans: PropTypes.any,
  }

  render() {
    const { trans } = this.context;

    return (
      <Fragment>
        <Quote>{ trans.ancientromansquote }</Quote>
        <Source>— Radiodiodi</Source>

        <Image float="left" src="https://placehold.it/200x200" />
        <Paragraph>
        Ullamco commodo dolor consectetur irure reprehenderit anim irure aliqua. Esse eu irure ipsum dolor irure laborum quis amet id sit laborum elit velit amet. Deserunt consequat in anim laboris fugiat. Esse est laboris Lorem in ullamco elit aute labore laboris. Lorem sit culpa reprehenderit nulla non est sunt occaecat adipisicing irure do.
        </Paragraph>

        <Image float="right" src="https://placehold.it/200x200" />

        <Paragraph>
        Lorem labore labore quis est ullamco dolor. Ad minim ex sit proident reprehenderit id proident deserunt. Mollit enim aliquip in incididunt consequat adipisicing laboris nisi sint eu. Eiusmod commodo fugiat proident elit sint ut. Exercitation non dolore consectetur laboris. Ipsum et excepteur occaecat fugiat Lorem ullamco occaecat do.
        </Paragraph>

        <Paragraph>
        Tempor laboris quis velit ad qui nulla duis ipsum incididunt officia incididunt. Non elit minim do laborum fugiat ullamco ad aliqua dolore. Velit dolore cupidatat exercitation deserunt commodo excepteur est fugiat mollit. Culpa eiusmod pariatur amet est culpa deserunt dolor. Sint eu laborum excepteur eu occaecat. Ea ullamco mollit mollit nulla anim nostrud excepteur ad cupidatat laborum nulla commodo aliquip voluptate. Consequat Lorem nostrud ipsum amet est deserunt esse consequat sunt aliqua do.
        </Paragraph>
      </Fragment>
    );
  }
}

export default Sponsors;