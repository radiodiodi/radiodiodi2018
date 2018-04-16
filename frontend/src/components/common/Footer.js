import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  background-color: ${p => p.theme.color.blue};
  padding: 1rem 2rem 1rem;
  height: 3rem;

  border-top: solid;
  border-width: 4px;
  border-color: ${p => p.theme.color.pink};
`;

function Footer() {
  return (
    <FooterContainer>
      &copy; Radiodiodi 2018
    </FooterContainer>
  );
}

export default Footer;
