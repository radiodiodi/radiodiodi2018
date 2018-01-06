import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`text-align: center;`;

function Footer() {
  return (
    <FooterContainer>
      <hr />&copy; Radiodiodi 2018
    </FooterContainer>
  );
}

export default Footer;
