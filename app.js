'use strict';

/**
 * Module dependencies.
 */
const express       = require('express');
const compression   = require('compression');
const bodyParser    = require('body-parser');
const router        = require('./routes/routes');
const mongoose      = require('mongoose');

/**
 * Express configuration.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.connect('mongodb://localhost/challenger');
mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

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
app.use((err, req, res, next) => {
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
