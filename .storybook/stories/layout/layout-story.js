import React, {Fragment} from 'react';
import {storiesOf} from '@storybook/react';
import styled from 'styled-components'

import SkewedContainer from '../../../src/client/components/layout/skewed-container';

import Layout from '../../../src/client/components/layout/Layout';
import LayouMockup from './layout-mockup'

import PageNotFound from '../../../src/client/components/pages/page-not-found';
import PageLoading from '../../../src/shared/components/pages/page-loading';

import {Container, Row, Column} from '../../../src/shared/components/layout/responsive';

const SkewedContainer320 = styled(SkewedContainer)`
  height: 320px;
  margin-top: 600px;
  left: 0;
`;

const SkewedContainer600 = styled(SkewedContainer)`
  margin-top: -150px;
  height: 600px;
  left: 0;
`;

const LayoutContainer = styled(Layout)`
  height: 500px;
`;

const FilledContainer = styled.div`
  background-color: lightgray;
  border: 1px solid black;
`;

const Body = styled.div`
`;

storiesOf('Layout', module)
  .add('Skewed container', () => (
    <Fragment>
      <SkewedContainer600>
        height 600px
      </SkewedContainer600>
      <SkewedContainer320>
        height 320px
      </SkewedContainer320>
    </Fragment>))
  .add('Responsive rendering', () => (
    <Container>
      <Row>
        <Column xs={12} sm={6} md={8}>
          <FilledContainer>
            md: 8, sm: 6, xs: 12
          </FilledContainer>
        </Column>
        <Column xs={6} md={4}>
          <FilledContainer>
            md: 4, xs: 6
          </FilledContainer>
        </Column>
      </Row>
      <Row>
        <Column sm={4}>
          <FilledContainer>
            sm: 4
          </FilledContainer>
        </Column>
        <Column sm={8}>
          <FilledContainer>
            <Row>
              <Column xs={6}>
                <FilledContainer>
                  xs: 6
                </FilledContainer>
              </Column>
              <Column xs={6}>
                <FilledContainer>
                  xs: 6
                </FilledContainer>
              </Column>
            </Row>
          </FilledContainer>
        </Column>
      </Row>
    </Container>
  ))
  .add('Mockup', () => (
    <Body>
    <LayoutContainer>
      <LayouMockup />
    </LayoutContainer>
    </Body>
  ))
  .add('404 Page', () => (
    <Body>
    <PageNotFound />
    </Body>
  ))
  .add('Loading page', () => (
    <Body>
    <PageLoading />
    </Body>
  ));
