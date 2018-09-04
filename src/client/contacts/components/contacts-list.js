import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'

import * as A from '../actions'

import {color} from '../../styles/variables'
import {TableColumn as Col} from '../../../shared/components/layout/responsive'

import {SpinnerIcon} from '../../components/icons'
import FetchingFailed from './fetching-failed'
import NoItems from './no-items'
import ListItem from './contacts-list-item'
import Foot from './contacts-list-foot'

import {Table} from '../../components/styled/table'

const Container = styled.div`
  position: relative;
  min-height: 100px;
`;

const FetchingSpinnerIcon = styled(SpinnerIcon)`
  position: absolute;
  left: 50%;
  top: 50px;
  color: ${color.lightGray};
`;

export class ContactsList extends Component {
  componentDidMount() {
    const {init} = this.props;

    init && init();
  }

  componentWillUnmount() {
    const {leave} = this.props;

    leave && leave();
  }

  handleTryAgainClick = () => {
    const {fetch, offset} = this.props;

    fetch && fetch({offset});
  };

  render() {
    const {
      fetching, fetchingFailed,
      contacts,
      totalCount, offset,
      prevPage, nextPage,
      limit,
      selectContact,
    } = this.props;

    const items = Object.values(contacts);
    const hasItems = items && !!items.length;
    const displayNoItems = !fetching && !fetchingFailed && !hasItems;
    const displayItems = !fetchingFailed && hasItems;

    return (
      <Container>
        {fetching && <FetchingSpinnerIcon size={40} />}
        <Table fetching={fetching}>
          <colgroup>
            <Col sm={5} />
            <Col sm={6} />
            <Col sm={1} />
          </colgroup>
          <Table.thead>
            <tr>
              <Table.th>Contact</Table.th>
              <Table.th>Phone</Table.th>
              <Table.th />
            </tr>
          </Table.thead>
          <Table.tbody>
            {fetchingFailed && <FetchingFailed onTryAgainClick={this.handleTryAgainClick} />}
            {displayNoItems && <NoItems onTryAgainClick={this.handleTryAgainClick} />}
            {displayItems && items.map(x => <ListItem key={x.id} item={x} onMessagesClick={selectContact} />)}
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

ContactsList.propTypes = {
  contacts: PropTypes.object,
  totalCount: PropTypes.number,
  limit: PropTypes.number,
  offset: PropTypes.number,
  fetching: PropTypes.bool,
  fetchingFailed: PropTypes.bool,

  init: PropTypes.func,
  leave: PropTypes.func,
  fetch: PropTypes.func,
  prevPage: PropTypes.func,
  nextPage: PropTypes.func,
  selectContact: PropTypes.func,
};

const mapStateToProps = (state) => {
  const {
    contactsList: {
      fetching,
      fetchingFailed,
      contacts,
      totalCount,
      offset,
      limit,
    },
  } = state;

  return {
    fetching,
    fetchingFailed,
    contacts,
    totalCount,
    offset,
    limit,
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators(A, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsList)
