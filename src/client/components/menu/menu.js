import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import Item from './menu-item'
import {SmsIcon, ConversationIcon, ProfileIcon} from '../icons'

import MenuItemId from '../../constants/menu-item-id'

const ListItems = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
`;

const Title = styled.span`
  margin-left: 10px;
`;

const StyledSmsIcon = styled(SmsIcon)`
  vertical-align: sub;
`;

const StyledConversationIcon = styled(ConversationIcon)`
  vertical-align: sub;
`;

const StyledProfileIcon = styled(ProfileIcon)`
  vertical-align: sub;
`;

const Menu = (props) => {
  const {active, onClick} = props;

  return (
    <ListItems>
      <Item id={MenuItemId.quicklySendSms} active={active === MenuItemId.quicklySendSms} onClick={onClick}>
        <StyledSmsIcon/>
        <Title>Quickly send SMS</Title>
      </Item>
      <Item id={MenuItemId.conversations} active={active === MenuItemId.conversations} onClick={onClick}>
        <StyledConversationIcon/>
        <Title>Conversations</Title>
      </Item>
      <Item id={MenuItemId.about} active={active === MenuItemId.about} onClick={onClick}>
        <StyledProfileIcon/>
        <Title>About</Title>
      </Item>
    </ListItems>
  )
};

Menu.propTypes = {
  active: PropTypes.oneOf(Object.values(MenuItemId)),
  onClick: PropTypes.func,
};

export default Menu;
