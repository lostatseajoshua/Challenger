/**
Passing arrow functions (“lambdas”) to Mocha is discouraged.
If you do not need to use Mocha’s context, lambdas should work.
https://mochajs.org/#arrow-functions
*/

/**
* Module dependencies.
*/
const assert    = require('assert');
const request   = require('supertest');
const Team      = require('../models/Team');
const Game      = require('../models/Game');

/**
* App route test.
*/
describe('Express App', () => {
    const app = require('../app');

    /**
    * Error route test.
    */
    describe('#error routes', () => {
        it('Should return 404 on unknown routes', (done) => {
            request(app)
            .get('/foo/bar')
            .expect(404, done);
        });
    });

    /**
    * Web routes test.
    */
    describe('#web routes', () => {
        it('base path should return 200', (done) => {
            request(app)
            .get('/')
            .expect(200, done);
        });
    });

    /**
    *  API routes test.
    */
    describe('#api routes', () => {
        it('base path should return 200', (done) => {
            request(app)
            .get('/api/')
            .expect(200, done);
        });

        describe('#challenge routes', () => {
            it('challenges base path should return 200', (done) => {
                request(app)
                .get('/api/challenges')
                .expect(200, done);
            });

            it('post to challenge should return 201', (done) => {
                request(app)
                .post('/api/challenges')
                .expect(201, done);
            });

            it('update to challenges should return 204', (done) => {
                request(app)
                .put('/api/challenges/0')
                .expect(204, done);
            });

            it('delete a challenge should return 204', (done) => {
                request(app)
                .delete('/api/challenges/0')
                .expect(204, done);
            });
        });

        describe('#team routes', () => {
            it('teams base path should return 200', (done) => {
                request(app)
                .get('/api/teams')
                .expect(200, done);
            });

            it('post to teams should return 201', (done) => {
                request(app)
                .post('/api/teams')
                .expect(201, done);
            });

            it('update to teams should return 204', (done) => {
                request(app)
                .put('/api/teams/0')
                .expect(204, done);
            });

            it('delete a team should return 204', (done) => {
                request(app)
                .delete('/api/teams/0')
                .expect(204, done);
            });
        });
    });
});

/**
* Model test.
*/
describe('Model test', () => {
    describe('#team tests', () => {
        var testTeamId;
        var testTeam;
        
        before('Before add the test team', (done) => {
            const newTeam = new Team({ name: 'Testing team 12345' });
            newTeam.save((err, team) => {
                if (team) {
                    testTeamId = team._id;
                }
                done(err);
            });
        });

        after('After remove the test team', (done) => {
            Team.findByIdAndRemove(testTeamId, (err, team) => {
                assert(team);
                done(err);
            });
        });

        it('Should retrieve a team by the name Testing team 12345', (done) => {
            Team.findOne({ name: 'Testing team 12345' }, (err, team) => {
                assert(team);
                testTeam = team;
                done(err);
            });
        });


        it('Should check team\'s created_at property', (done) => {
            assert(testTeam.created_at);
            done();
        });
    });


    describe('#game tests', () => {
        var testGameId;
        var testGame;

        before('Before add the test game', (done) => {
            const newGame = new Game();
            newGame.save((err, game) => {
                assert(game._id);
                testGameId = game._id;
                done(err);
            });
        });

        after('After remove the test game', (done) => {
            Game.findByIdAndRemove(testGameId, (err, game) => {
                assert(game);
                done(err);
            });
        });

        it('Should retrieve a game by id', (done) => {
            Game.findById(testGameId, (err, game) => {
                assert(game);
                testGame = game;
                done(err);
            });
        });

        it('Should check the game\'s created_at', (done) => {
            assert(testGame.created_at);
            done();
        });

        it('Should start a game', (done) => {
            assert(!testGame.started_at);
            testGame.start()
            assert(testGame.started_at);
            done();
        });

        it('Should finish a game', (done) => {
            assert(!testGame.ended_at);
            testGame.finish()
            assert(testGame.ended_at);
            done();
        });
    });
});
