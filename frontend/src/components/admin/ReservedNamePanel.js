import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${p => p.theme.color.contrast};
  padding: 0.5rem;
  margin-bottom: 2rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media screen and (max-width: 400px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 0.5rem;
  }
  justify-content: space-between;
  padding: 0.5rem;
`;

class Panel extends Component {

  render() {
    const { data } = this.props;

    return data ? (
      <Container>
        <Row>
          <div>ID</div>
          <div>{ data._id }</div>
        </Row>
        <Row>
          <div>Username</div>
          <div>{ data.name }</div>
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