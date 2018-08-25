import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Anchor} from "../../components/styled/primitive";

const TR = styled.tr`
`;

const TD = styled.td`
  border-top: 0;
  text-align: center;
`;

const NoItems = (props) => {
  const {onTryAgainClick} = props;

  return (
    <TR>
      <TD colSpan={5}>
        Unfortunately, no messages were found. You can <Anchor onClick={onTryAgainClick}>try again</Anchor>.
      </TD>
    </TR>
  )
};

NoItems.propTypes = {
  onTryAgainClick: PropTypes.func,
};

export default NoItems;
