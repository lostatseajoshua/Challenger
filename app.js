/**
 * Module dependencies.
 */
const express = require('express');

/**
 * Express configuration.
 */
const app = express();

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
