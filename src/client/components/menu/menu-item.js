import React from 'react'
import PropTypes from 'prop-types'

import {menuItem} from '../../styles/variables'
import styled, {css} from 'styled-components'
import MenuItemId from '../../constants/navigation-routes'

const hover = css`
  :hover {
    border-top: 3px solid ${menuItem.hoverColor};
  }
`;

const ListItem = styled.li`
  display: block;
  flex-grow: 1;
  text-align: center;  
  align-items: center;
  
  background: ${menuItem.background};
  color: ${menuItem.color};
  font-weight: 600;
  padding: 15px;
  cursor: pointer;
  
  border-top: ${props => props.active ? `3px solid ${menuItem.active}` : `3px solid ${menuItem.notActive}`};  
  ${props => props.active ? '' : hover}
  
  :not(:last-of-type) {
    border-right: 1px solid ${menuItem.border};
  }
`;

const MenuItem = (props) => {
  const {id, children, onClick, ...rest} = props;

  const handleClick = () => {
    if (props.active) return;

    onClick && onClick(id);
  };

  return (
    <ListItem {...rest} onClick={handleClick}>
      {children}
    </ListItem>
  )
};

MenuItem.propTypes = {
  id: PropTypes.oneOf(Object.values(MenuItemId)).isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default MenuItem;
