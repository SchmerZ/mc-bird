import styled from 'styled-components'
import {color} from '../../styles/variables'

export const PageTitle = styled.h1`
  margin: 0;
  font-weight: 800;
  font-size: 48px;
  color: #24374e;
  
  display: inline-block;
  text-align: center;
`;

export const Anchor = styled.a`
  color: ${color.primary};
  text-decoration: none;
  transition: .5s;
  
  :hover {
    color: #24374e;
    border-color: #24374e;
  }
`;