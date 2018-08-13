import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {Row, Column} from '../../components/layout/responsive'
import TextField from '../../components/text-field/text-field'
import SendMessageText from '../../components/message/send-message-text'
import SendSmsButton from '../../components/buttons/send-sms-button'

const SendMessageTextColumn = styled(Column)`
  margin-bottom: 15px;
`;

const SendSmsButtonContainer = styled.div`
  text-align: right;
  padding-right: 15px;
`;

class QuicklySendSmsForm extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Column md={6}>
            <TextField placeholder="Recipient"/>
          </Column>
          <Column md={6}>
            <TextField placeholder="Originator"/>
          </Column>
        </Row>
        <Row>
          <SendMessageTextColumn md={12}>
            <SendMessageText/>
          </SendMessageTextColumn>
        </Row>
        <Row>
          <SendSmsButtonContainer>
            <SendSmsButton/>
          </SendSmsButtonContainer>
        </Row>
      </Fragment>
    )
  }
}

export default QuicklySendSmsForm