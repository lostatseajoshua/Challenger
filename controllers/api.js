'use strict';

/**
* Module dependencies.
*/
const mongoose = require('mongoose');
const Game = require('../models/game');
const Score = require('../models/score');
const Team = require('../models/team');
const Player = require('../models/player');

/**
* GET /api/games/
* Get all the games
*/
exports.getGames = function getGames(req, res) {
    Game.find({}, (err, games) => {
        if (err) {
            res.status(403).send('${err}');
            return;
        }
        res.json(games);
    });
}

/**
* PUT /api/challenges/:challengeId
* Updated a new challenge.
*/
exports.putChallenge = function put(req, res) {
    res.status(204).send("Update challenge");
}

/**
* DELETE /api/challenges/:challengeId
* Delete a challenge.
*/
exports.deleteChallenge = function deleteChallenge(req, res) {
    res.status(204).send("Delete challenge");
}

/**
* GET /api/teams
* List of teams.
*/
exports.getTeams = function get(req, res) {
    res.json({ teams: [] });
};

/**
* POST /api/teams
* Create a new team.
*/
exports.postTeam = function post(req, res) {
    res.status(201).send("Created new team");
}

/**
* POST /api/teams/:teamId
* Update a team by id.
*/
exports.putTeam = function put(req, res) {
    res.status(204).send("Updated a team");
}

/**
* POST /api/teams/:teamId
* Delete a team by id.
*/
exports.deleteTeam = function deleteTeam(req, res) {
    res.status(204).send("Deleted a team");
}
