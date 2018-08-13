import React from 'react'

import Icon from './svg-icon'

const ConversationIcon = (props) => {
  return (
    <Icon viewBox="0 0 22 22" {...props}>
      <path fill="none" stroke="#2D9BF3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            d="M5.6,15.6l-3.3,0.6v-3.4C1.5,11.6,1,10.2,1,8.6C1,4.4,4.4,1,8.6,1s7.6,3.4,7.6,7.6s-3.4,7.6-7.6,7.6C7.5,16.2,6.5,16,5.6,15.6z"/>
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            d="M19,8.3c1.2,1.4,2,3.1,2,5.1c0,1.6-0.5,3-1.3,4.2"/>
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            d="M16.4,20.4c-0.9,0.4-1.9,0.6-3,0.6c-1.8,0-3.5-0.6-4.8-1.7"/>
      <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                points="  19.7,17.6 19.7,21 16.4,20.4 "/>
      <circle fill="none" stroke="#2D9BF3" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
              cx="8.5"
              cy="8.5"
              r="0.5"/>
      <circle fill="none" stroke="#2D9BF3" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
              cx="5.5"
              cy="8.5"
              r="0.5"/>
      <circle fill="none" stroke="#2D9BF3" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
              cx="11.5"
              cy="8.5"
              r="0.5"/>
    </Icon>
  )
};

export default ConversationIcon;