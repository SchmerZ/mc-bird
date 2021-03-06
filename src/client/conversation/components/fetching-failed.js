import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {Anchor} from '../../components/styled/primitive'

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.span`
  text-align: center;
`;

const FetchingFailed = (props) => {
  const {onTryAgainClick} = props;

  return (
    <Container>
      <TextContainer>
        Unable to load messages from server. Please <Anchor onClick={onTryAgainClick}>try again</Anchor>.
      </TextContainer>
    </Container>
  )
};

FetchingFailed.propTypes = {
  onTryAgainClick: PropTypes.func,
};

export default FetchingFailed;
