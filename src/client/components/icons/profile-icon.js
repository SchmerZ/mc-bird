import React from 'react'

import Icon from './svg-icon'

const ProfileIcon = (props) => {
  return (
    <Icon viewBox="0 0 22 22" {...props}>
      <polyline
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        points="  14,19 14,21 1,21 1,1 14,1 14,4 "/>
      <line
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        x1="4" y1="5" x2="11" y2="5"/>
      <line
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        x1="4" y1="8" x2="9" y2="8"/>
      <line
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        x1="4" y1="14" x2="8" y2="14"/>
      <line
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        x1="4" y1="17" x2="7" y2="17"/>
      <circle
        fill="none" stroke="#2D9BF3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        cx="16" cy="9" r="2"/>
      <path
        fill="none" stroke="#2D9BF3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        d="M11,17  L11,17c0-1.7,1.3-3,3-3h4c1.7,0,3,1.3,3,3v0"/>
    </Icon>
  )
};

export default ProfileIcon;