import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${p => p.selected ? p.theme.color.shimmer : p.theme.color.contrast};
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${p => p.theme.color.shimmer};
  }
`;

class Message extends Component {
  select = () => {
    const { data, onSelect } = this.props;
    onSelect(data);
  }

  render() {
    const { data, onSelect, selected } = this.props;
    return (
      <Container selected={selected} onClick={this.select} >
        <span>{ data.name }: </span>
        <span>{ data.text }</span>
      </Container>
    )
  }
}

export default Message;