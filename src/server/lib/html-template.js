let js = ['assets/main.js', 'assets/vendors.js'];

const getWsServerUrlByIncomeRequest = (req) => {
  const protocol = req.protocol === 'http' ? 'ws' : 'wss';
  const host = req.get('host');

  return `${protocol}://${host}`;
}

const template = ({req, config, html, styleTags}) => {
  const {WindowTitle, assetsRootUrl, urls} = config;

  const wsServerUrl = urls.WebSocketServer || getWsServerUrlByIncomeRequest(req);
  const appConfig = {wsServerUrl};

  return `
    <!DOCTYPE html>
    <html lang="en" class="html">
        <head>
            <meta charset="utf-8">
            <meta name="theme-color" content="#3F51B5">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
            
            <link rel="manifest" href="${assetsRootUrl}/manifest.json">            
            <link rel="shortcut icon" href="${assetsRootUrl}/favicon.ico" type="image/x-icon">
            <link rel="icon" href="${assetsRootUrl}/favicon.ico" type="image/x-icon">

            <title>${WindowTitle}</title>
            <link href="${assetsRootUrl}/fonts.css" rel="stylesheet" />
            
            ${styleTags}
        </head>
        <body>
            <script type="text/javascript">
              window.AppConfig = ${JSON.stringify(appConfig)};
            </script>
            
            ${html}
            ${js.map(jsFile => `<script async type="text/javascript" src="${assetsRootUrl}/${jsFile}"></script>`).join('')}
        </body>
    </html>`
};

export default template
