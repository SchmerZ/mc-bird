import React from 'react'
import styled from 'styled-components'

const Icon = styled.i`
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: 20px;
  text-rendering: auto;
`;

const FontIcon = (props) => <Icon {...props} />;

export default FontIcon;