import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {color} from '../../styles/variables'

const Title = styled.h4`
  margin-bottom: 0;
`;

const FeatureContainer = styled.div`
  padding: 4px 0;
`;

const FeatureName = styled.span`
  font-style: italic;
  font-weight: 600;
  color: ${color.primary};
`;

const FeatureRow = ({name, description}) => {
  return (
    <FeatureContainer>
      <FeatureName>{name}. </FeatureName>
      {description}
    </FeatureContainer>
  )
};

FeatureRow.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const PotentialFeatures = () => {
  return (
    <Fragment>
      <Title>Potential features:</Title>
      <FeatureRow
        name="loadable components"
        description="Avoid page parts 'blinking' from spinner icon to content. If we are able to get data faster then specified threshold, no need to render a spinning icon for a few ms. Wait instead."
      />

      <FeatureRow
        name="websocket"
        description="Can be used for outcome messages as well. Since not having much experience, postponed for the future exploring."
      />

      <FeatureRow
        name="webpack code-splitting"
        description="Great tool to decrease initial js package size."
      />
    </Fragment>
  )
};

export default PotentialFeatures
