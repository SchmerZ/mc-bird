import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'

import * as A from '../actions'

import {SpinnerIcon} from '../../components/icons'
import FetchingFailed from './fetching-failed'
import NoItems from './no-items'
import ListItem from './messages-list-item'

const Container = styled.div`
  position: relative;
  min-height: 100px;
`;

const FetchingSpinnerIcon = styled(SpinnerIcon)`
  position: absolute;
  left: 50%;
  top: 50px;
`;

const Table = styled.table`
  min-height: 100px;
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 14px;
`;

const Head = styled.thead`
  border-bottom: 1px dashed #d6e0f1;
`;

const Body = styled.tbody`
  opacity: ${({fetching}) => fetching ? '.5' : '1'};
`;

const TH = styled.th`
  border-top: 1px solid #ddd;
  padding: 10px 10px 5px;
  word-break: break-all;
  vertical-align: middle;
  text-align: left;
`;

const TypeCol = styled.col`
  width: 60px;
`;

export class MessagesList extends Component {
  componentDidMount() {
    const {init} = this.props;
    init && init();
  }

  handleTryAgainClick = () => {
    const {fetch} = this.props;
    fetch && fetch();
  };

  render() {
    const {fetching, fetchingFailed, items, totalCount, offset} = this.props;
    const hasItems = items && items.length;
    const displayNoItems = !fetchingFailed && !hasItems;
    const displayItems = !displayNoItems && hasItems;

    return (
      <Container>
        {fetching && <FetchingSpinnerIcon size={40}/>}
        <Table>
          <colgroup>
            <TypeCol/>
            <col/>
            <col/>
            <col/>
            <col/>
          </colgroup>
          <Head>
            <tr>
              <TH>Type</TH>
              <TH>Recipient</TH>
              <TH>Message</TH>
              <TH>Status</TH>
              <TH>Date</TH>
            </tr>
          </Head>
          <Body fetching={fetching}>
          {fetchingFailed && <FetchingFailed onTryAgainClick={this.handleTryAgainClick}/>}
          {displayNoItems && <NoItems onTryAgainClick={this.handleTryAgainClick}/>}
          {displayItems && items.map(x => <ListItem key={x.id} item={x}/>)}
          </Body>
        </Table>
      </Container>
    )
  }
}

MessagesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  totalCount: PropTypes.number,
  offset: PropTypes.number,
  fetching: PropTypes.bool,
  fetchingFailed: PropTypes.bool,

  init: PropTypes.func,
  fetch: PropTypes.func,
};

const mapStateToProps = (state) => {
  const {
    messagesList: {
      fetching,
      fetchingFailed,
      items,
      totalCount,
      offset,
    }
  } = state;

  return {
    fetching,
    fetchingFailed,
    items,
    totalCount,
    offset,
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators(A, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesList)
