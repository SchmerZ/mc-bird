import React from 'react'

import Icon from './svg-icon'

const MessageIcon = (props) => {
  return (
    <Icon viewBox="0 0 22 22" {...props}>
      <g xmlns="http://www.w3.org/2000/svg" id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path d="M21,11A10,10,0,0,1,6.43,19.89H2.11V15.57A10,10,0,1,1,21,11Z"
                fill="none" stroke="currentColor"
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          <circle cx="16" cy="11" r="1"
                  fill="none" stroke="#2d9bf3"
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          <circle cx="6" cy="11" r="1"
                  fill="none" stroke="#2d9bf3"
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          <circle cx="11" cy="11" r="1"
                  fill="none" stroke="#2d9bf3"
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        </g>
      </g>
    </Icon>
  )
};

export default MessageIcon;
