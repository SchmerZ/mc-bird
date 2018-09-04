import {keyframes} from 'styled-components'

export const rotate360 = keyframes`
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(45deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(360deg);
  }
`;
