import React, {Component} from 'react'
import styled from 'styled-components'

import TextField from '../../../src/client/components/text-field/text-field'
import Button from '../../../src/client/components/buttons/button'
import Message from '../../../src/client/components/message/message';

import {fadeInUp} from "../../../src/client/styles/animations";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 320px;
  min-height: 380px;
  border-radius: 10px;
  box-shadow: 0 6px 25px 0 #d9e5f1, inset 2px -5px 25px 0 rgba(229,240,250,.4);
`;

const MessagesContainer = styled.div`
  padding: 15px;
  flex-grow: 1;
`;

const TextFieldContainer = styled.div`
  border-top: 1px solid #ecf5fd;
  padding: 10px;
  display: flex;
`;

const Input = styled(TextField)`
  flex-grow: 1;
`;

const StyledButton = styled(Button)`
  height: 40px;
`;

const AnimatedMessage = styled(Message)`
  animation: ${fadeInUp} 1s;
`;

const initialMessages = [
  {
    type: Message.types.left,
    text: 'Your food is ready and on it’s way. It’ll be with you in 8 min!'
  },
  {
    type: Message.types.right,
    text: 'We’re on the second floor. Thanks!!'
  },
  {
    type: Message.types.left,
    text: 'Got it!'
  },
];

class MessagesList extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      messages: initialMessages,
      typedText: '',
    }
  }

  handleSendMessageClick = () => {
    const {typedText} = this.state;
    if (!typedText && !typedText.length)
      return;

    const newMessage = {
      text: typedText,
      type: Message.types.left,
    };

    this.setState(prevState => ({
      messages: [...prevState.messages, newMessage],
      typedText: ''
    }));
  };

  handleTextChanged = (value) => {
    this.setState({
      typedText: value,
    })
  };

  render() {
    const {messages, typedText} = this.state;

    return (
      <Container>
        <MessagesContainer>
          {messages.map((x, index) => (
              <AnimatedMessage key={index} type={x.type}>
                {x.text}
              </AnimatedMessage>
            )
          )}
        </MessagesContainer>
        <TextFieldContainer>
          <Input placeholder="Type a message" value={typedText} onChange={this.handleTextChanged}/>
          <StyledButton onClick={this.handleSendMessageClick}>Send</StyledButton>
        </TextFieldContainer>
      </Container>
    )
  }
}

export default MessagesList;
