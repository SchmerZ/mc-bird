import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {Anchor} from '../../components/styled/primitive'

export const TD = styled.td`
  border-top: 0;
  text-align: center;
`;

const NoItems = (props) => {
  const {onTryAgainClick} = props;

  return (
    <tr>
      <TD colSpan={5}>
        Unfortunately, no contacts were found. You can <Anchor onClick={onTryAgainClick}>try again</Anchor>.
      </TD>
    </tr>
  )
};

NoItems.propTypes = {
  onTryAgainClick: PropTypes.func,
};

export default NoItems;
