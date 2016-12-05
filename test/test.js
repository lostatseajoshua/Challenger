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
* Example test.
*/
describe('Array', () => {
    describe('#indexOf()', () => {
        it('should return -1 when the value is not present', () => {
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    });
});


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
    });
});
