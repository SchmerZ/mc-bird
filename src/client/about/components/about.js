import React, {Fragment} from 'react'
import styled from 'styled-components'

import Links from './links'
import Thanks from './thanks'
import UsedFrameworks from './used-farmeworks'
import PotentialFeatures from './potential-features'

const Title = styled.h3`
  margin-top: 0;
`;

const About = () => {
  return (
    <Fragment>
      <Title>mc-Bird (Vadim Sheydakov)</Title>
      <Links />
      <Thanks />
      <UsedFrameworks />
      <PotentialFeatures />
    </Fragment>
  )
};

export default About
