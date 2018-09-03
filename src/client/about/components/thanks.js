import React, {Fragment} from 'react'
import styled from 'styled-components'

const Title = styled.h4`
  margin-bottom: 0;
`;

const Paragraph = styled.p``;

const Thanks = () => {
  return (
    <Fragment>
      <Title>Thanks:</Title>
      <Paragraph>
        I would like to thank HR <strong>Chrisje Alsters</strong> for patience in chat and giving me a chance to try
        myself in that assignment.
      </Paragraph>

      <Paragraph>
        Some things (i.e. websocket) I tried for the first time because it fits to current solution. So I would appreciate any feedback about the code or technical decisions
        which take place.
      </Paragraph>

      <Paragraph>
        Latest version of <strong>MessageBird REST API npm client</strong> has limited support of functionality. So I have
        written own client from scratch.
      </Paragraph>

      <Paragraph>
        Great <strong>thanks</strong> for the reviewers who is responsible to check my code.
        Hope <strong>#?%!</strong> was not the most frequent word you pronounced =).
      </Paragraph>
    </Fragment>
  )
};

export default Thanks
