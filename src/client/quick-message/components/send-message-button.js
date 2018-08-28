import React from 'react'
import styled from 'styled-components'

import WaitButton from '../../components/buttons/wait-button'
import SendIcon from '../../components/icons/send-icon'

const StyledWaitButton = styled(WaitButton)`
  height: 40px;
  width: 150px;
  font-weight: 600;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
`;

const StyledIcon = styled(SendIcon)`
  padding-right: 5px;
`;

const SendMessageButton = (props) => {
  return (
    <StyledWaitButton {...props} busyChildren="Processing...">
      <StyledIcon/>Send SMS
    </StyledWaitButton>
  )
};

export default SendMessageButton;
