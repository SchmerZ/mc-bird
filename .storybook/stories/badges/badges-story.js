import React from 'react';
import {storiesOf} from '@storybook/react';

import styled, {css} from 'styled-components'
import Badge from '../../../src/client/components/badges/badge';
import Button from '../../../src/client/components/buttons/button';
import {EnvelopIcon} from '../../../src/client/components/icons';

const Container = styled.div`
  margin: 30px 10px 10px 10px;
`;

const Margin = styled.span`
  margin: 16px;
`;

const P = styled.p`
  padding: 0 16px;
  margin: 0;
`;

storiesOf('Badges', module)
  .add('basic', () => (
    <Container>
      <Margin>
        <Badge badgeContent={4}>
          <EnvelopIcon />
        </Badge>
      </Margin>

      <Margin>
        <Badge badgeContent={4} badgeContentClasses={css`color: #fff; background-color: red;`}>
          <EnvelopIcon />
        </Badge>
      </Margin>

      <Margin>
        <Badge badgeContent={4}>
          <P>Typography</P>
        </Badge>
      </Margin>
    </Container>));
