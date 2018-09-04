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

export const fadeIn = keyframes`
  from {opacity: 0;}
  to {opacity: 1;}
`;
