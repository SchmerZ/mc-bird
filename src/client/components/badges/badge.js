import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import {color} from '../../styles/variables'

const Container = styled.span`
  display: inline-flex;
  position: relative;
  vertical-align: middle;
  
  ${props => props.classes}
}`;

const BadgeContentContainer = styled.span`
  color: #fff;
  background-color: ${color.primary};
    
  top: -11px;
  width: 22px;
  right: -11px;
  height: 22px;
  display: flex;
  z-index: 1;
  position: absolute;
  flex-wrap: wrap;
  font-size: 0.75rem;
  align-items: center;
  border-radius: 50%;
  align-content: center;
  flex-direction: row;
  justify-content: center;
  
  ${props => props.badgeContentClasses}
`;

const Badge = (props) => {
  const {children, badgeContent, badgeContentClasses, ...rest} = props;

  return (
    <Container {...rest}>
      {children}
      <BadgeContentContainer badgeContentClasses={badgeContentClasses}>{badgeContent}</BadgeContentContainer>
    </Container>
  );
};

Badge.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  badgeContent: PropTypes.node,
  classes: PropTypes.array,
  badgeContentClasses: PropTypes.array,
};

export default Badge
