import styled from 'styled-components'
import {color, textColor} from '../../styles/variables'

export const PageTitle = styled.h1`
  margin: 0;
  font-weight: 800;
  font-size: 48px;
  color: ${textColor};
  
  display: inline-block;
  text-align: center;
`;

export const Anchor = styled.a`
  color: ${color.primary};
  text-decoration: none;
  transition: .5s;
  cursor: pointer;
  
  border-bottom: 1px solid ${color.primary};
  display: inline;
  line-height: 16px;
  white-space: nowrap;
    
  :hover {
    color: ${textColor};
    border-color: ${textColor};
  }
`;
