import React from 'react';
import styled from 'styled-components';

const HeaderTitle = styled.marquee`
  color: hotpink;
  font-size: 1.5rem;
  text-transform: uppercase;
`;

function Header() {
  return (
    <header>
      <HeaderTitle>Radiodiodi 2018</HeaderTitle>
    </header>
  );
}

export default Header;
