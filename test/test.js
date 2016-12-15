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

/**
* App route test.
*/
describe('Express App', () => {
    const app = require('../app');

    /**
    * Error route test.
    */
    describe('#error routes', () => {
        it('should return 404 on unknown routes', (done) => {
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
