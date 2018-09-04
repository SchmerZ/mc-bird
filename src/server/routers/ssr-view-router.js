import React from 'react'
import express from 'express';

import {renderToString} from 'react-dom/server'
import {ServerStyleSheet} from 'styled-components'

import config from '../config';
import htmlTemplate from '../lib/html-template'

const getHtml = (PageClass) => {
  const sheet = new ServerStyleSheet();
  const html = renderToString(sheet.collectStyles(<PageClass />));
  const styleTags = sheet.getStyleTags();

  return {html, styleTags};
};

export default (PageClass) => {
  const viewRouter = express.Router();

  viewRouter.use((req, res) => {
    const {html, styleTags} = getHtml(PageClass);
    const processedTemplate = htmlTemplate({req, config, html, styleTags});

    res.send(processedTemplate);
  });

  return viewRouter;
}
