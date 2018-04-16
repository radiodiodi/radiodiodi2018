import React from 'react';
import styled from 'styled-components';
import { shortenText } from '../../utils'
import placeholderImg from '../../images/placeholder_dark.svg'
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';

const ProgramBlock = styled.div`
  background-color: ${p => p.theme.color.blue};
  color: ${p => p.theme.color.white};
  padding: 1rem;
  min-height: ${p => p.maintainance ? 'none' : '150px'};
  &::after {
    content: "";
    clear: both;
    display: table;
  }

  margin-bottom: 0.5rem;

  display: flex;
  flex-direction: row;
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }

  justify-content: space-between;
  @media screen and (max-width: 800px) {
    display: ${p => p.oneDayPreview ? 'none' : 'flex'};
  }
`;

const Column = styled.div`
  flex: ${p => p.flex};
  display: flex;
  flex-direction: column;
`;

const ImagePlaceholder = styled.div`
  height: 150px;
  width: 150px;

  background-image: url(${placeholderImg});
  background-size: cover;
  margin-left: 1rem;

  @media screen and (max-width: 500px) {
    margin-left: 0;
    align-self: flex-end;
  }
`;

const Img = ImagePlaceholder.withComponent('img')

const Title = styled.h4`
  color: ${p => p.theme.color.pink};
  margin: 0.5rem 0;
  font-size: 18px;
  border-bottom: 1px solid ${p => p.theme.color.pink};
  word-wrap: break-word;
  @media (max-width: 600px) {
    margin-right: 0;
  }
`;

const Genre = styled.small`
  color: ${p => p.theme.color.yellow};
`;

const Author = styled.p`
  margin: 0.5rem 0;
`;

const Paragraph = styled.p`
  font-size: 12px;

  @media screen and (min-width: 500px) {
    margin-bottom: 0;
  }
`;

const ShowMore = styled.span`
  cursor: pointer;
  font-size: 12px;
  color: ${p => p.theme.color.yellow};
  padding: 0 0;
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
    const Image = () => p.image
      ? <Img src={`${process.env.REACT_APP_STATIC_URL}/img/${p.image}`} />
      : !maintainance ? <ImagePlaceholder /> : null;

    const startDate = dateFormat(p.start, 'HH:MM');
    const endDate = dateFormat(p.end, 'HH:MM');

    const ExpandedText = () => this.state.expanded ? ' Vähemmän' : ' Lisää';

    const DESCRIPTION_MAX_LENGTH = 200;
    const ExpandLink = () => p.description.length > DESCRIPTION_MAX_LENGTH ? (
      <ShowMore onClick={this.toggleExpand}>
        <ExpandedText />
      </ShowMore>
    ) : null;

    const Description = () => p.description ? (
      <Paragraph>
        {this.state.expanded ? p.description : shortenText(p.description, DESCRIPTION_MAX_LENGTH)}
        <ExpandLink />
      </Paragraph>
    ) : null;

    return (
      <ProgramBlock oneDayPreview={oneDayPreview} maintainance={maintainance}>
        <Column flex={1}>
          <Genre>{p.genre}</Genre>
          <small>{`${startDate} - ${endDate}`}</small>
          <Title>{p.title}</Title>
          <Author>{p.team}</Author>
          <Description />
        </Column>
        <Column>
          <Image />
        </Column>
      </ProgramBlock>
    )
  }
}

export default Program
