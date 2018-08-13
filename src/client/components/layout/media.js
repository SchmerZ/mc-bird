import {css} from 'styled-components'

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 376
};

export const media = Object.keys(sizes)
  .reduce((acc, label) => {
    // use em in breakpoints to work properly cross-browser and support users
    // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
    //const emSize = sizes[label] / 16;
    const pxSize = sizes[label];

    acc[label] = (...args) => css`
    @media (min-width: ${pxSize}px) {
      ${css(...args)}
    }
  `;
    return acc
  }, {});