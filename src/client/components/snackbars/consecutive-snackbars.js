import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Snackbar from './snackbar'

class ConsecutiveSnackbars extends Component {
  queue = [];

  state = {
    open: false,
    messageInfo: {},
  };

  handleClick = message => () => {
    this.queue.push({
      message,
      key: new Date().getTime(),
    });

    if (this.state.open) {
      this.setState({open: false});
    } else {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true,
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open: false});
  };

  handleExited = () => {
    this.processQueue();
  };

  render() {
    const {message, key} = this.state.messageInfo;

    return (
      <div>
        <Button onClick={this.handleClick('message a')}>Show message A</Button>
        <Button onClick={this.handleClick('message b')}>Show message B</Button>
        <Snackbar
          key={key}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          onExited={this.handleExited}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon/>
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

ConsecutiveSnackbars.propTypes = {};

export default ConsecutiveSnackbars
