import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import styled from 'styled-components'

import {Menu} from '../../../src/client/components/menu/menu';
import routesIds from '../../../src/client/constants/navigation-routes';

const Container = styled.div`
  margin: 30px 10px 10px 10px;
  width: 700px;
`;

storiesOf('Menu', module)
  .add('basic', () => (
    <Container>
      <Menu active={routesIds.conversations} navigateTo={action('menu-item-click')}/>
    </Container>));
