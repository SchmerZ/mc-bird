import {css} from 'styled-components'
import {backgroundColor} from './variables'

export const body = css`
  margin: 0;
  padding-top: 0;
  font-family: 'Lota',sans-serif;
  font-size: 16px;
  color: #4a5669;
  background-color: ${backgroundColor};
  box-sizing: border-box;
  
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
`;

export const bodyBackground = css`
  width: 100%;
  overflow-x: hidden;
  margin: 0 auto;
  max-width: 1600px;
  background-color: #fff;
`;

export const bodyContent = css`
  position: relative;
  width: 100%;
  overflow-x: hidden;
  margin: 0 auto;
  max-width: 1600px;
  background-color: #fff;
  z-index: 1;
`;

export const global = css`
  @font-face {
    font-family: 'Lota';
    src: url('./fonts/LotaGrotesque-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  * {
    font-family: 'Lota', sans-serif;
    box-sizing: border-box;
  
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    font-feature-settings: "tnum" 1;
  }
  
  body {
     ${body}
   }
`;
