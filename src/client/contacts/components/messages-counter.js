import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import {css} from 'styled-components'
import {EnvelopIcon} from '../../components/icons'
import Badge from '../../components/badges/badge'

const badgeClasses = css`
  cursor: pointer;
`;

const badgeContentClasses = css`
  font-size: 10px;
  height: 18px;
  width: 18px;
  top: -8px;
`;

class MessagesCounter extends PureComponent {
  handleClick = () => {
    const {onClick} = this.props;
    onClick && onClick();
  };

  render() {
    const {counter} = this.props;

    return (
      <Badge badgeContent={counter}
             classes={badgeClasses}
             badgeContentClasses={badgeContentClasses}
             onClick={this.handleClick}
      >
        <EnvelopIcon size={20} />
      </Badge>
    )
  }
}

MessagesCounter.propTypes = {
  counter: PropTypes.number,
  onClick: PropTypes.func,
};

export default MessagesCounter
