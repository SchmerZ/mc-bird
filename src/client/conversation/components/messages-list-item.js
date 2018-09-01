import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'

import {color} from '../../styles/variables'
import Message from '../../components/message/message'
import {fadeInUp} from '../../styles/animations'

import messageTypes from '../../constants/message-type'

const AnimatedContainer = styled.div`
  margin: 0 20px 0 20px;
  animation: ${fadeInUp} 1s;
  display: flex;
  justify-content: ${props => props.type === Message.types.left ? 'flex-start' : 'flex-end'};
`;

const DateLabelContainer = styled.div`
  font-size: 10px;
  color: ${color.lightGray};
`;

class MessagesListItem extends Component {
  render() {
    const {item} = this.props;
    const {body, direction, createdDatetime} = item;

    const type = direction === messageTypes.received
      ? Message.types.right
      : Message.types.left;

    const createDateLabel = moment(createdDatetime).format('DD-MM-YYYY, hh:mm');

    return (
      <AnimatedContainer type={type}>
        <Message type={type}>
          {body}
          <DateLabelContainer>
            {createDateLabel}
          </DateLabelContainer>
        </Message>
      </AnimatedContainer>
    )
  }
}

MessagesListItem.propTypes = {
  item: PropTypes.shape({
    body: PropTypes.string,
    direction: PropTypes.string,
    createdDatetime: PropTypes.string,
  })
};

export default MessagesListItem;
