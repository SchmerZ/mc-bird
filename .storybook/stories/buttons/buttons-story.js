import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import styled from 'styled-components'
import Button from '../../../src/client/components/buttons/button';
import SendMessageButton from '../../../src/client/quick-message/components/send-message-button';

const Container = styled.div`
  margin: 30px 10px 10px 10px;
`;

storiesOf('Buttons', module)
  .add('Primary button', () => (
    <Container>
      <Button onClick={action('click')}>Button</Button>
    </Container>))
  .add('Disabled button', () => (
    <Button disabled>Disabled Button</Button>
  ))
  .add('Send message button', () => (
    <Container>
      <div>
        <SendMessageButton />
      </div>
      <div>
        <SendMessageButton busy />
      </div>
    </Container>
  ));
