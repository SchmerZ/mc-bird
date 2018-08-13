import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components';

const StyledButton = styled.button`
  height: 50px;
  border-radius: 2px;
  /*text-transform: uppercase;*/
  letter-spacing: 1px;
  padding: 6px 12px;
  user-select: none;
  font-family: 'Lota',sans-serif;
  
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? '.65' : ''};
  
  :hover {
    transition: background-color .15s ease-in-out,border-color .15s ease-in-out,color .15s ease-in-out;
    box-shadow: ${props => props.disabled ? 'none' : '0 7px 14px rgba(36,129,215,0.1), 0 3px 6px rgba(36,129,215,0.08)'};
  }
  
  :focus {
    outline: none;
  }
  
  :active {
    box-shadow: none;
  }
`;

const PrimaryButton = styled(StyledButton)`
  background: #3f90dc;
  color: #fff;
  font-size: 14px;
  border: 0;
  
  :hover {
    background-color: #28a7db;
  }
`;

const DisabledButton = styled(PrimaryButton)`
  background: tomato;
`;

const Button = (props) => {
  const {size, disabled, children, ...rest} = props;

  return (
    <PrimaryButton disabled={disabled} {...rest}>{children}</PrimaryButton>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ])
};

export default Button;