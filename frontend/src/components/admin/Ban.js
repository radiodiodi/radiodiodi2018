import React, { Component } from 'react';
import styled from 'styled-components';

const Row = styled.div`
  background-color: ${p => p.selected ? p.theme.color.shimmer : p.theme.color.contrast};
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${p => p.theme.color.shimmer};
  }
`;

class Ban extends Component {
  render() {
    const { data, onSelect } = this.props;
    return (
      <Row onClick={() => onSelect(data, 'ban')}>
        { data.name }, IP: { data.ip }
      </Row>
    );
  }
}

export default Ban;