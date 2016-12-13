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
* POST /api/games/
* Create a new game
*/
exports.postGame = function game(req, res) {
    const newGame = new Game({ teams: [], scores: [] });
    const teamIds = req.body.teams;

    if (teamIds && teamIds.length > 0) {
        var tasksToGo = teamIds.length;

        teamIds.forEach(function (id) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                if (--tasksToGo === 0) {
                    newGame.save((err, game) => {
                        if (err) {
                            res.status(403).send(`${err}`);
                            return;
                        }
                        res.status(201).send(game);
                    });
                }
                return;
            }

            Team.findById(id, (err, team) => {
                if (!err && team) {
                    // if (!newGame.teams.includes(id)) {
                    newGame.teams.push(id);
                    newGame.scores.push(new Score({ team: id }));
                    // }
                }

                if (--tasksToGo === 0) {
                    newGame.save((err, game) => {
                        if (err) {
                            res.status(403).send(`${err}`);
                            return;
                        }
                        res.status(201).send(game);
                    });
                }
            });
        });
    } else {
        newGame.save((err, game) => {
            if (err) {
                res.status(403).send(`${err}`);
                return;
            }
            res.status(201).send(game);
        });
    }
}

/**
* PUT /api/games/:gameId/addTeam
* Add teams to a game
*/
exports.addTeam = function game(req, res) {
    const gameId = req.params.gameId;

    if (!mongoose.Types.ObjectId.isValid(gameId)) {
        res.status(403).send("Invalid player id");
        return;
    }

    Game.findById(gameId, (err, game) => {
        if (err) {
            res.status(403).send(`${err}`);
            return;
        }

        if (!game) {
            res.status(403).send('No game found');
            return;
        }

        if (game.started_at) {
            res.status(403).send('Game has started cannot add a team');
            return;
        }

        const teamIds = req.body.teams;

        if (!teamIds && teamIds.length <= 0) {
            res.status(403).send('body empty');
            return;
        }

        var tasksToGo = teamIds.length;

        teamIds.forEach(function (id) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                if (--tasksToGo === 0) {
                    game.save((err, game) => {
                        if (err) {
                            res.status(403).send(`${err}`);
                            return;
                        }
                        res.status(201).send(game);
                    });
                }
                return;
            }

            Team.findById(id, (err, team) => {
                if (!err && team) {
                    // if (!game.teams.includes(id)) {
                    game.teams.push(id);
                    // }
                }

                if (--tasksToGo === 0) {
                    game.save((err, game) => {
                        if (err) {
                            res.status(403).send(`${err}`);
                            return;
                        }
                        res.status(201).send(game);
                    });
                }
            });
        });
    });
}

/**
* DELETE /api/games/:gameId
* Delete a game
*/
exports.deleteGame = function game(req, res) {
    const gameId = req.params.gameId;

    if (!mongoose.Types.ObjectId.isValid(gameId)) {
        res.status(403).send("Invalid player id");
        return;
    }

    Game.findByIdAndRemove(gameId, (err, game) => {
        if (err) {
            res.status(403).send(`${err}`);
            return;
        }

        if (!game) {
            res.status(403).send('No game found');
            return;
        }

        res.status(201).json(game);
    });
}

/**
* PUT /api/games/:gameId/start
* Start game
*/
exports.startGame = function game(req, res) {
    const gameId = req.params.gameId;

    if (!mongoose.Types.ObjectId.isValid(gameId)) {
        res.status(403).send("Invalid player id");
        return;
    }

    Game.findById(gameId, (err, game) => {
        if (err) {
            res.status(403).send(`${err}`);
            return;
        }

        if (!game) {
            res.status(403).send('player not found');
            return;
        }

        game.start(() => {
            game.save((err, game) => {
                if (err) {
                    res.status(403).send(`${err}`);
                    return;
                }
                res.status(201).json(game);
            });
        });
    });
}

/**
* PUT /api/games/:gameId/finish
* Finish game
*/
exports.finishGame = function game(req, res) {
    const gameId = req.params.gameId;

    if (!mongoose.Types.ObjectId.isValid(gameId)) {
        res.status(403).send("Invalid player id");
        return;
    }

    Game.findById(gameId, (err, game) => {
        if (err) {
            res.status(403).send(`${err}`);
            return;
        }

        if (!game) {
            res.status(403).send('player not found');
            return;
        }

        game.finish(() => {
            game.save((err, game) => {
                if (err) {
                    res.status(403).send(`${err}`);
                    return;
                }
                res.status(201).json(game);
            });
        });
    });
}

/**
* PUT /api/games/:gameId/score
* Update score of game
*/
exports.gameScore = function game(req, res) {
    const gameId = req.params.gameId;
    const teamId = req.body.teamId;
    const points = req.body.points;

    if (!mongoose.Types.ObjectId.isValid(gameId)) {
        res.status(403).send('Invalid game id');
        return;
    }

    if (!teamId || !mongoose.Types.ObjectId.isValid(teamId)) {
        res.status(403).send('Invalid team id');
        return;
    }

    if (!points) {
        return;
    }

    Game.findById(gameId, (err, game) => {
        if (err) {
            res.status(403).send(`${err}`);
            return;
        }

        if (!game) {
            res.status(403).send('Game not found');
            return;
        }

        if (!game.started_at) {
            res.status(403).send('Game not started');
            return;
        }

        if (game.ended_at) {
            res.status(403).send('Game has ended');
            return;
        }

        const scores = game.scores;

        if (scores.length <= 0) {
            res.status(403).send('Game has no scores');
            return;
        }

        var updated = false;

        for (var i = 0; i < scores.length; i++) {
            const score = scores[i];
            if (score.team == teamId) {
                score.points = points;
                updated = true;
                break;
            }
        }

        if (!updated) {
            res.status(403).send('No score found to update');
            return;
        }

        game.save((err, saveGame) => {
            if (err) {
                res.status(403).send(`${err}`);
                return;
            }

            res.status(201).send(saveGame);
        });
    });
}

/**
* GET /api/teams
* List of teams
*/
exports.getTeams = function get(req, res) {
    Team.find({}, (err, teams) => {
        if (err) {
            res.status(403).send(`${err}`);
            return;
        }
        res.status(200).json(teams);
    });
};

/**
* POST /api/teams
* Create a new team
*/
exports.postTeam = function post(req, res) {
    const teamName = req.body.name;
    if (!teamName) {
        res.status(403).send("Request body missing name");
        return;
    }
    const newTeam = new Team({ name: teamName });
    newTeam.save((err) => {
        if (err) {
            res.status(403).send(`${err}`);
            return;
        }
        res.status(201).json(newTeam);
    });
}

/**
* POST /api/teams/:teamId
* Update a team by id
*/
exports.putTeam = function put(req, res, next) {
    const teamId = req.params.teamId;

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
        res.status(403).send('Team id is not valid');
        return;
    }

    Team.findByIdAndUpdate(teamId, { name: req.body.name }, { new: true }, (err, team) => {
        if (err) {
            res.status(403).send(`${err}`);
            return;
        }

        if (team) {
            res.status(201).json(team);
        } else {
            res.status(403).send('No team found');
        }
    });
}

/**
* DELETE /api/teams/:teamId
* Delete a team by id
*/
exports.deleteTeam = function deleteTeam(req, res) {
    const teamId = req.params.teamId;

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
        res.status(403).send('Team id is not valid');
        return;
    }

    Team.findByIdAndRemove(teamId, (err, team) => {
        if (err) {
            res.status(403).send(`${err}`);
            return;
        }

        if (!team) {
            res.status(403).send('No team found');
            return;
        }

        res.status(201).json(team);
    });
}

}
