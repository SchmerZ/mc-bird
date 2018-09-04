import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {bodyBackgroundStyle, bodyContentStyle} from '../../../shared/styles/body'
import {globalStyles} from '../../../shared/styles/globals'

import Header from '../../../shared/components/layout/header'
import Footer from './footer'

globalStyles();

const BodyBackground = styled.div.attrs({
  id: 'app'
})`
  ${bodyBackgroundStyle}
`;

const BodyContent = styled.div`
  ${bodyContentStyle}
`;

class Layout extends Component {
  render() {
    return (
      <BodyBackground>
        <Header />

        <BodyContent>
          {this.props.children}
        </BodyContent>

        <Footer />
      </BodyBackground>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
