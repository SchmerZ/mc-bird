import React from 'react'
import styled from 'styled-components'

import SpinnerIcon from '../../../shared/components/icons/spinner-icon'
import {color} from '../../styles/variables'

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  color: ${color.lightGray};
`;

const Spinner = () => {
  return (
    <Container>
      <SpinnerIcon size={40} />
    </Container>
  )
};

export default Spinner
