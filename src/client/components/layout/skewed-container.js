import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  transform: skewY(-11deg);
  background: #f6fafd;
  // position: absolute;
  width: 100%;
  max-width: 1600px;
  height: ${props => props.height || ''};
  z-index: 0;
`;

const SkewedContainer = (props) => {
  const {children, ...rest} = props;

  return (
    <Container {...rest}>
      {children}
    </Container>
  );
};

export default SkewedContainer;