import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import styled from 'styled-components'
import TextField from '../../../src/client/components/text-field/text-field';

const Container = styled.div`
  margin: 30px 10px 10px 10px;
  max-width: 300px;
`;

storiesOf('TextField', module)
  .add('basic', () => (
    <Container>
      <TextField
        label="Email Address"
        placeholder="Email address"
        onChange={action('change')}
        error="Email address cannot be blank"
      />
    </Container>))
  .add('with debounce', () => (
    <Container>
      <TextField
        debounceTimeout={300}
        label="With debounce = 300"
        placeholder="Email address"
        onChange={action('change')}
      />
    </Container>
  ))
  .add('disabled', () => (
    <Container>
      <TextField
        disabled
        label="Disabled TextField"
        placeholder="Email address"
        onChange={action('change')}
      />
    </Container>
  ));
