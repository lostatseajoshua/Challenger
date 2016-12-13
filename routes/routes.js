'use strict';

/**
* Module dependencies.
*/
const express   = require('express');
const router    = express.Router();
const api       = require('../controllers/api');

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
* Post to games.
*/
router.route('/api/games')
    .get(api.getGames);

/**
* Post to games.
*/
router.route('/api/games')
    .post(api.postGame);

/**
*  Delete a game by id.
*/
router.route('/api/games/:gameId')
    .delete(api.deleteGame);

/**
*  Add a team to a game by id.
*/
router.route('/api/games/:gameId/addTeam')
    .put(api.addTeam);

/**
*  Start a game by id.
*/
router.route('/api/games/:gameId/start')
    .put(api.startGame);

/**
*  Finish a game by id.
*/
router.route('/api/games/:gameId/finish')
    .put(api.finishGame);

router.route('/api/games/:gameId/score')
    .put(api.gameScore);

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

/**
* Get and post to players
*/
router.route('/api/players')
    .get(api.getPlayers)
    .post(api.postPlayer);

/**
* Add player to team by player id
*/
router.route('/api/players/:playerId/addTeam')
    .put(api.putPlayerTeam);

module.exports = router;
