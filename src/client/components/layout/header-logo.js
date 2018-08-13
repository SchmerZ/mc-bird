import React from 'react'
import styled from 'styled-components'

import {color} from '../../styles/variables'
import {Anchor} from './primitive'
import {MessageBirdHeaderLogoIcon} from '../icons'

const Container = styled(Anchor)`
  color: ${color.logo};
  transition: 0s;
  
  :hover {
    opacity: .5;
    color: ${color.logo};
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
