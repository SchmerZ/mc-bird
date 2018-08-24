import express from 'express';

const callbackRouter = express.Router();

export default (wsServer) => {

  callbackRouter.post('/messages', (request, response) => {
    try {
      wsServer.push(request.body);

      response.status(200).send();
    }
    catch (error) {
      response.status(400).send();
    }
  });

  return callbackRouter;
}
