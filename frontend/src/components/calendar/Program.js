import React from 'react';
import styled from 'styled-components';
import { shortenText } from '../../utils'
import placeholderImg from '../../images/placeholder_dark.svg'

const ProgramBlock = styled.div`
  background-color: ${p => p.theme.color.blue};
  color: ${p => p.theme.color.white};
  padding: 1rem;
  margin: 0.5rem;
  min-height: ${p => p.maintainance ? 'none' : '180px'};
`

const ImagePlaceholder = styled.div`
  height: 150px;
  width: 150px;
  float: right;
  background-image: url(${placeholderImg});
  background-size: cover;
  margin: 0 0 0.5rem 0.5rem;
`

const Img = ImagePlaceholder.withComponent('img')

const Title = styled.h4`
  color: ${p => p.theme.color.pink};
  margin: 0.5rem 160px 0.5rem 0;
  font-size: 18px;
  border-bottom: 1px solid ${p => p.theme.color.pink};
`

const Genre = styled.small`
  float: right;
  padding: 0 0.5rem;
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
`

class Program extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const p = this.props.p
    const maintainance = p.title === 'HUOLTOTAUKO'
    return (
      <ProgramBlock maintainance={maintainance}>
        {p.image
          ? <Img src={`https://radiodiodi.fi/static/img/${p.image}`} />
          : !maintainance ? <ImagePlaceholder /> : null}
        <small>{p.start.substr(11, 5) + ' - ' + p.end.substr(11, 5)}</small>
        <Genre>{p.genre}</Genre>
        <Title>{p.title}</Title>
        <Author>{p.team}</Author>
        {p.description && <P>
          {this.state.expanded ? p.description : shortenText(p.description, 200)}
          {p.description.length > 200 && <ShowMore onClick={this.toggleExpand}>{this.state.expanded ? 'Vähemmän' : 'Lisää'}</ShowMore>}</P>}
      </ProgramBlock>
    )
  }
}

export default Program
