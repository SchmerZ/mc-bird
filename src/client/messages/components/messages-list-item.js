import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import moment from 'moment'

import messageType from '../../constants/message-type'
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

const RecipientTD = styled(TD)`
  overflow: hidden;
  text-overflow: ellipsis;
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
  [messageType.sent]: ArrowRight,
  [messageType.received]: ArrowLeft,
};

const statusAliasMap = {
  delivery_failed: "not delivered (failed)",
  expired: "not delivered (expired)",
  delivered: "delivered",
};

class MessagesListItem extends Component {
  getCreatedDateLabel() {
    const {item: {createdDatetime}} = this.props;

    const createdDate = moment(createdDatetime);
    const createdDateIsToday = moment().diff(createdDate, 'days') === 0;

    return createdDateIsToday ? createdDate.format('hh:mm') : createdDate.format('DD-MM-YYYY');
  }

  getStatusLabel = (status) => statusAliasMap[status] || status;

  render() {
    const {item: {body, direction, recipients: {items}}} = this.props;
    const [firstRecipient] = items;
    const {recipient, status} = firstRecipient;

    const DirectionIcon = directionMap[direction];
    const createdDateLabel = this.getCreatedDateLabel();

    const statusLabel = this.getStatusLabel(status);

    return (
      <TR>
        <TD>{DirectionIcon && <IconContainer><DirectionIcon size={20}/></IconContainer>}</TD>
        <RecipientTD>{recipient}</RecipientTD>
        <TD>{body}</TD>
        <TD>{statusLabel}</TD>
        <DateTD>{createdDateLabel}</DateTD>
      </TR>
    )
  }
}

MessagesListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MessagesListItem;
