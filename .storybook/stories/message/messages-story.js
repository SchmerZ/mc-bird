import React, {Fragment} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import styled from 'styled-components'

import Message from '../../../src/client/components/message/message';
import SendMessageText from '../../../src/client/components/message/send-message-text';
import MessagesList from './massages-list'

const Container = styled.div`
  margin: 30px 10px 10px 10px;
  max-width: 300px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
  font-weight: 300;
`;

const SendMessageContainer = styled.div`
  margin: 20px 0 20px 20px;
`;

const SendMessageTextContainer = styled.div`
  max-width: 500px;
`;

storiesOf('Message', module)
  .add('basic', () => (
    <Container>
      <Message>
        CSS-in-JS or CSS Modules, that is the question.
      </Message>
      <Message type={Message.types.right}>
        From one hand CSS <strong>CSS-in-JS</strong>
      </Message>
    </Container>))
  .add('Messages list', () => (<MessagesList/>))
  .add('Send message text', () => (
    <SendMessageContainer>
      <Title>Message</Title>
      <SendMessageTextContainer>
        <SendMessageText onChange={action('text-changed')}/>
      </SendMessageTextContainer>

      <Title>Message with error</Title>
      <SendMessageTextContainer>
        <SendMessageText error='Invalid message'/>
      </SendMessageTextContainer>

      <Title>Message with value</Title>
      <SendMessageTextContainer>
        <SendMessageText value="with some text value"/>
      </SendMessageTextContainer>
    </SendMessageContainer>
  ));