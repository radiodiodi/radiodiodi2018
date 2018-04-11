import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { fetchSongsByField, fetchSongs } from '../../../utils';

const Container = styled.div`
`;

const Results = styled.div`
`;

const Result = styled.div`
  background-color: ${p => p.theme.color.contrast};
  padding: 0.5rem;
  margin: 0.2rem 0;

  display: flex;
  flex-direction: row;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }

  color: ${p => p.white ? p.theme.color.white : p.theme.color.pink};
`;

const Error = styled.h2`
  text-align: center;
  color: ${p => p.theme.color.yellow};
`;

const Column = styled.div`
  flex: 1;
  margin: 0 0.2rem;
`;

const SearchBar = styled.input`
  padding: 0.5rem;
  flex: 1;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  margin-bottom: 2rem;
`;

const SearchButton = styled.a`
  padding: 0.5rem;
  background-color: ${p => p.theme.color.white};
  color: ${p => p.theme.color.dark};
  min-width: 5rem;
  text-align: center;
  cursor: pointer;
`;

const TypePickerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1rem;
`;

const TypeLabel = styled.label`
  color: ${p => p.theme.color.white};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TypePicker = styled.input`
`;


const AnnouncementBox = styled.div`
  text-align: center;
  padding: 0 2rem 2rem;
  margin-bottom: 2rem;
  border-bottom: solid;
  border-width: 2px;
  border-color: ${p => p.theme.color.pink};

  @media screen and (max-width: 800px) {
    margin-top: 2rem;
  }
`;

class Library extends Component {
  state = {
    results: [],
    type: 'title',
  }

  static contextTypes = {
    trans: PropTypes.any
  };

  fetchAll = async () => {
    try {
      const songs = await fetchSongs();
      return songs;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  loadInitial = async () => {
    const results = await this.fetchAll();
    this.setState({
      results,
    });
  }


  componentDidMount() {
    this.loadInitial();
  }

  fetchBy = async (type, value) => {
    try {
      if (value.length > 0) {
        return await fetchSongsByField(type, value);
      } else {
        return await this.fetchAll();
      }
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  fetchByTitle = async title => {
    const results = await this.fetchBy('title', title);
    this.setState({
      results,
    });
  }

  fetchByArtist = async artist => {
    const results = await this.fetchBy('artist', artist);
    this.setState({
      results,
    });
  }

  fetchByAlbum = async album => {
    const results = await this.fetchBy('album', album);
    this.setState({
      results,
    });
  }

  renderResult = (result, index) => {
    return (
      <Result white key={index}>
        <Column>{ result.title }</Column>
        <Column>{ result.artist.join(', ') }</Column>
        <Column>{ result.album }</Column>
      </Result>
    );
  }

  renderHeaders = () => {
    const { trans } = this.context;
    return (
      <Result>
        <Column>{ trans.title }</Column>
        <Column>{ trans.artist }</Column>
        <Column>{ trans.album }</Column>
      </Result>
    );
  }

  renderNotFound = () => {
    const { trans } = this.context;
    return (
      <Error>
        { trans.nosongsfound }
      </Error>
    )
  }

  renderResults = results => {
    const rows = results.map((r, i) => this.renderResult(r, i))
    return (
      <Results>
        { this.renderHeaders() }
        { rows }
      </Results>
    );
  }

  renderOutOfOrder = () => {
    const { trans } = this.context;
    return (
      <AnnouncementBox>
        <Error>{ trans.libraryoutoforder }</Error>
      </AnnouncementBox>
    );
  }

  onInput = () => {
    const value = this.input.value;
    const { type } = this.state;

    if (type === 'title') {
      this.fetchByTitle(value);
    } else if (type === 'artist') {
      this.fetchByArtist(value);
    } else if (type === 'album') {
      this.fetchByAlbum(value);
    } 
  }

  onPromptKeyPress = event => {
    const ENTER_KEY = 13;

    if ([event.keyCode, event.which].includes(ENTER_KEY)) {
      this.onInput();
    }
  }

  onChangeType = type => {
    this.setState({
      type,
    });
  }

  render() {
    const { results, type } = this.state;
    const { trans } = this.context;
    const content = results.length > 0
      ? this.renderResults(results)
      : this.renderNotFound();

    return (
      <Container>
        { this.renderOutOfOrder() }
        <h2>{ trans.librarybrowser }</h2>
        <TypePickerContainer>
          <TypeLabel>
            { trans.title }
            <TypePicker type="radio" name="type" onChange={() => this.onChangeType('title')} checked={type === 'title'}/>
          </TypeLabel>
          <TypeLabel>
            { trans.artist }
            <TypePicker type="radio" name="type" onChange={() => this.onChangeType('artist')} checked={type === 'artist'}/>
          </TypeLabel>
          <TypeLabel>
            { trans.album }
            <TypePicker type="radio" name="type" onChange={() => this.onChangeType('album')} checked={type === 'album'}/>
          </TypeLabel>
        </TypePickerContainer>
        <SearchContainer>
          <SearchBar onKeyPress={this.onPromptKeyPress} innerRef={i => { this.input = i }} type="text" />
          <SearchButton onClick={this.onInput}>{ trans.search }</SearchButton>
        </SearchContainer>
        { content }
      </Container>
    );
  }
}


export default Library;