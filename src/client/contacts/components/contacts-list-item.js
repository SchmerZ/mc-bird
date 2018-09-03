import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {Table} from '../../components/styled/table'
import MessagesCounter from "./messages-counter";

const TD = styled(Table.td)`
  border-right: 0;
`;

const ActionsTD = styled(TD)`
  text-align: right;
`;

class ContactsListItem extends Component {
  handleMessagesCounterClick = () => {
    const {item: {msisdn}, onMessagesClick} = this.props;

    onMessagesClick && onMessagesClick({msisdn});
  };

  render() {
    const {item: {msisdn, firstName, lastName, messages: {totalCount}}} = this.props;
    const fullName = `${firstName} ${lastName}`;

    return (
      <Table.tr>
        <TD>{fullName}</TD>
        <TD>{msisdn}</TD>
        <ActionsTD>
          <MessagesCounter counter={totalCount} onClick={this.handleMessagesCounterClick} />
        </ActionsTD>
      </Table.tr>
    )
  }
}

ContactsListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onMessagesClick: PropTypes.func,
};

export default ContactsListItem;
