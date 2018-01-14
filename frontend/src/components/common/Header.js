import React, { Fragment } from 'react';
import styled from 'styled-components';
import logo from '../../svg/logo_white.svg';
import mascot from '../../svg/mascot.svg';
import Navigation from './Navigation';

const HeaderContainer = styled.header`
  padding: 3rem 0 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: solid;
  border-width: 4px;
  border-color: ${p => p.theme.color.pink};

  @media screen and (max-width: 400px) {
    flex-direction: column;
    padding: 1rem 0 1rem;
  }
`;

const Logo = styled.img`
  max-height: 3rem;
  width: auto;

  @media screen and (max-width: 400px) {
    margin: 1rem 0 0;
  }
`;

function Header(props) {
  return (
    <Fragment>
      <HeaderContainer>
        <Logo src={ mascot } />
        <Logo src={ logo } />
      </HeaderContainer>
      <Navigation changeLanguage={props.changeLanguage} />
    </Fragment>
  );
}

export default Header;
