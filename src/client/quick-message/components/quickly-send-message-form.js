import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'

import * as A from '../actions'

import {Row, Column} from '../../../shared/components/layout/responsive'
import TextField from '../../components/text-field/text-field'
import SendMessageText from '../../components/message/send-message-text'
import SendMessageButton from './send-message-button'

const SendMessageTextColumn = styled(Column)`
  margin-bottom: 15px;
`;

const SendSmsButtonContainer = styled.div`
  text-align: right;
  padding-right: 15px;
`;

export class QuicklySendMessageForm extends Component {
  handleRecipientChange = (value) => {
    const {changeRecipient} = this.props;
    changeRecipient && changeRecipient(value);
  };

  handleMessageTextChange = (value) => {
    const {changeMessageText} = this.props;
    changeMessageText && changeMessageText(value);
  };

  handleSendMessageClick = () => {
    const {send} = this.props;
    send && send();
  };

  render() {
    const {
      recipient,
      messageText,
      sending,
      errors = {}
    } = this.props;

    const {recipientError, messageTextError} = errors;

    return (
      <Fragment>
        <Row>
          <Column md={6}>
            <TextField
              debounceTimeout={300}
              placeholder="Recipient"
              defaultValue={recipient}
              onChange={this.handleRecipientChange}
              error={recipientError}
            />
          </Column>
        </Row>
        <Row>
          <SendMessageTextColumn md={12}>
            <SendMessageText
              value={messageText}
              error={messageTextError}
              onChange={this.handleMessageTextChange}
            />
          </SendMessageTextColumn>
        </Row>
        <Row>
          <SendSmsButtonContainer>
            <SendMessageButton busy={sending} onClick={this.handleSendMessageClick} />
          </SendSmsButtonContainer>
        </Row>
      </Fragment>
    )
  }
}

QuicklySendMessageForm.propTypes = {
  recipient: PropTypes.string,
  messageText: PropTypes.string,
  sending: PropTypes.bool,
  errors: PropTypes.object,

  send: PropTypes.func,
  changeRecipient: PropTypes.func,
  changeMessageText: PropTypes.func,
};

const mapStateToProps = (state) => {
  const {
    quickMessage: {
      recipient,
      messageText,
      sending,
      errors,
    }
  } = state;

  return {
    sending,
    recipient,
    messageText,
    errors,
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators(A, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuicklySendMessageForm)
