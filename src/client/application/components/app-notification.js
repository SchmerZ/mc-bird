import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as A from '../actions'

import ConsecutiveSnackbars from '../../components/snackbars/consecutive-snackbars'

export class AppNotification extends Component {
  handleMessageExited = () => {
    this.props.messageClose();
  };

  render() {
    const {messages} = this.props;

    return (
      <ConsecutiveSnackbars
        messages={messages}
        onExited={this.handleMessageExited}
      />
    )
  }
}

AppNotification.propTypes = {
  messages: PropTypes.array,
  messageClose: PropTypes.func,
};

const mapStateToProps = (state) => {
  const {application: {messages}} = state;

  return {
    messages,
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators(A, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNotification)
