import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as A from '../actions'

import ConsecutiveSnackbars from '../../components/snackbars/consecutive-snackbars'

export class AppNotification extends Component {
  render() {
    const {message} = this.props;

    return <ConsecutiveSnackbars message={message}/>
  }
}

AppNotification.propTypes = {
  message: PropTypes.string,
};

const mapStateToProps = (state) => {
  const {
    appNotification: {
      message,
    }
  } = state;

  return {
    message,
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators(A, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNotification)
