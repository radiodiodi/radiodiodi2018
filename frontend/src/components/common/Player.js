import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { fetchNowPlayingProgramme, fetchCurrentSong } from '../../utils';

import playIcon from '../../svg/play.svg';
import pauseIcon from '../../svg/pause.svg';

const Container = styled.div`
  background-color: ${p => p.theme.color.blue};
  padding: 1rem;
  color: ${p => p.theme.color.white};

  @media screen and (max-width: 800px) {
    margin: 1rem 0 1rem;
  }
`;

const PlayButton = styled.img`
  width: 3rem;
  padding: 0.5rem 0.5rem 0.5rem 0;
  cursor: pointer;
`;

const Line = styled.div`
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: ${p => p['margin-top'] ? '1rem' : '0'};
`;

const Header = styled.h4`
  font-size: 18px;
  color: ${p => p.theme.color.pink};
  border-bottom: 1px solid ${p => p.theme.color.pink};
  margin: 0.5rem 0 0.5rem 0;
`;

const AudioElement = styled.audio`
  display: hidden;
`;

const NowPlayingText = styled.div`
  padding-right: 0.5rem;
  white-space: nowrap;
`;

const NowPlayingValue = styled.i`
  text-align: right;
`;

class Player extends Component {
  constructor() {
    super();
    this.state = {
      playing: false,
    };

    this.fetchNowPlaying = this.fetchNowPlaying.bind(this);
    this.fetchCurrentSong = this.fetchCurrentSong.bind(this);

    window.setInterval(this.fetchNowPlaying, 10000); // 10 seconds interval
    this.fetchNowPlaying();
    window.setInterval(this.fetchCurrentSong, 10000); // 10 seconds interval
    this.fetchCurrentSong();
  }

  playPause = () => {
    const { playing } = this.state;

    if (!playing) {
      this.audio.play();
    } else {
      this.audio.pause();
    }

    this.setState({
      playing: !playing,
    });
  }

  static contextTypes = {
    trans: PropTypes.any,
  }

  async fetchCurrentSong() {
    let currentSong;
    try {
      currentSong = await fetchCurrentSong();
    } catch (error) {
      console.log(error);
    }

    if (!currentSong || !currentSong.title || !currentSong.artist) {
      this.setState({
        title: null,
        artist: null,
      });
      return;
    }

    this.setState({
      title: currentSong.title,
      artist: currentSong.artist,
    });
  }

  async fetchNowPlaying() {
    let programme;
    try {
      programme = await fetchNowPlayingProgramme();

    } catch (error) {
      console.log(error);
    }

    if (!programme || !programme.title) {
      this.setState({
        programme: null,
      });
      return;
    }

    this.setState({
      programme: programme.title,
    });
  }

  renderCurrentSong = () => {
    const { title, artist } = this.state;
    const { trans } = this.context;

    if (title && artist) {
      return (
        <Line margin-top>
          <NowPlayingText>{ trans.nowplaying }:</NowPlayingText>
          <NowPlayingValue>{artist} - {title}</NowPlayingValue>
        </Line>
      );
    } else {
      return null;
    }
  }

  render() {
    const { trans } = this.context;
    const { playing, programme } = this.state;

    const icon = !playing ? playIcon : pauseIcon;

    return (
      <Container>
        <AudioElement innerRef={audio => { this.audio = audio } }>
          <source src="https://virta.radiodiodi.fi/radiodiodi.ogg" type="audio/ogg" />
          <source src="https://virta.radiodiodi.fi/radiodiodi-mp3" type="audio/mpeg" />
        </AudioElement>
        <Header>{ trans.listentoradio }</Header>
        <Line><PlayButton onClick={this.playPause} src={ icon } /> <h4>{programme}</h4></Line>
        { this.renderCurrentSong() }
      </Container>
    );
  }
};

export default Player;
