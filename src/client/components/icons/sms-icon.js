import React from 'react'

import Icon from './svg-icon'

const SmsIcon = (props) => {
  return (
    <Icon viewBox="0 0 22 22" {...props}>
      <g xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="currentColor"
              d="M2.7 16.5C1.6 14.9 1 13 1 11 1 5.5 5.5 1 11 1s10 4.5 10 10-4.5 10-10 10c-1.4 0-2.7-.3-4-.8"/>
        <path stroke="currentColor" d="M2.7 16.5V21l4.3-.8"/>
        <path stroke="#2d9bf3" d="M15.3 9.2H6.7 11zM6.5 13.7H12"/>
      </g>
    </Icon>
  )
};

export default SmsIcon;