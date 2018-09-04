import PropTypes from 'prop-types'
import styled from 'styled-components'

import {media} from '../../components/styled/media'

const getWidthString = (span) => {
  if (!span) return;

  const width = span / 12 * 100;

  return `width: ${width}%;`;
};

export const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding: 0 15px 0 15px;
  
  ${media.tablet`width: 750px;`}
  ${media.desktop`width: 970px;`}
`;

export const Row = styled.div`
  margin-right: -15px;
  margin-left: -15px;
  
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;

export const Column = styled.div`
  float: left;
  padding-left: 15px;
  padding-right: 15px;
  
  ${({xs}) => xs ? getWidthString(xs) : 'width: 100%;'}
  
  ${media.tablet`${({sm}) => sm && getWidthString(sm)}`}  
  ${media.desktop`${({md}) => md && getWidthString(md)}`}
`;

Column.propTypes = {
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
};

export const TableColumn = styled.col`
  ${({xs}) => xs ? getWidthString(xs) : 'width: 100%;'}
  ${media.tablet`${({sm}) => sm && getWidthString(sm)}`}  
  ${media.desktop`${({md}) => md && getWidthString(md)}`}
`;

TableColumn.propTypes = {
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
};
