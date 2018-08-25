import React from 'react'
import styled from 'styled-components'

import {logoColor} from '../../styles/variables'
import {MessageBirdHeaderLogoIcon} from '../icons'

const Container = styled.a`
  color: ${logoColor};
  
  :hover {
    opacity: .5;
  }
`;

const Icon = styled(MessageBirdHeaderLogoIcon)`
  height: 35px;
  
  @media only screen and (max-width: 1024px) {
    height: 26px;
  }
`;

const HeaderLogo = (props) => {
  return (
    <Container {...props} href="https://www.messagebird.com">
      <Icon/>
    </Container>
  )
};

export default HeaderLogo;
