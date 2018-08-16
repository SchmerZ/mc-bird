import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TextContainer = styled.div`
  opacity: 0;  
  transition: opacity .3s cubic-bezier(.4,0,1,1) 0ms;
  
  color: #fff;
  height: 48px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 400;
  letter-spacing: .03125em;
  text-decoration: inherit;
  text-transform: inherit;
  margin-left: 0;
  margin-right: auto;
  display: flex;
  align-items: center;
`;

const ActionContainer = styled.div`
  color: #fff;
  padding-left: 24px;
  padding-right: 0;
  cursor: pointer;
`;

const Container = styled.div.attrs({
  'aria-hidden': props => !props.active,
})`
  top: 24px;
  right: 0;
  transform: translate(100%,0);

  transition: transform .25s cubic-bezier(.4,0,1,1) 0ms;
  
  min-width: 288px;
  max-width: 568px;
  border-radius: 2px;
  background-color: #2481d7;
  display: inline-flex;
  position: fixed;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-right: 24px;
  padding-left: 24px;
  
  &[aria-hidden="false"] > ${TextContainer} {
    opacity: 1;
  }
`;

const SnackbarContent = (props) => {
  const {children, onClick, ...rest} = props;

  return (
    <Container {...rest}>
      <TextContainer>
        {children}
      </TextContainer>
      <ActionContainer onClick={onClick}>
        Action
      </ActionContainer>
    </Container>
  )
};

SnackbarContent.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default SnackbarContent;
