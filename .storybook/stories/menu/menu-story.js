import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import styled from 'styled-components'

import Menu from './menu-wth-state';
import MessagesFilter from './messages-filter-wth-state';

const Container = styled.div`
  margin: 30px 10px 10px 10px;
  width: 700px;
`;

storiesOf('Menu', module)
  .add('basic', () => (
    <Container>
      <Menu onChange={action('menu-item-click')} />
    </Container>))
  .add('messages filter', () => (
    <Container>
      <MessagesFilter onChange={action('menu-item-click')} />
    </Container>));
