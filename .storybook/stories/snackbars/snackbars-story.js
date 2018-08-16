import React, {Fragment} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import styled from 'styled-components'
import SnackbarContent from '../../../src/client/components/snackbars/snackbar-content';

const Container = styled.div`
  margin: 30px 10px 10px 10px;
`;

storiesOf('Snackbars', module)
  .add('content', () => (
    <Container>
      <SnackbarContent
        content="Message has been sent"
        active
        onClick={action('snackbar-content-action-click')}/>
    </Container>));
