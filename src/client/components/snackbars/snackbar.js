import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components'
import withAnimation from '../styled/with-animation'

import SnackbarContent from './snackbar-content';

const Container = styled.div`
  position: fixed;
  top: 24px;
  left: auto;
  right: 0;
`;

const WithAnimationContainer = withAnimation(Container, {
  transition: ".25s cubic-bezier(.4,0,1,1) 0ms",
  animate: {
    transform: ["translateX(100%)", "translateX(0)"]
  }
});

class Snackbar extends Component {
  timerAutoHide = null;

  state = {};

  componentDidMount() {
    if (this.props.open) {
      this.setAutoHideTimer();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      if (this.props.open) {
        this.setAutoHideTimer();
      } else {
        clearTimeout(this.timerAutoHide);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerAutoHide);
  }

  setAutoHideTimer(autoHideDuration) {
    const autoHideDurationBefore = autoHideDuration != null
      ? autoHideDuration
      : this.props.autoHideDuration;

    if (!this.props.onClose || autoHideDurationBefore == null) return;

    clearTimeout(this.timerAutoHide);

    this.timerAutoHide = setTimeout(() => {
      const autoHideDurationAfter = autoHideDuration != null
        ? autoHideDuration
        : this.props.autoHideDuration;

      if (!this.props.onClose || autoHideDurationAfter == null) return;

      this.props.onClose(null, 'timeout');
    }, autoHideDurationBefore);
  }

  handleMouseEnter = () => {
    clearTimeout(this.timerAutoHide);
  };

  handleMouseLeave = () => {
    if (this.props.autoHideDuration !== null) {
      this.setAutoHideTimer(this.props.autoHideDuration * 0.5);
    }
  };

  render() {
    const {
      children,
      message,
      onEnter,
      onEntered,
      onEntering,
      onExit,
      onExited,
      onExiting,
      open,
      ...rest
    } = this.props;

    const transitionProps = {
      onEnter,
      onEntered,
      onEntering,
      onExit,
      onExited,
      onExiting,
    };

    return (
      <WithAnimationContainer
        in={open}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...transitionProps}
      >
        {children || <SnackbarContent content={message}/>}
      </WithAnimationContainer>
    );
  }
}

Snackbar.propTypes = {
  open: PropTypes.bool,
  autoHideDuration: PropTypes.number,
  children: PropTypes.element,
  message: PropTypes.node,

  onClose: PropTypes.func,
  onEnter: PropTypes.func,
  onEntered: PropTypes.func,
  onEntering: PropTypes.func,
  onExit: PropTypes.func,
  onExited: PropTypes.func,
  onExiting: PropTypes.func,
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({enter: PropTypes.number, exit: PropTypes.number}),
  ]),
};

Snackbar.defaultProps = {};

export default Snackbar
