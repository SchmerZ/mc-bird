import React from "react";

import Container from "../styled/content-container";
import {Row} from './responsive'
import HeaderLogo from "./header-logo";
import styled from "styled-components";

const StyledHeader = styled.header`
  padding-top: 30px;
  position: relative;
  z-index: 800;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Container>
        <Row>
          <HeaderLogo/>
        </Row>
      </Container>
    </StyledHeader>
  )
};

export default Header;
