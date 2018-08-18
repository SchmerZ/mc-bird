import React, {Component, Fragment} from 'react'

import Button from '../../../src/client/components/buttons/button'
import Snackbar from '../../../src/client/components/snackbars/snackbar'

class SnackbarTrigger extends Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({
      open: true,
    })
  };

  handleClose = () => {
    this.setState({
      open: false,
    })
  };

  render() {
    const {open} = this.state;

    return (
      <Fragment>
        <Button onClick={this.handleClick}>Open simple snackbar</Button>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={this.handleClose}
          message={<span>Message has been sent}</span>}
        />
      </Fragment>
    )
  }
}

export default SnackbarTrigger
