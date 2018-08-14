import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import {textFieldColor, errorColor} from '../../styles/variables'

const smsTextMaxLength = 160;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  border: 2px solid ${textFieldColor.border};
  border-radius: 4px;
  
  ${({active}) => active ? `border-color: ${textFieldColor.borderActive};` : ''};
  
  padding: 10px 10px 0 10px;
  min-height: 150px;
  position: relative;
  transition: border-color .15s ease-in-out 0s, box-shadow .15s ease-in-out 0s;
`;

const TextArea = styled.textarea`
  flex-grow: 1;
  outline: 0;
  margin: 0;
  border: 0;
  resize: vertical;
  font-size: 16px;
  color: ${textFieldColor.text};
    
  ::placeholder {
    color: ${textFieldColor.placeholder};
    font-weight: 400
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Error = styled.div`
  color: ${errorColor};
`;

const CharCounter = styled.div`
`;

class SendMessageText extends PureComponent {
  state = {
    active: false
  };

  handleInputChange = (e) => {
    e.stopPropagation();

    const nextValue = e.target.value;
    const {onChange} = this.props;

    onChange && onChange(nextValue);
  };

  handleTextAreaFocus = () => {
    this.setState({active: true});
  };

  handleTextAreaBlur = () => {
    this.setState({active: false});
  };

  getCharCountLabelText = () => {
    const {value, maxLength} = this.props;
    const charsCount = value ? value.length : 0;
    const smsCount = Math.ceil(charsCount / smsTextMaxLength);

    return `${charsCount}/${maxLength}, ${smsCount} SMS`;
  };

  render() {
    const {active} = this.state;
    const {value, error, ...rest} = this.props;

    const charCountLabelText = this.getCharCountLabelText();

    return (
      <Container active={active} {...rest}>
        <TextArea value={value}
                  placeholder="Message"
                  onChange={this.handleInputChange}
                  onFocus={this.handleTextAreaFocus}
                  onBlur={this.handleTextAreaBlur}/>
        <Footer>
          <Error>{error}</Error>
          <CharCounter>{charCountLabelText}</CharCounter>
        </Footer>
      </Container>
    );
  }
}

SendMessageText.propTypes = {
  value: PropTypes.string,
  maxLength: PropTypes.number,

  onChange: PropTypes.func,
};

SendMessageText.defaultProps = {
  value: '',
  maxLength: 1377
};

export default SendMessageText;