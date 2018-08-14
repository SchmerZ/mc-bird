import React from 'react'
import styled from 'styled-components'

import WaitButton from '../../components/buttons/wait-button'
import SendIcon from '../../components/icons/send-icon'

const StyledWaitButton = styled(WaitButton)`
  height: 40px;
  font-weight: 600;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
`;

const StyledChatIcon = styled(SendIcon)`
  padding-right: 5px;
`;

const SendMessageButton = (props) => {
  return (
    <StyledWaitButton {...props} busyChildren="Processing...">
      <StyledChatIcon/>Send SMS
    </StyledWaitButton>
  )
};

export default SendMessageButton;