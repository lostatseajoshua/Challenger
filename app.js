'use strict';

/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const router = require('./routes/routes');
/**
 * Express configuration.
 */
const app = express();
app.use(compression());

// parse application/json
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);

/**
 * Catch all error requests
 */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
