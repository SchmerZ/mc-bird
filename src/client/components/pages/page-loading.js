import React, {Component} from 'react'
import styled from 'styled-components'

import {color} from '../../styles/variables'
import {bodyBackground, bodyContent} from '../../styles/layout'
import {globalStyles} from '../../styles/globals'

import Container from '../styled/content-container'
import Header from '../layout/header'
import Footer from '../layout/footer'
import {SpinnerIcon} from '../icons'

globalStyles();

const BodyBackground = styled.div.attrs({
  id: 'app',
})`
  height: 100%;
  display: flex;
  flex-direction: column;
  
  ${bodyBackground}
`;

const BodyContent = styled.div`
  flex-grow: 1;
  ${bodyContent}
`;

const LoadingSection = styled.section`
  position: relative;
  
  padding-top: 120px;
  display: flex;
  align-items: center;
  text-align: center;
`;

const Icon = styled(SpinnerIcon)`
  color: ${color.lightGray};
`;

const H3 = styled.h3`
  font-size: 34px;
`;

class PageLoading extends Component {
  render() {
    return (
      <BodyBackground>
        <Header/>

        <BodyContent>
          <LoadingSection>
            <Container>
              <Icon size={60}/>
              <H3>MessageBird is loading...</H3>
            </Container>
          </LoadingSection>
        </BodyContent>

        <Footer/>
      </BodyBackground>
    )
  }
}

export default PageLoading;
