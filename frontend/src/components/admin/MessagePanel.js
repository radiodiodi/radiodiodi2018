import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { removeMessage, banUserForMessage } from '../../utils';

const Container = styled.div`
  background-color: ${p => p.theme.color.contrast};
  padding: 0.5rem;
  margin-bottom: 2rem;
  min-width: 0;
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
  min-width: 0;
`;

const Buttons = styled.div`
  @media screen and (max-width: 400px) {
    width: 100%;
  }
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

const Text = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  margin-left: 1rem;
  min-width: 0;
`;

class Panel extends Component {
  state = {
    showRemoveModal: false,
    showBanModal: false,
  };

  ban = async () => {
    const { data, history, refresh } = this.props;
    this.setState({ showBanModal: false });
    try {
      await banUserForMessage(data._id);
      refresh();
    } catch (err) {
      console.log(err);
      if (err.unauthorized) {
        history.push('/login');
      }
    }
  }

  remove = async () => {
    const { data, history, refresh } = this.props;
    this.setState({ showRemoveModal: false });
    try {
      await removeMessage(data._id);
      refresh();
    } catch (err) {
      console.log(err);
      if (err.unauthorized) {
        history.push('/login');
      }
    }
  }

  renderModal = () => {
    const { data } = this.props;
    const { showRemoveModal, showBanModal } = this.state;
    return (
      <Fragment>
        <Modal
          isOpen={showRemoveModal}
          contentLabel="Remove message?"
        >
          <ModalContent>
            <h2>Remove message?</h2>
            { data.name }: { data.text }
          </ModalContent>
          <ModalButtons>
            <ModalButton onClick={this.remove}>Yes</ModalButton>
            <ModalButton onClick={() => this.setState({ showRemoveModal: false })}>No</ModalButton>
          </ModalButtons>
        </Modal>
        <Modal
          isOpen={showBanModal}
          contentLabel="Ban user by IP?"
        >
          <ModalContent>
            <h2>Ban user by IP?</h2>
            IP: { data.ip }
          </ModalContent>
          <ModalButtons>
            <ModalButton onClick={this.ban}>Yes</ModalButton>
            <ModalButton onClick={() => this.setState({ showBanModal: false })}>No</ModalButton>
          </ModalButtons>
        </Modal>
      </Fragment>
    );
  }

  render() {
    const { data } = this.props;

    return data ? (
      <Container>
        { this.renderModal() }
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
          <Text>{ data.text }</Text>
        </Row>
        <Row>
          <div>IP Address</div>
          <div>{ data.ip }</div>
        </Row>
        <Row>
          <Actions>Actions</Actions>
          <Buttons>
            <Button onClick={() => this.setState({ showRemoveModal: true })}>Remove</Button>
            <Button onClick={() => this.setState({ showBanModal: true })}>Ban by IP</Button>
          </Buttons>
        </Row>
      </Container>
    ) : null;
  }
}

export default Panel;