import React from 'react';
import styled from 'styled-components';

const HeaderTitle = styled.marquee`
  color: ${p => p.theme.color.pink};
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
