import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { liftBan } from '../../utils';

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

const Button = styled.button`
  margin: 0 0.5rem;
  @media screen and (max-width: 400px) {
    margin: 0 0;
  }
  background-color: ${p => p.theme.color.pink};
  padding: 1rem;
  border: 0px;
  font-size: 1rem;
  font-family: 'Comfortaa';
  cursor: pointer;
`;

const Actions = styled.div`
  flex: 1;
`;

const Modal = styled(ReactModal)`
  width: 500px;
  @media screen and (max-width: 600px) {
    width: 90vw;
  }

  margin: auto;
  padding: 1rem;
  margin-top: calc(50vh - 0.5 * 400px);
  background-color: ${p => p.theme.color.dark};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ModalContent = styled.div`
  flex: 1;
  margin-bottom: 2rem;
  color: ${p => p.theme.color.white};
  text-align: center;
`;

const ModalButtons = styled.div`
  display: flex;
  flex-direction: row;
`;

const ModalButton = styled(Button)`
  flex: 1;
  @media screen and (max-width: 400px) {
    margin: 0 0.5rem;
  }
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