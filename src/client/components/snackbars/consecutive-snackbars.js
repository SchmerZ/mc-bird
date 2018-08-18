import React, {Component} from 'react';

import Snackbar from './snackbar'

class ConsecutiveSnackbars extends Component {
  queue = [];

  state = {
    open: false,
    messageInfo: {},
  };

  componentDidUpdate(prevProps) {
    if (!this.props.message || prevProps.message === this.props.message)
      return;

    this.queue.push({
      message: this.props.message,
      key: new Date().getTime(),
    });

    if (this.state.open) {
      this.setState({open: false});
    } else {
      this.processQueue();
    }
  }

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true,
      });
    }
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleExited = () => {
    this.processQueue();
  };

  render() {
    const {messageInfo: {message, key}} = this.state;

    return (
      <Snackbar
        open={this.state.open}
        autoHideDuration={3000}
        onClose={this.handleClose}
        onExited={this.handleExited}
        message={<span>{message}</span>}
      />
    );
  }
}

ConsecutiveSnackbars.propTypes = {};

export default ConsecutiveSnackbars
