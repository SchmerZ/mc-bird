import React, {Component} from 'react';
import PropTypes from 'prop-types'

import Snackbar from './snackbar'
import VariantSnackbarContent from './variant-snackbar-content'

class ConsecutiveSnackbars extends Component {
  state = {
    closing: false,
    open: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.closing)
      return {closing: false};

    const {messages} = nextProps;
    if (!messages || !messages.length)
      return {open: false};

    return {open: !prevState.open};
  }

  handleClose = () => {
    this.setState({open: false, closing: true});
  };

  handleExited = () => {
    const {onExited} = this.props;
    onExited && onExited();
  };

  render() {
    const {messages} = this.props;
    const [first = {}] = messages;
    const {message, type = VariantSnackbarContent.variant.info} = first;

    return (
      <Snackbar
        open={this.state.open}
        autoHideDuration={3000}
        onClose={this.handleClose}
        onExited={this.handleExited}
      >
        <VariantSnackbarContent
          variant={type}
          content={message}
          onClick={this.handleClose}/>
      </Snackbar>
    );
  }
}

ConsecutiveSnackbars.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ])),
};

export default ConsecutiveSnackbars
