import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {Switch, Route} from 'react-router'
import {ConnectedRouter} from 'connected-react-router'

import {PageTitle} from './components/styled/primitive'
import Container from './components/styled/content-container'
import SkewedContainer from './components/layout/skewed-container'
import Menu from './components/menu/menu'

import Layout from './components/layout/Layout'
import {Row} from './components/layout/responsive'

import AppNotification from './application/components/app-notification'
import QuicklySendMessageForm from './quick-message/components/quickly-send-message-form'
import Messages from './messages/components/messages-list'
import Contacts from './contacts/components/contacts-list'
import Conversation from './conversation/components/conversation'
import About from './about/components/about'

import PageNotFound from './components/pages/page-not-found'
import routesIds from './constants/navigation-routes'

const TitleSection = styled.section`
  padding: 30px 0;
  text-align: center;
`;

const MenuSection = styled.section`
  margin: 0;
  padding: 15px 15px 0;
`;

const ContentSection = styled.section`
  padding: 0 15px 0 15px;
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
    return (
      <Layout>
        <AppNotification />

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
            <Menu />
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
      <ConnectedRouter history={history}>
        <Switch>
          <Route path={routesIds.quicklySendMessage} exact render={() => <App><QuicklySendMessageForm /></App>} />
          <Route path={routesIds.messages} exact render={() => <App><Messages /></App>} />
          <Route path={routesIds.contacts} exact render={() => <App><Contacts /></App>} />
          <Route path={`${routesIds.contacts}/:msisdn`}
                 exact render={(props) => <App><Conversation {...props} /></App>} />
          <Route path={routesIds.about} exact render={() => <App><About /></App>} />
          <Route component={PageNotFound} />
        </Switch>
      </ConnectedRouter>
    )
  }
}

Root.propTypes = {
  history: PropTypes.object,
};

export default Root;
