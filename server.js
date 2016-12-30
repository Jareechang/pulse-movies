require('babel-register')({
  presets: ['es2015', 'react', 'stage-0'],
  plugins: ['css-modules-transform']
});

const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080 || process.env.PORT;

/* Util */
const React = require('react');
const ReactDomServer = require('react-dom/server');
const _ = require('lodash');
const fs = require('fs');
const baseTemplate = fs.readFileSync(__dirname + '/src/index.html');
const template = _.template(baseTemplate);

/* Router */
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const RouterContext = ReactRouter.RouterContext;
const serverRouter = ReactRouter.ServerRouter;
const routes = require('./src/routes/routes.js').default;
const match = ReactRouter.match;

app.use(express.static(path.resolve(__dirname, 'dist')));

/* React router middleware for routing */
app.use((req ,res) => {
  match({ routes: routes, location: req.url }, (error, redirectionLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectionLocation) {
      res.redirect(302, redirectionLocation.pathName + redirectionLocation.search);
    } else if (renderProps) {
      let body = ReactDomServer.renderToString(
        React.createElement(RouterContext, renderProps)
      );
      res.status(200).write(template({ body: body }));
      res.end();
    } else {
      res.status(404).send('Not found');
    }
  })
})

app.listen(PORT, _ => console.log("server on port: %s", PORT));
