import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from './modules/stores/configure';
import App from './App';
import path from 'path';
import { END } from 'redux-saga';
import express from 'express';
import PreloadContext from './lib/PreloadContext';

const manifest = JSON.parse(
  fs.readFileSync(path.resolve('./build/asset-manifest.json'), 'utf8'),
);

const chunks = Object.keys(manifest.files)
  .filter(key => /chunk\.js$/.exec(key))
  .map(key => `<script src="${manifest[key]}"></script>`)
  .join('');

function createPage(root, stateScript) {
  return `<!DOCKTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>Jodsol</title>
      <link href="${manifest['main.css']}" rel="stylesheet" />
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">
        ${root}
      </div>
      ${stateScript}
      <script src="${manifest['runtime~main.js']}"></script>
      ${chunks}
      <script src="${manifest['main.js']}"></script>
    </body>
  </html>`;
}

const app = express();

// eslint-disable-next-line consistent-return
const serverRender = async (req, res, next) => {
  const context = {};
  const preloadContext = {
    done: false,
    promises: [],
  };
  const jsx = (
    <PreloadContext.Provider value={preloadContext}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </PreloadContext.Provider>
  );
  ReactDOMServer.renderToStaticMarkup(jsx);
  try {
    await sagaPromise;
    await Promise.all(preloadContext.promises);
  } catch (e) {
    return res.status(500);
  }
  preloadContext.done = true;
  const root = ReactDOMServer.renderToString(jsx);
  const stateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
  const statescript = `<script>__PRELOADED_STATE__=${stateString}</script>`;

  res.send(createPage(html, statescript));
};

const serve = express.static(path.resolve('./build'), {
  index: false,
});
app.use(serve);
app.use(serverRender);

app.listen(5000, () => {
  console.log('Running on http://localhost:5000');
});
