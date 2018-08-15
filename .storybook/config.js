import {configure} from '@storybook/react'
import {injectGlobal} from 'styled-components'

import '../src/client/static/fonts.css'

injectGlobal`
  body {
    background-color: #fff !important;
  }
`;

const loadStories = () => {
  require('./stories/index');
};

configure(loadStories, module);
