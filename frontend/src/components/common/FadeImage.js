import React, { Component } from 'react';
import styled from 'styled-components';

const FadeImage = styled.img`
  opacity: ${p => p.loaded ? 1 : 0};
  transition: opacity 0.5s;
`;

class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };

    this.onLoad = this.onLoad.bind(this);
  }

  onLoad() {
    this.setState({
      loaded: true 
    });
  }

  render() {
    return <FadeImage 
      { ...this.props }
      onLoad={ this.onLoad }
      loaded={ this.state.loaded }
    />;
  }
}

export default Image;