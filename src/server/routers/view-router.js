import express from 'express';

import config from '../config';
import htmlTemplate from '../lib/html-template'

const viewRouter = express.Router();

export default () => {
    viewRouter.use((req, res) => {
        const processedTemplate = htmlTemplate(config);

        res.send(processedTemplate);
    });

    return viewRouter;
}