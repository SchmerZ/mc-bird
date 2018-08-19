import React from 'react'
import Proptypes from 'prop-types'

import {CheckCircleIcon, ErrorIcon, InfoIcon} from '../icons'
import SnackbarContent from './snackbar-content'
import styled, {css} from "styled-components";

import variant from '../../constants/snackbar-variant'

const variantIcon = {
  [variant.success]: CheckCircleIcon,
  [variant.error]: ErrorIcon,
  [variant.info]: InfoIcon,
};

const styles = {
  [variant.error]: css`background-color: #d32f2f`,
  [variant.success]: css`background-color: #43a047`,
};

const TextWithIconContainer = styled.span`
  display: flex;
  align-items: center;
`;

const VariantSnackbarContent = (props) => {
  const {content, variant, ...rest} = props;

  const Icon = variantIcon[variant];
  const StyledIcon = styled(Icon)`
    margin-right: 8px;
  `;
  const StyledSnackbarContent = styled(SnackbarContent)`
    ${styles[variant]}
  `;

  return (
    <StyledSnackbarContent
      content={
        <TextWithIconContainer>
          <StyledIcon/>
          {content}
        </TextWithIconContainer>
      }
      {...rest}
    />
  );
};

VariantSnackbarContent.propTypes = {
  variant: Proptypes.oneOf(Object.values(variant).map(x => x))
};

VariantSnackbarContent.variant = variant;

export default VariantSnackbarContent;
