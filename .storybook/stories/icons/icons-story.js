import React from 'react';
import {storiesOf} from '@storybook/react';

import styled from 'styled-components'
import IconsList from './icons-list'

const Container = styled.div`
  margin: 30px 10px 10px 10px;
`;

storiesOf('Icons', module)
  .add('Icons list', () => (
    <Container>
      <IconsList/>
    </Container>)
  );