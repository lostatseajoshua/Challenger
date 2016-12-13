/**
 * Module dependencies.
 */
const Score     = require('./score');
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

// create a schema
const gameSchema = new Schema({
  started_at: Date,
  ended_at: Date,
  teams: [Schema.Types.ObjectId],
  score: [Score.schema]
});

gameSchema.methods.start = function start(completion) {
  if (!this.started_at) {
    // game is already started
    this.started_at = new Date();
  }

gameSchema.prototype.complete = function finishGame(completion) {
  if (ended_at) {
    // game is already completed
    return;
  }

  ended_at = new Date();
  completion();
}

// make this available to our users in our Node applications
module.exports = Game;
