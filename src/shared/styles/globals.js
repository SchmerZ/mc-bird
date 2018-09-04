import {injectGlobal} from 'styled-components'
import {backgroundColor} from './variables'

export const globalStyles = () => injectGlobal`
  * {
    font-family: 'Lota', sans-serif;
    box-sizing: border-box;
  
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    font-feature-settings: "tnum" 1;
  }
  
  body {
    margin: 0;
    padding-top: 0;
    font-family: 'Lota',sans-serif;
    font-size: 16px;
    color: #4a5669;
    background-color: ${backgroundColor};
    box-sizing: border-box;
    
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
   }
`;
