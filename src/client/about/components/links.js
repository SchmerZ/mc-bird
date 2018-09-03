import React, {Fragment} from 'react'
import styled from 'styled-components'

import {Anchor} from '../../components/styled/primitive'
import {GitHubIcon, LinkedInIcon} from '../../components/icons'

const Title = styled.h4`
  margin-bottom: 0;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 0;
`;

const StyledAnchor = styled(Anchor)`
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const iconSize = 25;

const Links = () => {
  return (
    <Fragment>
      <Title>Links:</Title>
      <LinkContainer>
        <GitHubIcon size={iconSize} />
        <StyledAnchor target="__blank"
                      href="https://github.com/SchmerZ/mc-bird">https://github.com/SchmerZ/mc-bird</StyledAnchor>
      </LinkContainer>

      <LinkContainer>
        <LinkedInIcon size={iconSize} />
        <StyledAnchor target="__blank"
                      href="https://www.linkedin.com/in/vadimsheydakov/">https://www.linkedin.com/in/vadimsheydakov/</StyledAnchor>
      </LinkContainer>
    </Fragment>
  )
};

export default Links
