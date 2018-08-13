import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import styled from 'styled-components'

import Menu from '../../../src/client/components/menu/menu';
import MenuItemId from '../../../src/client/constants/menu-item-id';

const Container = styled.div`
  margin: 30px 10px 10px 10px;
  width: 700px;
`;

storiesOf('Menu', module)
  .add('basic', () => (
    <Container>
      <Menu active={MenuItemId.conversations} onClick={action('menu-item-click')}/>
    </Container>));
