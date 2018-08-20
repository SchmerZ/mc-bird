import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const Svg = styled.svg`
  flex-shrink: 0;
  height: ${({size}) => `${size}px`};
`;

const Icon = (props) => {
  const {viewBox, children, size, ...rest} = props;

  return (
    <Svg size={size} {...rest} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
      {children}
    </Svg>
  )
};

Icon.propTypes = {
  viewBox: PropTypes.string,
  height: PropTypes.number,
  children: PropTypes.node,
};

Icon.defaultProps = {
  size: 24,
}

export default Icon;
