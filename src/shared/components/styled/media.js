import {css} from 'styled-components'

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 376
};

export const media = Object.keys(sizes)
  .reduce((acc, label) => {
    const pxSize = sizes[label];

    acc[label] = (...args) => css`
    @media (min-width: ${pxSize}px) {
      ${css(...args)}
    }
  `;
    return acc
  }, {});
