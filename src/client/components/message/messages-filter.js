import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

import messagesFilters from '../../constants/status-filters'

const LI = styled.li`
  white-space: nowrap;
`;

const UL = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  
  ${LI} {
    :first-of-type {
      margin-left: 0;
    }
    
    margin-left: 10px;
  }
`;

const activeCss = css`
  color: #2c3644;
  background-color: #e5edf3;
`;

const Anchor = styled.a`
  border-radius: 4px;
  padding: 1px 15px;
  color: #687992;
  font-size: 14px;
  font-weight: 600;
  line-height: 32px;
  height: 32px;
  cursor: pointer;
  display: block;  
  
  ${props => props.active ? activeCss : ''}
  
  :hover {
      ${activeCss}
    }
`;

export class MessagesFilter extends Component {
  handleClick = (id) => {
    const {onChange} = this.props;

    onChange && onChange(id);
  };

  render() {
    const {active, ...rest} = this.props;

    return (
      <UL {...rest}>
        <LI onClick={() => this.handleClick(messagesFilters.all)}>
          <Anchor active={active === messagesFilters.all}>All messages</Anchor>
        </LI>
        <LI onClick={() => this.handleClick(messagesFilters.received)}>
          <Anchor active={active === messagesFilters.received}>Received</Anchor>
        </LI>
        <LI onClick={() => this.handleClick(messagesFilters.sent)}>
          <Anchor active={active === messagesFilters.sent}>Sent</Anchor>
        </LI>
      </UL>
    )
  }
}

MessagesFilter.propTypes = {
  active: PropTypes.oneOf([
    messagesFilters.all,
    messagesFilters.received,
    messagesFilters.sent,
  ]),

  onChange: PropTypes.func,
};

export default MessagesFilter
