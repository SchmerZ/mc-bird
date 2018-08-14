import React, {Component} from 'react'
import styled from 'styled-components'

import {PageTitle} from './components/layout/primitive'
import Container from './components/layout/container'
import SkewedContainer from './components/layout/skewed-container'
import Menu from './components/menu/menu'

import Layout from './components/layout/Layout'
import {Row} from './components/layout/responsive'

import QuicklySendMessageForm from './quick-message/components/quickly-send-message-form'

const TitleSection = styled.section`
  padding: 30px 0;
`;

const MenuSection = styled.section`
  margin: 0;
  padding-top: 15px;
`;

const ContentSection = styled.section`
`;

const StyledSkewedContainer = styled(SkewedContainer)`
  height: 500px;
  margin-top: -220px;
`;

const Card = styled(Container)`
  padding: 25px;
  border-radius: 5px;
  border: 5px solid #f6fafd;
  border-top: 0;
`;

const MenuContainer = styled(Container)`
  padding: 0;
  border: 5px solid #f6fafd;
  border-bottom: 0;
  border-top: 0;
`;

class Root extends Component {
  render() {
    return (
      <Layout>
        <TitleSection>
          {/*<StyledSkewedContainer/>*/}
          <Container>
            <Row>
              <PageTitle>Communication, solved.</PageTitle>
            </Row>
          </Container>
        </TitleSection>
        <MenuSection>
          <MenuContainer>
            <Menu/>
          </MenuContainer>
        </MenuSection>
        <ContentSection>
          <Card>
            <QuicklySendMessageForm/>
          </Card>
        </ContentSection>
      </Layout>
    )
  }
}

export default Root;