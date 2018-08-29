import React from 'react';
import {shallow} from 'enzyme';

import {QuicklySendMessageForm} from '../../../src/client/quick-message/components/quickly-send-message-form';
import SendMessageButton from '../../../src/client/quick-message/components/send-message-button';

import TextField from '../../../src/client/components/text-field/text-field';
import SendMessageText from '../../../src/client/components/message/send-message-text';

describe('Quick message form', () => {
  describe('Recipient TextField', () => {
    it('should render with passed props', () => {
      const form = shallow(<QuicklySendMessageForm recipient="Recipient value"/>);
      const textField = form.find(TextField);

      expect(textField).toHaveLength(1);
      expect(textField.props()).toMatchSnapshot();
    });

    it('should pass error props if form has recipientError props', () => {
      const errors = {recipientError: 'some recipient error'};
      const form = shallow(<QuicklySendMessageForm recipient="Recipient value" errors={errors}/>);
      const textField = form.find(TextField);

      expect(textField.props().error).toEqual(errors.recipientError);
    });

    it('should rise changeRecipient props function if text has changed', () => {
      const fn = jest.fn();
      const form = shallow(<QuicklySendMessageForm changeRecipient={fn}/>);

      form.find(TextField).simulate('change', 'text');
      expect(fn).toBeCalledWith('text');
    });
  });

  describe('SendMessageText', () => {
    it('should render SendMessageText with passed props', () => {
      const form = shallow(<QuicklySendMessageForm messageText="Some message text"/>);
      const sendText = form.find(SendMessageText);

      expect(sendText).toHaveLength(1);
      expect(sendText.props()).toMatchSnapshot();
    });

    it('should pass error props if form has messageTextError props', () => {
      const errors = {messageTextError: 'some message error'};
      const form = shallow(<QuicklySendMessageForm messageText="Some message text" errors={errors}/>);
      const sendText = form.find(SendMessageText);

      expect(sendText.props().error).toEqual(errors.messageTextError);
    });

    it('should rise changeRecipient props function if text has changed', () => {
      const fn = jest.fn();
      const form = shallow(<QuicklySendMessageForm changeRecipient={fn}/>);

      form.find(TextField).simulate('change', 'text');
      expect(fn).toBeCalledWith('text');
    });
  });

  describe('SendMessage button', () => {
    it('should render SendMessageButton with passed props', () => {
      const form = shallow(<QuicklySendMessageForm sending/>);
      const button = form.find(SendMessageButton);

      expect(button).toHaveLength(1);
      expect(button.props()).toMatchSnapshot();
    });

    it('should call "send" props function on click', () => {
      const fn = jest.fn();
      const form = shallow(<QuicklySendMessageForm send={fn}/>);

      form.find(SendMessageButton).simulate('click');
      expect(fn).toBeCalledTimes(1);
    });
  });
});
