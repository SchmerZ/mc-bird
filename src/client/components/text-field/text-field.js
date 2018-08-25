import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import uncontrollable from 'uncontrollable'
import styled from 'styled-components'
import {textFieldColor, errorColor} from '../../styles/variables'

const Label = styled.label`
  font-size: 12px;
  color: ${textFieldColor.label};
  padding: 0 0 2px 0;
  margin: auto;
  display: block;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  font-size: 14px;
  font-weight: 400;
  border: 1px solid #d6e0f1;
  /*border: 1px solid #eaf0fa;*/
  border-radius: 2px;

  outline: 0;
  background-image: none;
  padding: 0 2px 0 10px;
  color: ${textFieldColor.text};
  
  transition: border-color .15s ease-in-out 0s, box-shadow .15s ease-in-out 0s;
  
  &:focus {
    box-shadow: 0 4px 8px #eff6fd;
    border-color: ${textFieldColor.borderActive};
  }
  
  ::placeholder {
    color: ${textFieldColor.placeholder};
    font-weight: 400
  }
`;

const ErrorMessage = styled.span`
  color: ${errorColor};
  clear: both;
  min-height: 25px;
  margin: auto;
  display: block;
  padding: 5px 0 0 0;
  font-size: 16px;
  line-height: 1.2em;
`;

export class TextField extends PureComponent {
  debouncer = null;

  state = {
    inputText: this.props.value,
  };

  componentWillUnmount() {
    if (this.debouncer)
      clearTimeout(this.debouncer);
  }

  handleInputChange = (e) => {
    e.stopPropagation();

    const {disabled, onChange, debounceTimeout} = this.props;
    if (disabled || !onChange) return;

    const nextValue = e.target.value;

    this.setState({
      inputText: nextValue,
    }, () => {
      if (this.debouncer) {
        clearTimeout(this.debouncer);
      }

      if (debounceTimeout) {
        this.debouncer = setTimeout(onChange, debounceTimeout, this.state.inputText);
      }
      else {
        onChange(nextValue);
      }
    });
  };

  render() {
    const {disabled, label, placeholder, error, ...rest} = this.props;
    const {inputText} = this.state;

    delete rest.debounceTimeout;

    const inputProps = {
      disabled,
      placeholder,
      onChange: this.handleInputChange,
      value: inputText,
    };

    return (
      <div {...rest}>
        {label && <Label>{label}</Label>}
        <Input {...inputProps}/>
        <ErrorMessage>{error}</ErrorMessage>
      </div>
    )
  }
}

TextField.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  debounceTimeout: PropTypes.number,
  onChange: PropTypes.func,
};

TextField.defaultProps = {
  debounceTimeout: null,
  value: '',
  placeholder: '',
};

const UncontrollableTextField = uncontrollable(TextField, {
  value: 'onChange'
});

export default UncontrollableTextField;
