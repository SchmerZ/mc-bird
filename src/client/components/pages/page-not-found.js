import React, {Component} from 'react'
import styled from 'styled-components'

import {bodyBackground, bodyContent} from '../../styles/layout'

import Container from '../layout/container'
import Header from '../layout/header'
import Footer from '../layout/footer'
import {Icon404} from '../icons'

const BodyBackground = styled.div`
  ${bodyBackground}
`;

const BodyContent = styled.div`
  ${bodyContent}
`;

const ErrorSection = styled.section`
  min-height: 500px;
  position: relative;
  
  display: flex;
  align-items: center;
  text-align: center;
`;

const Icon = styled(Icon404)`
  color: #9bb0bf
`;

const H3 = styled.h3`
  font-size: 34px;
`;

class PageNotFound extends Component {
  render() {
    const {...rest} = this.props;

    return (
      <BodyBackground>
        <Header/>

        <BodyContent {...rest}>
          <ErrorSection>
            <Container>
              <Icon size={150}/>
              <H3>Page not found...</H3>
            </Container>
          </ErrorSection>
        </BodyContent>

        <Footer/>
      </BodyBackground>
    )
  }
}

export default PageNotFound;
