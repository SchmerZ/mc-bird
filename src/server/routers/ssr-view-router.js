import React from 'react'
import express from 'express';

// todo: do not forget to set NODE_ENV!
import {renderToString} from 'react-dom/server'
import {ServerStyleSheet} from 'styled-components'

import config from '../config';
import htmlTemplate from '../lib/html-template'

import PageLoading from '../../client/components/pages/page-loading'

const viewRouter = express.Router();

const getHtml = () => {
  const sheet = new ServerStyleSheet();
  const html = renderToString(sheet.collectStyles(<PageLoading/>));
  const styleTags = sheet.getStyleTags();

  return {html, styleTags};
};

export default () => {
  viewRouter.use((req, res) => {
    const {html, styleTags} = getHtml();
    const processedTemplate = htmlTemplate({config, html, styleTags});

    res.send(processedTemplate);
  });

  return viewRouter;
}