import {keyframes} from 'styled-components'

export const fadeInUp = keyframes`
  0% {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0)
      }
  
  to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
  }`;

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

// @keyframes fadeInUp {
//   0% {
//     opacity: 0;
//   -webkit-transform: translateY(10%);
//   transform: translateY(10%)
// }
//
//   to {
//     opacity: 1;
//     -webkit-transform: translateY(0%);
//     transform: translateY(0%)
//   }
// }