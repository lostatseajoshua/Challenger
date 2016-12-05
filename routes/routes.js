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

/**
* Get and post to challenges.
*/
router.route('/api/challenges')
.get(api.getChallenges)
.post(api.postChallenge);

/**
*  Put and delete a challenge by id.
*/
router.route('/api/challenges/:challengeId')
.put(api.putChallenge)
.delete(api.deleteChallenge);

/**
* Get and post to teams.
*/
router.route('/api/teams')
.get(api.getTeams)
.post(api.postTeam);

/**
* Put and delete a team by id.
*/
router.route('/api/teams/:teamId')
.put(api.putTeam)
.delete(api.deleteTeam);

module.exports = router;
