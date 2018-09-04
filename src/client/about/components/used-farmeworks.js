import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {color} from '../../styles/variables'
import {Row, Column} from '../../../shared/components/layout/responsive'

const Title = styled.h4`
  margin-bottom: 0;
`;

const FrameworkContainer = styled(Row)`
  display: flex;
  align-items: center;
  padding: 4px 0;
`;

const FrameworkColumn = styled(Column)`
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  color: ${color.primary};
`;

const FrameworkRow = ({name, description}) => {
  return (
    <FrameworkContainer>
      <FrameworkColumn xs={4} md={2}>
        {name}
      </FrameworkColumn>
      <Column xs={8} md={10}>
        {description}
      </Column>
    </FrameworkContainer>
  )
};

FrameworkRow.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const UsedFrameworks = () => {
  return (
    <Fragment>
      <Title>Used frameworks:</Title>
      <FrameworkRow
        name="webpack"
        description="Transpile'n'pack js. Justify for production. Code splitting (not implemented). Writing js on fancy and geeky way."
      />

      <FrameworkRow
        name="websocket"
        description="Live update on income'n'outcome messages. Had no chance to try before. Would like to play with."
      />

      <FrameworkRow
        name="redux + saga"
        description="Redux helps to build scalable SPA with logic segregation. Saga is a powerful framework to handle side effects. Easy to maintain scenarios like polling/infinite loop action handlers."
      />

      <FrameworkRow
        name="reselect"
        description="'Computed' functions to cache result and recompute on references change. Helps to keep performance."
      />

      <FrameworkRow
        name="connected-react-router"
        description="Provides actions to work with browser history. Extend store with params for current browser location."
      />

      <FrameworkRow
        name="styled-components"
        description="Css-in-js. I don't have big experience with css-in-js paradigm. Has cons/pros (as any other). Have tried server side rendering and it works =)"
      />

      <FrameworkRow
        name="nconf"
        description="Hierarchical sources support for configuration (argv, environment, file). With validation and override support on each level."
      />

      <FrameworkRow
        name="jest + enzyme"
        description="Fancy tests for React components. Snapshot testing."
      />

      <FrameworkRow
        name="storybook"
        description="A place where it's good to start creating components (proof-of-concept). Initial test/demo for components."
      />
    </Fragment>
  )
};

export default UsedFrameworks
