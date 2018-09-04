import React, {Fragment} from 'react'
import styled from 'styled-components'

import Container from "../../../src/shared/components/styled/content-container";
import {Row} from "../../../src/client/components/layout/responsive";
import {PageTitle} from "../../../src/client/components/styled/primitive";
import {Menu} from "../../../src/client/components/menu/menu";
import {QuicklySendMessageForm} from "../../../src/client/quick-message/components/quickly-send-message-form";
import SkewedContainer from "../../../src/client/components/layout/skewed-container";

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

const LayoutMockup = () => {
  return (
    <Fragment>
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
    </Fragment>
  )
};

export default LayoutMockup;
