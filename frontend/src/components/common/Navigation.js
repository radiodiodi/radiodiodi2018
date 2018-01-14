import styled from 'styled-components';
import React from 'react';
import { Link as ReactLink } from 'react-router-dom'

const Rectangle = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
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

function Navigation() {
  return (
    <Rectangle>
      <Link to="/">Etusivu</Link>
      <Link to="/sponsors">Yrityksille</Link>
    </Rectangle>
  );  
}

export default Navigation;