import React, { Component } from 'react';
import styled from 'styled-components';
import Message from '../../admin/Message';
import MessagePanel from '../../admin/MessagePanel';
import BanPanel from '../../admin/BanPanel';
import Ban from '../../admin/Ban';
import ReservedNamePanel from '../../admin/ReservedNamePanel';
import ReservedName from '../../admin/ReservedName';
import { fetchMessages, fetchBans, fetchReservedNames } from '../../../utils';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Column = styled.div`
  ${ p => p.hidden && 'display: none' };
  margin: 0.5rem 0.5rem;

  flex: 1 0 auto;
  @media screen and (min-width: 500px) {
    min-width: 400px;
  }

  color: ${p => p.theme.color.white};
`;

const Log = styled.div`
  max-height: 20rem;
  overflow-y: auto;
  overflow-x: hidden;

  border: 1px solid ${p => p.theme.color.white};
  margin-bottom: 2rem;
`;

class AdminPage extends Component {
  state = {
    messages: [],
    bans: [],
    reservedNames: [],
    selected: null,
    selectedType: 'message', // or ban
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
      if (err.unauthorized) {
        history.push('/login');
      }
    }
  }

  getBans = async () => {
    try {
      const bans = await fetchBans();
      this.setState({
        bans,
      });
    } catch (err) {
      console.log(err);
    }
  }

  getReservedNames = async () => {
    try {
      const reservedNames = await fetchReservedNames();
      this.setState({
        reservedNames,
      });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate = () => {
    // Scroll to bottom of chat log
    this.log && (this.log.scrollTop = this.log.scrollHeight);
  }

  onSelect = (data, type) => {
    console.log(data);
    this.setState({
      selected: data,
      selectedType: type,
    });
  }

  isSelected = (msg, other, type) => {
    const { selectedType } = this.state;
    return msg && other && msg._id === other._id && type === selectedType;
  }

  refresh = () => {
    this.getMessages();
    this.getBans();
    this.getReservedNames();
  }

  renderPanel = () => {
    const { selected, selectedType } = this.state;
    const { history } = this.props;

    if (selectedType === 'message') {
      return <MessagePanel refresh={this.refresh} history={history} data={selected} />
    } else if (selectedType === 'ban') {
      return <BanPanel refresh={this.refresh} history={history} data={selected} />
    } else if (selectedType === 'reserved') {
      return <ReservedNamePanel refresh={this.refresh} history={history} data={selected} />
    } else {
      throw new Error('Invalid selected type.');
    }
  }

  render() {
    const { messages, bans, reservedNames, selected, loading } = this.state;

    const messageRows = messages.map((m, index) => 
      <Message selected={this.isSelected(m, selected, 'message')} onSelect={this.onSelect} key={index} data={m} 
    />);

    const banRows = bans.map((b, index) => 
      <Ban selected={this.isSelected(b, selected, 'ban')} onSelect={this.onSelect} key={index} data={b} 
    />);
  
    const reservedRows = reservedNames.map((r, index) => 
      <ReservedName selected={this.isSelected(r, selected, 'ban')} onSelect={this.onSelect} key={index} data={r} 
    />);

    return !loading ? (
      <Container>
        <Column>
          <h2>Shoutbox messages</h2>
          <Log ref={l => { this.log = l }}>
            { messageRows }
          </Log>
          <h2>Banned users</h2>
          <Log ref={l => { this.bans = l }}>
            { banRows }
          </Log>
          <h2>Reserved users</h2>
          <Log ref={l => { this.reserved = l }}>
            { reservedRows }
          </Log>
        </Column>
        <Column hidden={ !selected }>
          { this.renderPanel() }
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