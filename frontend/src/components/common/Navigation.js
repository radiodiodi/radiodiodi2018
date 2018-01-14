import styled from 'styled-components';
import React from 'react';
import { Link as ReactLink } from 'react-router-dom'
import trans from '../Locale';

const Rectangle = styled.div`
  background-color: ${p => p.theme.color.contrast};
  margin-bottom: 2rem;
  padding: 1rem 2rem 1rem;
  height: 3rem;
`;

const Link = styled(ReactLink)`
  color: white;
  text-decoration: none;
  color: ${p => p.theme.color.pink};
  margin: 0 2rem 0 0;

  &:hover {
    text-decoration: underline;
  }
`;

const Language = styled.a`
  float: right;
  color: ${p => p.theme.color.white};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

function Navigation(props) {
  return (
    <Rectangle>
      <Link to="/">{trans.frontpage}</Link>
      <Link to="/sponsors">{trans.forbusinesses}</Link>
      <Language onClick={props.changeLanguage}>{trans.changelang}</Language>
    </Rectangle>
  );
}

export default Navigation;