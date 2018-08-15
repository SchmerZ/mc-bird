import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {bodyBackground, bodyContent} from '../../styles/layout'
import {globalStyles} from '../../styles/globals'

import Header from './header'
import Footer from './footer'

globalStyles();

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