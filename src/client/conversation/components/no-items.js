import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Anchor} from "../../components/styled/primitive";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.span`
  text-align: center;
`;

const NoItems = (props) => {
  const {onTryAgainClick} = props;

  return (
    <Container>
      <TextContainer>
        Unfortunately, no messages were found. You can <Anchor onClick={onTryAgainClick}>try again</Anchor>.
      </TextContainer>
    </Container>
  )
};

NoItems.propTypes = {
  onTryAgainClick: PropTypes.func,
};

export default NoItems;
