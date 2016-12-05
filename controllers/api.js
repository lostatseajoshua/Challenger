'use strict';

/**
 * GET /api/challenges
 * List of challenges.
 */
exports.getChallenges = function getChallenges(req, res) {
    res.json({ challenges: [] });
};

/**
 * POST /api/challenges
 * Create new challenges.
 */
exports.postChallenges = function postChallenges(req, res) {
    res.status(201).send("Created new challenge");
}
