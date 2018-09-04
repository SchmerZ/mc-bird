import React from 'react'
import styled from 'styled-components'

import {logoColor, textColor} from '../../styles/variables'
import Container from '../../../shared/components/styled/content-container'
import {Row} from './responsive'
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
  color: ${textColor};
`;

const LogoContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  color: ${logoColor};
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
            <MessageBirdLogoIcon size={32} />
          </LogoContainer>
        </Row>
      </Container>
    </StyledFooter>
  )
};

export default Footer;
