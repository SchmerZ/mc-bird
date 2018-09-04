import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import Icon from './svg-icon'
import {rotate360} from '../../styles/animations'

const StyledIcon = styled(Icon)`
  height: ${({size}) => `${size}px`};
  overflow: visible;
`;

const Circle = styled.circle`
  animation: ${rotate360} 1.4s ease-in-out infinite;
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin:  center;  
`;

const SpinnerIcon = (props) => {
  const {thick, ...rest} = props;

  return (
    <StyledIcon viewBox="0 0 66 66" {...rest}>
      <Circle fill="none"
              stroke="currentColor"
              strokeWidth={thick}
              strokeLinecap="round"
              cx="33"
              cy="33"
              r="30"
      />
    </StyledIcon>
  )
};

SpinnerIcon.propTypes = {
  thick: PropTypes.number,
};

SpinnerIcon.defaultProps = {
  thick: 6,
  size: 24,
};

export default SpinnerIcon;
