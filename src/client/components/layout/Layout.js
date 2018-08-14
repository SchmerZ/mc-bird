import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled, {injectGlobal} from 'styled-components'

import {global, bodyBackground, bodyContent} from '../../styles/layout'

import Header from './header'
import Footer from './footer'

injectGlobal`${global}`;

const BodyBackground = styled.div.attrs({
  id: 'app'
})`
  ${bodyBackground}
`;

const BodyContent = styled.div`
  ${bodyContent}
`;

class Layout extends Component {
  render() {
    return (
      <BodyBackground>
        <Header/>

        <BodyContent>
          {this.props.children}
        </BodyContent>

        <Footer/>
      </BodyBackground>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;