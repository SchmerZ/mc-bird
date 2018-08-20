import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {Anchor} from '../../components/layout/primitive'

const Container = styled.div``;

const FetchingFailed = (props) => {
  const {onTryAgainClick} = props;

  return (
    <Container>
      Unable to load messages from server. Please <Anchor onClick={onTryAgainClick}>try again</Anchor>.
    </Container>
  )
};

FetchingFailed.propTypes = {
  onTryAgainClick: PropTypes.func,
};

export default FetchingFailed;
