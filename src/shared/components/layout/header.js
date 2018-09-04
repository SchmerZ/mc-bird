import React from "react";
import styled from 'styled-components'

import Container from '../styled/content-container'
import {Row} from '../../../client/components/layout/responsive'
import HeaderLogo from '../../../client/components/layout/header-logo'

const HeaderRow = styled(Row)`
  margin: 0;
`;

const StyledHeader = styled.header`
  padding-top: 30px;
  position: relative;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Container>
        <HeaderRow>
          <HeaderLogo />
        </HeaderRow>
      </Container>
    </StyledHeader>
  )
};

export default Header;
