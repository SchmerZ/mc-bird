import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import styled from 'styled-components'
import Snackbar from '../../../src/client/components/snackbars/snackbar';

const Container = styled.div`
  margin: 30px 10px 10px 10px;
`;

const StaticSnackbar = styled(Snackbar)`
  transform: none;
  position: relative;
  left: auto;
`;

storiesOf('Snackbars', module)
  .add('basic', () => (
    <Container>
      <StaticSnackbar active onClick={action('snackbar-click')}>Message goes here</StaticSnackbar>
    </Container>));
