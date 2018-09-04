import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'

import * as A from '../actions'

import {color, border} from '../../styles/variables'
import {media} from '../../../shared/components/styled/media'

import Spinner from './spinner'
import FetchingFailed from './fetching-failed'
import NoItems from './no-items'

import TextField from '../../components/text-field/text-field'
import Button from '../../components/buttons/button'
import ListItem from './messages-list-item'
import {Anchor} from '../../components/styled/primitive'

import {SELECTORS} from '../reducer'

const RootContainer = styled.div`
  position: relative;
`;

const Title = styled.h4`
  margin: 0;
  padding: 10px 0 10px 0;
  border-top: ${border.solidGrey};
  text-align: center;
`;

const BackToContactsContainer = styled.div`
  font-size: 14px;
`;

const Content = styled.div`
  font-size: 14px;
  
  margin-right: auto;
  margin-left: auto;
  
  ${media.tablet`width: 350px;`}
  ${media.desktop`width: 530px;`}
  
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  min-height: 380px;
  border-radius: 10px;
  box-shadow: 0 6px 25px 0 #d9e5f1, inset 2px -5px 25px 0 #e5f0fa66;
`;

const MessagesSection = styled.div`
  display: flex;
  padding: 15px;
  flex-grow: 1;
`;

const MessagesContainer = styled.div`
  width: 100%;
  max-height: 400px;
  overflow: hidden;
  overflow-y: auto;
`;

const TextFieldSection = styled.div`
  border-top: 1px solid ${color.lightWhite};
  padding: 10px;
  display: flex;
`;

const Input = styled(TextField)`
  flex-grow: 1;
`;

const StyledButton = styled(Button)`
  height: 40px;
`;

export class Conversation extends Component {
  componentDidMount() {
    const {init, match} = this.props;

    init && init({match});
  }

  componentDidUpdate() {
    this.scrollToLastMessage();
  }

  componentWillUnmount() {
    const {leave} = this.props;

    leave && leave();
  }

  scrollToLastMessage = () => {
    const element = document.querySelector('[data-conversation-message]:last-child');

    if (element) element.scrollIntoView();
  };

  handleTryAgainClick = () => {
    const {fetch} = this.props;

    fetch && fetch();
  };

  handleTextChanged = (value) => {
    const {changeTypedText} = this.props;
    changeTypedText && changeTypedText(value);
  };

  handleTextKeyDown = (e) => {
    const {send} = this.props;

    if (send && e.keyCode === 13) { //enter
      send();
    }
  };

  handleBackToContactsClick = () => {
    const {backToContacts} = this.props;

    backToContacts && backToContacts();
  };

  handleSendMessageClick = () => {
    const {send, error, contact} = this.props;
    if (!!error || !contact) return;

    send && send();
  };

  render() {
    const {
      msisdn,
      contact,
      fetching,
      fetchingFailed,
      messages,
      typedText,
      error,
    } = this.props;

    const hasItems = messages && !!messages.length;
    const noItems = !fetching && !fetchingFailed && !hasItems;
    const displayItems = !fetchingFailed && hasItems;

    const title = contact ? `${contact.firstName} ${contact.lastName} (${msisdn})` : msisdn;

    return (
      <RootContainer>
        <Title>
          Conversation with {title}
          <BackToContactsContainer>
            <Anchor onClick={this.handleBackToContactsClick}>(back to contacts)</Anchor>
          </BackToContactsContainer>
        </Title>
        <Content>
          <MessagesSection>
            {fetching && <Spinner />}
            {fetchingFailed && <FetchingFailed onTryAgainClick={this.handleTryAgainClick} />}
            {noItems && <NoItems onTryAgainClick={this.handleTryAgainClick} />}

            {displayItems && (
              <MessagesContainer>
                {messages.map((x) => <ListItem key={x.id} item={x} />)}
              </MessagesContainer>
            )}
          </MessagesSection>
          <TextFieldSection>
            <Input
              error={error}
              placeholder="Type a message"
              value={typedText}
              onChange={this.handleTextChanged}
              onKeyDown={this.handleTextKeyDown}
            />
            <StyledButton onClick={this.handleSendMessageClick}>Send</StyledButton>
          </TextFieldSection>
        </Content>
      </RootContainer>
    )
  }
}

Conversation.propTypes = {
  match: PropTypes.object,
  msisdn: PropTypes.string,
  typedText: PropTypes.string,
  contact: PropTypes.object,
  messages: PropTypes.array,
  fetching: PropTypes.bool,
  fetchingFailed: PropTypes.bool,
  error: PropTypes.string,

  init: PropTypes.func,
  fetch: PropTypes.func,
  leave: PropTypes.func,
  changeTypedText: PropTypes.func,
};

const mapStateToProps = (state) => {
  const messages = SELECTORS.getItemsInReverseOrder(state);

  const {
    conversation: {
      error,
      msisdn,
      typedText,
      contact,
      fetching,
      fetchingFailed,
    },
  } = state;

  return {
    error,
    msisdn,
    typedText,
    contact,
    fetching,
    fetchingFailed,
    messages,
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators(A, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Conversation)
