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
* Get challenges.
*/
router.route('/api/challenges')
.get(api.getChallenges)

/**
* Post, put, delete a challenge by id.
*/
router.route('/api/challenges/:challengeId')
.post(api.postChallenge)
.put(api.putChallenge)
.delete(api.deleteChallenge);

/**
* Get teams.
*/
router.get('/api/teams', api.getTeams);

/**
* Post, put, delete a team by id.
*/
router.route('/api/teams/:teamId')
.post(api.postTeam)
.put(api.putTeam)
.delete(api.deleteTeam);

module.exports = router;
