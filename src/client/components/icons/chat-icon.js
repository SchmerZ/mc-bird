import React from 'react'

import Icon from './svg-icon'

const ChatIcon = (props) => {
  return (
    <Icon viewBox="0 0 22 22" {...props}>
      <g xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M16.4 15.6c-.9.4-1.9.6-3 .6-4.2 0-7.6-3.4-7.6-7.6C5.8 4.4 9.2 1 13.4 1 17.6 1 21 4.4 21 8.6c0 1.6-.5 3-1.3 4.2"
          stroke="#2d9bf3"/>
        <path stroke="#2d9bf3" d="M19.7 12.8v3.4l-3.3-.6"/>
        <path
          d="M3 8.3c-1.2 1.4-2 3.1-2 5.1 0 1.6.5 3 1.3 4.2M5.6 20.4c.9.4 1.9.6 3 .6 1.8 0 3.5-.6 4.8-1.7M2.3 17.6V21l3.3-.6"
          stroke="currentColor"/>
      </g>
    </Icon>
  )
};

export default ChatIcon;