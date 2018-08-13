import React from 'react';
import {storiesOf} from '@storybook/react';
//import { action } from '@storybook/addon-actions';

import WaitButton from '../../../src/client/components/buttons/wait-button';

storiesOf('WaitButton', module)
  .add('Primary button', () => (
    <WaitButton busyChildren="Processing...">Button</WaitButton>)
  )
  .add('Primary disabled button', () => (
    <WaitButton disabled busyChildren="Processing...">Button</WaitButton>)
  )
  .add('Disabled button', () => (
    <WaitButton busy busyChildren="Processing...">Button</WaitButton>
  ));