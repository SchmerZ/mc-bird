import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import styled from 'styled-components'

import Menu from './menu-wth-state';

const Container = styled.div`
  margin: 30px 10px 10px 10px;
  width: 700px;
`;

storiesOf('Menu', module)
  .add('basic', () => (
    <Container>
      <Menu onChange={action('menu-item-click')}/>
    </Container>));
