import React, { Component } from 'react';
import styled from 'styled-components';
import Cookie from 'universal-cookie';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';

import verified from '../../svg/check-mark.svg';

const WS_URL = process.env.REACT_APP_BACKEND_WS_URL;
const MAX_MESSAGES = 100;

const Container = styled.div`
  background-color: ${p => p.theme.color.contrast};
  color: ${p => p.theme.color.white};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 1rem;
  min-width: 10rem;
  height: 25rem;
`;

const Log = styled.div`
  width: 100%;
  flex: 1;
  overflow: auto;
  font-size: 0.8rem;
`;

const Row = styled.div`
  padding: 0.2rem;
  ${ p => p.error && 'color: red'};

  display: flex;
  align-items: flex-start;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const SendButton = styled.a`
  padding: 0.5rem;
  background-color: ${p => p.theme.color.pink};
  color: ${p => p.theme.color.blue};
  margin: 0.5rem;
  cursor: pointer;
`;

const Username = styled.input`
  padding: 0.5rem;
  margin: 0.5rem;
  flex: 1;

  min-width: 200px;
`;

const Prompt = styled.input`
  padding: 0.5rem;
  margin: 0.5rem;
  flex: 2;

  min-width: 300px;
`;

const Verified = styled.img`
  width: 16px;
  margin: 0 0.3rem 0 0;
`;

const Timestamp = styled.div`
  white-space: nowrap;
  margin-right: 0.3rem;
  color: ${p => p.theme.color.pink};
`;

const RowText = styled.span`
  word-break: break-word;
`;

const RowUser = styled.span`
  color: ${p => p.theme.color.yellow};
  white-space: pre;
  &:after {
    content: ': ';
  }
`;

const Block = styled.span`
  display: block;
`;

class Shoutbox extends Component {
  constructor() {
    super();
    this.state = {
      log: [],
    };
    this.cookie = new Cookie();
  }

  static contextTypes = {
    trans: PropTypes.any
  };

  handleData = rawData => {
    const data = JSON.parse(rawData);

    if (data.initial) {
      this.setState({
        log: data.initial
      });
    } else if (data.message) {
      const log = this.state.log.concat([ data.message ]);
      if (log.length > MAX_MESSAGES) {
        log.splice(0, 1);
      }
  
      this.setState({
        log,
      });
    } else if (data.erase) {
      const id = data.erase;
      const filtered = this.state.log.filter(m => m._id !== id);
      this.setState({
        log: filtered,
      });
    } else {
      console.log('Invalid websocket data:');
      console.log(data);
      this.showError();
    }
  }

  sendMessage = () => {
    const text = this.prompt.value,
          username = this.username.value;

    if (!username || username.length === 0) {
      alert('A username is required!');
      return;
    }

    if (!text || text.length === 0) {
      alert('A message is required!');
      return;
    }

    const MESSAGE_MAX_LENGTH = 500;
    const USERNAME_MAX_LENGTH = 16;
    if (text.length > MESSAGE_MAX_LENGTH) {
      alert(`Message too long! Max: ${MESSAGE_MAX_LENGTH} characters.`);
      return;
    }

    if (username.length > USERNAME_MAX_LENGTH) {
      alert(`Username too long! Max: ${USERNAME_MAX_LENGTH} characters.`);
      return;
    }

    console.log(`Send message: ${text}, username: ${username}`);
    this.connection.send(JSON.stringify({
      name: username,
      text,
    }));

    this.cookie.set('username', username);
    this.prompt.value = '';
  }

  renderRows = rows => {
    return rows.map((row, index) => 
      <Row error={row.error} key={index}>
        <Block>
          <Timestamp>{dateFormat(new Date(Date.parse(row.timestamp)), 'dd.mm hh:MM')}</Timestamp>
        </Block>
        <Block>
          { row.reserved && <Verified src={ verified } />}
          <RowUser>{row.name}</RowUser>
          <RowText>{row.text}</RowText>
        </Block>
      </Row>
    );
  }

  showError = evt => {
    const { trans } = this.context;

    this.setState({
      log: [{
        error: true,
        name: 'SERVER',
        text: trans.shoutboxerror,
        timestamp: new Date(Date.now()),
      }],
    });

    console.log(`Websocket error. Data: ${evt.data}`);
  }

  connect = () => {
    this.connection = new WebSocket(WS_URL);
    this.connection.onmessage = evt => this.handleData(evt.data);
    this.connection.onerror = this.showError;
    this.connection.onclose = () => setTimeout(this.connect, 1000);

    const username = this.cookie.get('username') || '';
    this.username.value = username;
  }

  componentDidMount() {
    this.connect();
  }

  componentDidUpdate = () => {
    // Scroll to bottom of chat log
    this.chatLog.scrollTop = this.chatLog.scrollHeight;
  }

  onPromptKeyPress = event => {
    const ENTER_KEY = 13;

    if ([event.keyCode, event.which].includes(ENTER_KEY)) {
      this.sendMessage();
    }
  }

  render() {
    const { log } = this.state;
    const { trans } = this.context;
    return (
      <Container>
        <Log innerRef={chatLog => { this.chatLog = chatLog } }>
          { this.renderRows(log) }
        </Log>

        <InputContainer>
          <Username 
            placeholder={trans.username} 
            innerRef={ input => { this.username = input } } />
          <Prompt 
            placeholder={trans.messageplaceholder} 
            onKeyPress={this.onPromptKeyPress} 
            innerRef={ input => { this.prompt = input } } />
          <SendButton 
            onClick={this.sendMessage}>{trans.send}</SendButton>
        </InputContainer>
      </Container>
    );
  }
}

export default Shoutbox;