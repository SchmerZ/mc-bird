import React, {Component} from 'react'
import styled, {injectGlobal} from 'styled-components'

import {global, bodyBackground, bodyContent} from './styles/layout'
import {PageTitle} from './components/layout/primitive'

import Container from './components/layout/container'
import SkewedContainer from './components/layout/skewed-container'
import Menu from './components/menu/menu'

import Header from './components/layout/header'
import Footer from './components/layout/footer'
import {Row} from './components/layout/responsive'

import QuicklySendSmsForm from './components/send-sms/quickly-send-sms-form'

injectGlobal`${global}`;

const BodyBackground = styled.div.attrs({
  id: 'app'
})`
  ${bodyBackground}
`;

const BodyContent = styled.div`
  ${bodyContent}
`;

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
      <BodyBackground>
        <Header/>

        <BodyContent>
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
              <QuicklySendSmsForm/>
            </Card>
          </ContentSection>
        </BodyContent>
        <Footer/>
      </BodyBackground>
    )
  }
}

export default Root;