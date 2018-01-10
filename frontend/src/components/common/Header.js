import React from 'react';
import styled from 'styled-components';
import logo from '../../svg/logo.svg';
import mascot from '../../svg/mascot.svg';

const HeaderContainer = styled.header`
  padding: 3rem 0 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: solid;
  border-width: 4px;
  border-color: ${p => p.theme.color.pink};
`;

const Logo = styled.img`
  max-height: 3rem;
  width: auto;
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo src={ mascot } />
      <Logo src={ logo } />
    </HeaderContainer>
  );
}

export default Header;
