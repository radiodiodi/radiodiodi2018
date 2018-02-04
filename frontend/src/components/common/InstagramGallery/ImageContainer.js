import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;

  margin-bottom: 2rem;
`;

class ImageContainer extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.any),
  }

  shouldComponentUpdate(nextProps) {
    return this.props.images.length !== nextProps.images.length;
  }

  render() {
    return (
      <Container>
        { this.props.images }
      </Container>
    );
  }
}

export default ImageContainer;