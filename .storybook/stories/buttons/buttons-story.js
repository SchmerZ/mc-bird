import React from 'react';
import {storiesOf} from '@storybook/react';
//import { action } from '@storybook/addon-actions';

import styled from 'styled-components'
import Button from '../../../src/client/components/buttons/button';
import SendSmsButton from '../../../src/client/components/buttons/send-sms-button';

const Container = styled.div`
  margin: 30px 10px 10px 10px;
`;

storiesOf('Buttons', module)
  .add('Primary button', () => (
    <Container>
      <Button>Button</Button>
    </Container>))
  .add('Disabled button', () => (
    <Button disabled>Disabled Button</Button>
  ))
  .add('Send SMS button', () => (
    <Container>
      <SendSmsButton/>
      <SendSmsButton busy/>
    </Container>
  ));
