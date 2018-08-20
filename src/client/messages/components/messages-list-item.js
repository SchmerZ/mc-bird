import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {ArrowRight, ArrowLeft} from '../../components/icons'

const TD = styled.td`
  padding: 10px 10px 5px;
  border-top: 0;
  border-bottom: 2px solid #ecf2fc;
  border-right: 2px solid #ecf2fc;
  vertical-align: middle;
  
  word-break: keep-all;
  white-space: pre-line;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DateTD = styled(TD)`
  text-align: right;
`;

const TR = styled.tr`
  ${TD}:last-child {
    border-right: 0;
  }
  
  &:last-child {
    ${TD} {
      border-bottom: 0;
    }
  }
`;

const directionMap = {
  /**
   *  mt: mobile terminated (sent to mobile)
   */
  "mt": ArrowRight,

  /**
   * mo: mobile originated (received from mobile)
   */
  "mo": ArrowLeft,
};

class MessagesListItem extends Component {
  render() {
    const {item: {body, createdDatetime, direction, recipients: {items}}} = this.props;
    const [firstRecipient] = items;
    const {recipient, status} = firstRecipient;

    const DirectionIcon = directionMap[direction];

    return (
      <TR>
        <TD>{DirectionIcon && <IconContainer><DirectionIcon size={20}/></IconContainer>}</TD>
        <TD>{recipient}</TD>
        <TD>{body}</TD>
        <TD>{status}</TD>
        <DateTD>{createdDatetime}</DateTD>
      </TR>
    )
  }
}

MessagesListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MessagesListItem;
