import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

import styled, {css} from 'styled-components'

const arrow = css`
  top: 20px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-width: 8px;
  margin-top: -8px;
`;

const StyledMessage = styled.div`
  width: 90%;
  font-size: 14px;
  position: relative;
  padding: 10px 15px;
  text-align: left;
  border-radius: 10px;
  margin-bottom: 15px;
  line-height: 20px;
  min-height: 40px;
  word-break: break-word;
  outline: 1px solid transparent;
  
  ::after {
    ${arrow}
  }
`;

const LeftMessage = styled(StyledMessage)`
  background: #48578c;
  color: #fff;
  left: 0;
  
  ::after {
    right: calc(100% - 1px);
    border-right-color: #48578c;
  }
`;

const RightMessage = styled(StyledMessage)`
  background: #ecf5fd;
  color: #48578c;
  right: -25px;
  
  ::after {
    left: calc(100% - 1px);
    border-left-color: #ecf5fd;
  }
`;

const Message = (props) => {
  const {type, children, ...rest} = props;

  return (
    <Fragment>
      {type === types.left && <LeftMessage {...rest}>{children}</LeftMessage>}
      {type === types.right && <RightMessage {...rest}>{children}</RightMessage>}
    </Fragment>
  )
};

const types = (Message.types = {
  left: 'left',
  right: 'right',
});

Message.propTypes = {
  type: PropTypes.oneOf(Object.values(Message.types).map(x => x))
};

Message.defaultProps = {
  type: types.left,
};

export default Message;