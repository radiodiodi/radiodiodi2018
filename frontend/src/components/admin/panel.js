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
  align-items: center;
  padding: 0.5rem;
`;

const Button = styled.button`
  background-color: ${p => p.theme.color.pink};
  padding: 1rem;
  margin: 0 0.5rem;
  border: 0px;
  font-size: 1rem;
  font-family: 'Comfortaa';
  cursor: pointer;
`;

const Actions = styled.div`
  flex: 1;
`;

class Panel extends Component {
  ban = () => {

  }

  remove = () => {

  }

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
        <Row>
          <Actions>Actions</Actions>
          <Button onClick={this.remove()}>Remove</Button>
          <Button onClick={this.ban()}>Ban by IP</Button>
        </Row>
      </Container>
    ) : null;
  }
}

export default Panel;