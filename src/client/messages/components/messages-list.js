import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'

import * as A from '../actions'

import FetchingFailed from './fetching-failed'

export class MessagesList extends Component {
  componentDidMount() {
    const {init} = this.props;
    init && init();
  }

  handleTryAgainClick = () => {
    const {fetch} = this.props;
    fetch && fetch();
  }

  render() {
    const {fetchingFailed} = this.props;

    return (
      <Fragment>
        {fetchingFailed && <FetchingFailed onTryAgainClick={this.handleTryAgainClick}/>}
        {!fetchingFailed && <div>messages list</div>}
      </Fragment>
    )
  }
}

MessagesList.propTypes = {
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
    }
  } = state;

  return {
    fetching,
    fetchingFailed,
    items,
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators(A, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesList)
