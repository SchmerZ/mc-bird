import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {Router, Switch, Route} from 'react-router'

import {PageTitle} from './components/layout/primitive'
import Container from './components/layout/container'
import SkewedContainer from './components/layout/skewed-container'
import Menu from './components/menu/menu'

import Layout from './components/layout/Layout'
import {Row} from './components/layout/responsive'

import AppNotification from './notification/components/app-notification'
import QuicklySendMessageForm from './quick-message/components/quickly-send-message-form'

import PageNotFound from './components/pages/page-not-found'

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

class App extends Component {
  render() {
    console.log('r');

    return (
      <Layout>
        <AppNotification/>

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
            {this.props.children}
          </Card>
        </ContentSection>
      </Layout>
    )
  }
}

App.propTypes = {
  children: PropTypes.node,
};

class Root extends Component {
  render() {
    const {history} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact render={() => <App><QuicklySendMessageForm/></App>}/>
          <Route path="/messages" exact render={() => <App>m!</App>}/>
          <Route path="/about" exact render={() => <App>a!</App>}/>
          <Route component={PageNotFound}/>
        </Switch>
      </Router>
    )
  }
}

Root.propTypes = {
  history: PropTypes.object,
};

export default Root;
