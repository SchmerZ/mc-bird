import React from 'react'

import Icon from './svg-icon'

const EnvelopIcon = (props) => {
  return (
    <Icon viewBox="0 0 20 20" {...props}>
      <path fill="currentColor"
            d="M18,1.5H2c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2h6v3l4-3h6c1.1,0,2-0.9,2-2v-10C20,2.4,19.1,1.5,18,1.5z M5,9.5c-0.5,0-1-0.5-1-1s0.5-1,1-1s1,0.5,1,1S5.5,9.5,5,9.5z M10,9.5c-0.5,0-1-0.5-1-1s0.5-1,1-1s1,0.5,1,1S10.5,9.5,10,9.5z M15,9.5c-0.5,0-1-0.5-1-1s0.5-1,1-1s1,0.5,1,1S15.5,9.5,15,9.5z" />
    </Icon>
  )
};

export default EnvelopIcon;
