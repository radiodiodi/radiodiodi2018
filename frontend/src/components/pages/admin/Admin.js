import React, { Component } from 'react';
import styled from 'styled-components';
import Message from '../../admin/message';
import Panel from '../../admin/panel';
import { fetchMessages, AuthError } from '../../../utils';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Column = styled.div`
  margin: 0.5rem 0.5rem;

  flex: 1 0 auto;
  min-width: 400px;

  color: ${p => p.theme.color.white};
`;

const Log = styled.div`
  max-height: 20rem;
  overflow: scroll;

  border: 1px solid ${p => p.theme.color.white};
`;

class AdminPage extends Component {
  state = {
    messages: [],
    selected: null,
    loading: true,
  }

  getMessages = async () => {
    const { history } = this.props;

    try {
      const messages = await fetchMessages();
      this.setState({
        messages,
        loading: false,
      });
    } catch (err) {
      console.log(err);
      debugger;
      if (err.unauthorized) {
        debugger;
        history.push('/login');
      }
    }

  }

  componentDidMount() {
    this.getMessages();
  }

  componentDidUpdate = () => {
    // Scroll to bottom of chat log
    this.log.scrollTop = this.log.scrollHeight;
  }

  onSelect = data => {
    console.log(data);
    this.setState({
      selected: data,
    });
  }

  isSelected = (msg, other) => msg && other && msg._id === other._id;

  render() {
    const { messages, selected, loading } = this.state;
    const messageRows = messages.map((m, index) => 
      <Message selected={this.isSelected(m, selected)} onSelect={this.onSelect} key={index} data={m} 
    />);
  
    return !loading ? (
      <Container>
        <Column>
          <h2>Shoutbox messages</h2>
          <Log ref={l => { this.log = l }}>
            { messageRows }
          </Log>
        </Column>
        <Column>
          <Panel data={selected} />
        </Column>
      </Container>
    ) : (
      <Container>
        <Column>
          <h2>Loading...</h2>
        </Column>
      </Container>
    )
  }
}

export default AdminPage;