import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'

import * as A from '../actions'

import {color} from '../../styles/variables'
import {TableColumn as Col} from '../../../shared/components/layout/responsive'

import MessagesFilters from '../../components/message/messages-filter'

import {SpinnerIcon} from '../../components/icons'
import FetchingFailed from './fetching-failed'
import NoItems from './no-items'
import ListItem from './messages-list-item'
import Foot from './messages-list-foot'

import {Table} from '../../components/styled/table'

const Container = styled.div`
  position: relative;
  min-height: 150px;
`;

const FetchingSpinnerIcon = styled(SpinnerIcon)`
  position: absolute;
  left: 50%;
  top: 100px;
  color: ${color.lightGray};
`;

const Filters = styled(MessagesFilters)`
  padding-bottom: 10px;
`;

export class MessagesList extends Component {
  componentDidMount() {
    const {init} = this.props;

    init && init();
  }

  componentWillUnmount() {
    const {leave} = this.props;

    leave && leave();
  }

  handleTryAgainClick = () => {
    const {fetch, offset, statusFilter} = this.props;

    fetch && fetch({offset, status: statusFilter});
  };

  handleStatusFilterChange = (value) => {
    const {statusFilter, changeStatusFilter} = this.props;

    if (statusFilter !== value) {
      changeStatusFilter && changeStatusFilter(value)
    }
  };

  render() {
    const {
      fetching, fetchingFailed,
      items,
      totalCount, offset, statusFilter,
      prevPage, nextPage,
      limit,
    } = this.props;

    const hasItems = items && !!items.length;
    const displayNoItems = !fetching && !fetchingFailed && !hasItems;
    const displayItems = !fetchingFailed && hasItems;

    return (
      <Container>
        <Filters active={statusFilter} onChange={this.handleStatusFilterChange} />
        {fetching && <FetchingSpinnerIcon size={40} />}
        <Table fetching={fetching}>
          <colgroup>
            <Col sm={1} />
            <Col sm={2} />
            <Col sm={5} />
            <Col sm={2} />
            <Col sm={2} />
          </colgroup>
          <Table.thead>
            <tr>
              <Table.th>Type</Table.th>
              <Table.th>Recipient</Table.th>
              <Table.th>Message</Table.th>
              <Table.th>Status</Table.th>
              <Table.th>Date</Table.th>
            </tr>
          </Table.thead>
          <Table.tbody>
            {fetchingFailed && <FetchingFailed onTryAgainClick={this.handleTryAgainClick} />}
            {displayNoItems && <NoItems onTryAgainClick={this.handleTryAgainClick} />}
            {displayItems && items.map(x => <ListItem key={x.id} item={x} />)}
          </Table.tbody>
          {displayItems &&
          (
            <Foot offset={offset} itemsPerPage={limit} totalCount={totalCount}
                  onLeftArrowClick={prevPage}
                  onRightArrowClick={nextPage}
            />
          )}
        </Table>
      </Container>
    )
  }
}

MessagesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  totalCount: PropTypes.number,
  limit: PropTypes.number,
  offset: PropTypes.number,
  statusFilter: PropTypes.string,
  fetching: PropTypes.bool,
  fetchingFailed: PropTypes.bool,

  init: PropTypes.func,
  leave: PropTypes.func,
  fetch: PropTypes.func,
  prevPage: PropTypes.func,
  nextPage: PropTypes.func,
  changeStatusFilter: PropTypes.func,
};

const mapStateToProps = (state) => {
  const {
    messagesList: {
      fetching,
      fetchingFailed,
      items,
      totalCount,
      offset,
      statusFilter,
      limit,
    },
  } = state;

  return {
    fetching,
    fetchingFailed,
    items,
    totalCount,
    offset,
    statusFilter,
    limit,
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators(A, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesList)
