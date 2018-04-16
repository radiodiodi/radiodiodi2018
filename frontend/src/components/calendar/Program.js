import React from 'react';
import styled from 'styled-components';
import { shortenText } from '../../utils'
import placeholderImg from '../../images/placeholder_dark.svg'
import PropTypes from 'prop-types';

const ProgramBlock = styled.div`
  background-color: ${p => p.theme.color.blue};
  color: ${p => p.theme.color.white};
  padding: 1rem;
  min-height: ${p => p.maintainance ? 'none' : '180px'};
  &::after {
    content: "";
    clear: both;
    display: table;
  }

  @media screen and (max-width: 800px) {
    display: ${p => p.oneDayPreview ? 'none' : 'inherit'};
  }
`

const ImagePlaceholder = styled.div`
  height: 150px;
  width: 150px;
  float: right;
  background-image: url(${placeholderImg});
  background-size: cover;
  margin: 0 0 0.5rem 0.5rem;
  @media (max-width: 600px) {
    height: 125px;
    width: 125px;
  }
`

const Img = ImagePlaceholder.withComponent('img')

const Wrapper = styled.div`
  display: ${p => p.mobile ? 'none' : 'block'};
  @media (max-width: 600px) {
    display: ${p => p.mobile ? 'block' : 'none'};
  }
`

const Title = styled.h4`
  color: ${p => p.theme.color.pink};
  margin: 0.5rem 160px 0.5rem 0;
  font-size: 18px;
  border-bottom: 1px solid ${p => p.theme.color.pink};
  word-wrap: break-word;
  @media (max-width: 600px) {
    margin-right: 0;
  }
`

const Genre = styled.small`
  float: right;
  padding: 0 0.5rem;
  color: ${p => p.theme.color.yellow};

  @media (max-width: 600px) {
    float: none;
    display: block;
    padding: 0;
  }
`

const Author = styled.p`
  margin: 0.5rem 0;
`

const P = styled.p`
  font-size: 12px;
`

const ShowMore = styled.span`
  cursor: pointer;
  font-size: 12px;
  color: ${p => p.theme.color.yellow};
  padding: 0 0.5rem;
`;

class Program extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  static contextTypes = {
    trans: PropTypes.any
  };

  toggleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { p, oneDayPreview } = this.props;
    const maintainance = p.title === 'HUOLTOTAUKO'
    const image = p.image
      ? <Img src={`${process.env.REACT_APP_STATIC_URL}/img/${p.image}`} />
      : !maintainance ? <ImagePlaceholder /> : null
    const head = isMobile => (
      <Wrapper mobile={isMobile}>
        <Title>{p.title}</Title>
        <Author>{p.team}</Author>
      </Wrapper>
    )
    return (
      <ProgramBlock oneDayPreview={oneDayPreview} maintainance={maintainance}>
        {head(true)}
        {image}
        <Genre>{p.genre}</Genre>
        <small>{p.start.substr(11, 5) + ' - ' + p.end.substr(11, 5)}</small>
        {head(false)}
        {p.description && <P>
          {this.state.expanded ? p.description : shortenText(p.description, 200)}
          {p.description.length > 200 && <ShowMore onClick={this.toggleExpand}>{this.state.expanded ? 'Vähemmän' : 'Lisää'}</ShowMore>}</P>}
      </ProgramBlock>
    )
  }
}

export default Program
