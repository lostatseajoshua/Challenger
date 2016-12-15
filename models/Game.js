/**
 * Module dependencies.
 */
const Score     = require('./score');
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

// create a schema
const GameSchema = new Schema({
  created_at: Date,
  started_at: Date,
  ended_at: Date,
  teams: [Schema.Types.ObjectId],
  scores: [Score.schema]
});

// on every save, add the date
GameSchema.pre('save', function(next) {
  if (!this.created_at) {
    this.created_at = new Date();
  }
  next();
});

GameSchema.methods.start = function start() {
  if (!this.started_at) {
    // game is already started
    this.started_at = new Date();
  }
}

GameSchema.methods.finish = function finish() {
  if (!this.ended_at && this.started_at) {
    // game is already completed
    this.ended_at = new Date();
  }
}

// create a model using schema
const Game = mongoose.model('Game', GameSchema);

// make this available to our users in our Node applications
module.exports = Game;
