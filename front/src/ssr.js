import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from 'modules/stores/configure';
import App from './App';
import path from 'path';
import express from 'express';

const app = express();

const serverRender = (req, res, next) => {
  const context = {};
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>,
  );
  res.send({
    html,
    state: store.getState(),
  });
};

const serve = express.static(path.resolve('./ssr'), {
  index: false,
});
app.use(serve);
app.use(serverRender);

app.listen(5000, () => {
  console.log('Running on http://localhost:5000');
});
