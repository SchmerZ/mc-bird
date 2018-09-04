import React, {Component} from 'react'
import styled from 'styled-components'

import {color} from '../../styles/variables'
import {bodyBackgroundStyle, bodyContentStyle} from '../../../shared/styles/body'

import Container from '../../../shared/components/styled/content-container'
import Header from '../../../shared/components/layout/header'
import Footer from '../../../shared/components/layout/footer'
import {Icon404} from '../icons'

const BodyBackground = styled.div`
  ${bodyBackgroundStyle}
`;

const BodyContent = styled.div`
  ${bodyContentStyle}
`;

const ErrorSection = styled.section`
  min-height: 500px;
  position: relative;
  
  display: flex;
  align-items: center;
  text-align: center;
`;

const Icon = styled(Icon404)`
  color: ${color.lightGray};
`;

const H3 = styled.h3`
  font-size: 34px;
`;

class PageNotFound extends Component {
  render() {
    const {...rest} = this.props;

    return (
      <BodyBackground>
        <Header />

        <BodyContent {...rest}>
          <ErrorSection>
            <Container>
              <Icon size={150} />
              <H3>Page not found...</H3>
            </Container>
          </ErrorSection>
        </BodyContent>

        <Footer />
      </BodyBackground>
    )
  }
}

export default PageNotFound;
