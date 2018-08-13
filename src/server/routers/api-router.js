import express from 'express';
import bodyParser from 'body-parser';

import routers from '../api';

const apiRouter = express.Router();

export default () => {
    // Body Parser
    apiRouter.use(bodyParser.json());

    // Bind all Controllers
    routers(apiRouter);

    return apiRouter;
}