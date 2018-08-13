import React, {Fragment} from 'react'
import styled from 'styled-components'

import * as icons from '../../../src/client/components/icons'

const IconRowContainer = styled.div`
  display: flex;
`;

const IconTitle = styled.span`
  margin-right: 20px;
`;

const IconContainer = styled.div`
`;

const IconRow = (props) => {
  const {name, component: Icon, ...rest} = props;

  return (
    <IconRowContainer>
      <IconTitle>
        {name}
      </IconTitle>
      <IconContainer>
        <Icon {...rest}/>
      </IconContainer>
    </IconRowContainer>
  )
};

const IconsList = () => {
  const iconsList = Object.entries(icons);

  return (
    <Fragment>
      {iconsList.map(([name, component]) => <IconRow key={name} name={name} component={component}/>)}
    </Fragment>
  );
};

export default IconsList;
