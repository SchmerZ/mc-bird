import styled from 'styled-components'

import {media} from './media'

const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding: 0 15px 0 15px;
  
  ${media.tablet`width: 750px;`}
  ${media.desktop`width: 970px;`}
`;

export default Container;