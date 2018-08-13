import React from 'react'
import PropTypes from 'prop-types'

import Button from './button'

const WaitButton = (props) => {
  const {busy, busyChildren, children, onClick, ...rest} = props;

  const handleClick = (...args) => {
    !busy && onClick && onClick(...args);
  };

  return (
    <Button disabled={busy} onClick={handleClick} {...rest}>
      {busy ? (busyChildren || children) : children}
    </Button>
  )
};

WaitButton.propTypes = {
  busy: PropTypes.bool,
  children: PropTypes.node,
  busyChildren: PropTypes.node,
  onClick: PropTypes.func,
};

WaitButton.defaultProps = {
  busy: false,
};

export default WaitButton;