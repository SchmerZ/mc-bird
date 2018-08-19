import React, {Component, Fragment} from 'react';
import styled from 'styled-components'

import Button from '../../../src/client/components/buttons/button'
import Snackbars from '../../../src/client/components/snackbars/consecutive-snackbars'

const ButtonWrapper = styled.span`
  padding-left: 6px;
`;

class ConsecutiveSnackbars extends Component {
  state = {
    messages: []
  };

  handleClick = message => () => {
    const messages = [...this.state.messages, message];
    this.setState({messages});
  };

  handleClose = () => {
    const [, ...messages] = this.state.messages;
    this.setState({messages});
  };

  render() {
    const {messages} = this.state;

    return (
      <Fragment>
        <ButtonWrapper>
          <Button onClick={this.handleClick('message a')}>Show message A</Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button onClick={this.handleClick('message b')}>Show message B</Button>
        </ButtonWrapper>
        <Snackbars messages={messages} onExited={this.handleClose}/>
      </Fragment>
    );
  }
}

ConsecutiveSnackbars.propTypes = {};

export default ConsecutiveSnackbars
