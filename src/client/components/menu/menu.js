import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types'

import styled from 'styled-components'

import Item from './menu-item'
import {SmsIcon, ConversationIcon, MessageIcon, ProfileIcon} from '../icons'

import navigationRoutes from '../../constants/navigation-routes'
import * as A from "../../application/actions";

const Title = styled.span`
  margin-left: 10px;
`;

const ListItems = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  
  ${Title} {
    display: none;
    
    @media (min-width: 476px) {
      display: block;
    }
  }
`;

const StyledSmsIcon = styled(SmsIcon)`
  vertical-align: sub;
`;

const StyledMessageIcon = styled(MessageIcon)`
  vertical-align: sub;
`;

const StyledConversationIcon = styled(ConversationIcon)`
  vertical-align: sub;
`;

const StyledProfileIcon = styled(ProfileIcon)`
  vertical-align: sub;
`;

export const Menu = (props) => {
  const {active, onChange} = props;

  const handleMenuItemClick = (routeId) => {
    onChange && onChange(routeId);
  };

  return (
    <ListItems>
      <Item id={navigationRoutes.quicklySendMessage}
            active={active === navigationRoutes.quicklySendMessage}
            onClick={handleMenuItemClick}
      >
        <StyledSmsIcon />
        <Title>Quickly send SMS</Title>
      </Item>
      <Item id={navigationRoutes.messages}
            active={active === navigationRoutes.messages}
            onClick={handleMenuItemClick}
      >
        <StyledMessageIcon />
        <Title>Messages</Title>
      </Item>
      <Item id={navigationRoutes.contacts}
            active={active === navigationRoutes.contacts}
            onClick={handleMenuItemClick}
      >
        <StyledConversationIcon />
        <Title>Conversations</Title>
      </Item>
      <Item id={navigationRoutes.about}
            active={active === navigationRoutes.about}
            onClick={handleMenuItemClick}
      >
        <StyledProfileIcon />
        <Title>About</Title>
      </Item>
    </ListItems>
  )
};

Menu.propTypes = {
  active: PropTypes.string,
  onChange: PropTypes.func,
};

const mapStateToProps = (state) => {
  const {router: {location: {pathname}}} = state;

  return {
    active: pathname,
  }
};

const mapDispatchToProps = (dispatch) => {
  const {navigateTo} = bindActionCreators(A, dispatch);

  return {onChange: navigateTo};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)
