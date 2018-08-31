import styled from 'styled-components'
import {border} from '../../styles/variables'

export const Head = styled.thead`
  border-bottom: ${border.dashedGray};
`;

export const Body = styled.tbody`
`;

export const TH = styled.th`
  border-top: 1px solid #ddd;
  padding: 10px 10px 5px;
  word-break: break-all;
  vertical-align: middle;
  text-align: left;
`;

export const Table = styled.table`
  min-height: 100px;
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 14px;
  
  ${Body} {
    opacity: ${props => props.fetching ? '.6' : '1'};
  }
`;

export const TD = styled.td`
  padding: 10px 10px 5px;
  border-top: 0;
  border-bottom: 2px solid #ecf2fc;
  border-right: 2px solid #ecf2fc;
  vertical-align: middle;
  
  word-break: keep-all;
  white-space: pre-line;
`;

export const TR = styled.tr`
  ${TD}:last-child {
    border-right: 0;
  }
  
  &:last-child {
    ${TD} {
      border-bottom: 0;
    }
  }
`;

Table.thead = Head;
Table.th = TH;
Table.tbody = Body;
Table.td = TD;
Table.tr = TR;
