import React, {Fragment} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import styled from 'styled-components'
import SnackbarContent from '../../../src/client/components/snackbars/snackbar-content';
import VariantSnackbarContent from '../../../src/client/components/snackbars/variant-snackbar-content';

import SnackbarTrigger from './snackbar-trigger'
import ConsecutiveSnackbars from './consecutive-snackbars'

const Container = styled.div`
  margin: 30px 10px 10px 10px;
`;

storiesOf('Snackbars', module)
  .add('content', () => (
    <Fragment>
      <Container>
        <SnackbarContent
          content="Basic snackbar content template"
          onClick={action('snackbar-basic-content-action-click')}/>
      </Container>
      <Container>
        <VariantSnackbarContent
          variant="error"
          content="Error snackbar content template"
          onClick={action('snackbar-error-content-action-click')}/>
      </Container>
      <Container>
        <VariantSnackbarContent
          variant="success"
          content="Success snackbar content template"
          onClick={action('snackbar-success-content-action-click')}/>
      </Container>
      <Container>
        <VariantSnackbarContent
          variant="info"
          content="Info snackbar content template"
          onClick={action('snackbar-info-content-action-click')}/>
      </Container>
    </Fragment>))
  .add('Trigger to show', () => (
    <Container>
      <SnackbarTrigger/>
    </Container>
  ))
  .add('Consecutive', () => (
    <Container>
      <ConsecutiveSnackbars/>
    </Container>
  ));
