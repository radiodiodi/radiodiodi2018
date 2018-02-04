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
      </Fragment>
    );
  }
}

export default Sponsors;