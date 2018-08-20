import React from 'react'
import PropTypes from 'prop-types'

import styled, {css} from 'styled-components'
import MenuItemId from '../../constants/navigation-routes'

const hover = css`
  :hover {
    border-top: 3px solid #febbb2;
  }
`;

const ListItem = styled.li`
  display: block;
  flex-grow: 1;
  text-align: center;  
  align-items: center;
  
  background: #fafcfe;
  color: #48578c;
  font-weight: 600;
  padding: 15px;
  cursor: pointer;
  
  border-top: ${props => props.active ? '3px solid #48578c' : '3px solid #ebf1fa'};  
  ${props => props.active ? '' : hover}
  
  :not(:last-of-type) {
    border-right: 1px solid rgba(235,241,250,.5);
  }
`;

const MenuItem = (props) => {
  const {id, children, onClick, ...rest} = props;

  const handleClick = () => {
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
