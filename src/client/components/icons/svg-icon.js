import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const Svg = styled.svg`
  flex-shrink: 0;
  height: ${({height}) => height ? `${height}px` : '24px'};
`;

const Icon = (props) => {
  const {viewBox, children, height, ...rest} = props;

  return (
    <Svg height={height} {...rest} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
      {children}
    </Svg>
  )
};

Icon.propTypes = {
  viewBox: PropTypes.string,
  height: PropTypes.number,
  children: PropTypes.node,
};

export default Icon;
