import React, { Component } from 'react';
import 'whatwg-fetch';
import InstagramGallery from './InstagramGallery';

class Instagram extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
    };

    this.fetchImages = this.fetchImages.bind(this);
    this.fetchImages();
  }

  async fetchImages() {
    const count = process.env.REACT_APP_IMAGE_COUNT;
    const userId = process.env.REACT_APP_USER_ID;
    const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
    const url = `https://api.instagram.com/v1/users/${userId}/media/recent/?access_token=${accessToken}&count=${count}`;

    try {
      const resp = await fetch(url);
      const data = await resp.json();

      const imageLinks = data.data.map(obj => ({
        img: obj.images.standard_resolution.url,
        link: obj.link,
        tags: obj.tags,
        text: obj.caption.text,
      }));
  
      this.setState({
        images: imageLinks,
      });
    } catch (err) {
      this.setState({
        error: true,
      });
      console.log(err);
    }
  }

  render() {
    return !this.state.error
      ? <InstagramGallery objs={ this.state.images } />
      : <InstagramGallery error />;
  }
}

export default Instagram;