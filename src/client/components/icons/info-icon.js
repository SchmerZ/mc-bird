import React from 'react'

import Icon from './svg-icon'

const InfoIcon = (props) => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path fill="none" d="M0 0h24v24H0z"/>
      <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
    </Icon>
  )
};

export default InfoIcon;
