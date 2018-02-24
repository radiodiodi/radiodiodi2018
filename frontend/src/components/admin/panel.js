import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${p => p.theme.color.contrast};
  padding: 0.5rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem;
`;

class Panel extends Component {
  render() {
    const { data } = this.props;
    return data ? (
      <Container>
        <Row>
          <div>Timestamp</div>
          <div>{ data.timestamp }</div>
        </Row>
        <Row>
          <div>ID</div>
          <div>{ data._id }</div>
        </Row>
        <Row>
          <div>Username</div>
          <div>{ data.name }</div>
        </Row>
        <Row>
          <div>Message</div>
          <div>{ data.text }</div>
        </Row>
        <Row>
          <div>IP Address</div>
          <div>{ data.ip }</div>
        </Row>
      </Container>
    ) : null;
  }
}

export default Panel;