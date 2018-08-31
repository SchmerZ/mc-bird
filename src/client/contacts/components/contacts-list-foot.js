import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

import {ChevronLeftIcon, ChevronRightIcon} from '../../components/icons'

const FootContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 10px;
  
  border-top: 1px dashed #d6e0f1;
`;

const iconStyle = css`
  cursor: pointer;
  padding: 0 5px 0 5px;

  &[disabled] {
    cursor: default;
    opacity: .4;
  }  
  
  &:hover {
    &:not([disabled]) {
      color: #2D9BF3;
    }
  }
`;

const StyledLeftIcon = styled(ChevronLeftIcon)`${iconStyle}`;
const StyledRightIcon = styled(ChevronRightIcon)`${iconStyle}`;

class ContactsListFoot extends PureComponent {
  handleLeftArrowClick = () => {
    if (this.leftArrowDisabled()) return;

    const {onLeftArrowClick} = this.props;
    onLeftArrowClick && onLeftArrowClick();
  };

  handleRightArrowClick = () => {
    if (this.rightArrowDisabled()) return;

    const {onRightArrowClick} = this.props;
    onRightArrowClick && onRightArrowClick();
  };

  leftArrowDisabled = () => {
    return this.props.offset === 0;
  };

  rightArrowDisabled = () => {
    const {offset, itemsPerPage, totalCount} = this.props;

    return (offset + itemsPerPage) >= totalCount;
  };

  render() {
    const {offset, itemsPerPage, totalCount} = this.props;
    const start = offset + 1;
    const end = Math.min(offset + itemsPerPage, totalCount);
    const label = `Showing ${start}−${end} of ${totalCount} items.`;

    return (
      <tfoot>
      <tr>
        <td colSpan={5}>
          <FootContainer>
            {label}
            <StyledLeftIcon
              size={20}
              disabled={this.leftArrowDisabled()}
              onClick={this.handleLeftArrowClick}
            />
            <StyledRightIcon
              size={20}
              disabled={this.rightArrowDisabled()}
              onClick={this.handleRightArrowClick}
            />
          </FootContainer>
        </td>
      </tr>
      </tfoot>
    );
  }
}

ContactsListFoot.propTypes = {
  offset: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,

  onLeftArrowClick: PropTypes.func,
  onRightArrowClick: PropTypes.func,
};

export default ContactsListFoot
