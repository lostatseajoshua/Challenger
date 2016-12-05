'use strict';

/**
 * Module dependencies.
 */
const express  = require('express');
const router   = express.Router();
const api      = require('../controllers/api');

/**
 * Primary app routes.
 */
router.get('/', (req, res) => {
    res.send('<h1>Challenges</h1>');
});

/**
 * API routes.
 */
router.get('/api/', (req, res) => {
    res.send('Welcome to challenges API version 1.');
});

router.route('/api/challenges').get(api.getChallenges).post(api.postChallenges);

module.exports = router;
