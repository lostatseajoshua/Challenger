/**
* Module dependencies.
*/
const assert = require('assert');
const request = require('supertest');

/**
* Example test.
*/
describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    });
});


/**
* App test.
*/
describe('Express App', function () {
    var app;
    beforeEach(function () {
        app = require('../app');
    });
    describe('#routes', function() {
        it('should return 404 on unknown routes', function(done) {
            request(app)
            .get('/foo/bar')
            .expect(404, done);
        });
    });
});
