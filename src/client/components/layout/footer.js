import React from "react";
import styled from 'styled-components'

import Container from "./container";
import {Row} from "./responsive";
import {MessageBirdLogoIcon} from '../icons'

const StyledFooter = styled.footer`
  position: relative;
  
  font-size: 18px;
  line-height: 30px;
  padding: 40px 0;
`;

const CopyrightContainer = styled.div`
  text-align: center;
  opacity: .5;
  font-size: 12px;
  color: #24374e;
`;

const LogoContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  color: #2481d7;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <Row>
          <CopyrightContainer>
            ©2018 MessageBird. All rights reserved.
          </CopyrightContainer>
          <LogoContainer>
            <MessageBirdLogoIcon size={32}/>
          </LogoContainer>
        </Row>
      </Container>
    </StyledFooter>
  )
};

export default Footer;
