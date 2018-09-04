import express from 'express';
import direction from '../../../shared/constants/message-directions'

const callbackRouter = express.Router();

export default (wsServer) => {

  callbackRouter.post('/messages', (request, response) => {
    try {
      // based on request
      // {
      //   "id": "some-id-here",
      //   "recipient": "79201007245",
      //   "originator": "CZ",
      //   "body": "hi! this is incoming message!",
      //   "createdDatetime" :"2016-05-03T14:26:57+00:00"
      // }

      const {id, recipient, originator, body, createdDatetime} = request.body;

      const message = {
        id,
        body,
        createdDatetime,
        direction: direction.received,
        recipient,
        originator,
        status: "delivered",
      };

      wsServer.push(message);

      response.status(200).send();
    }
    catch (error) {
      response.status(400).send();

      throw error;
    }
  });

  return callbackRouter;
}
