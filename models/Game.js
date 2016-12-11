/**
 * Module dependencies.
 */
const Score     = require('./score');
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

// create a schema
const gameSchema = new Schema({
  created_at: Date,
  ended_at: Date,
  teams: [Schema.Types.ObjectId],
  score: [Score.schema]
});

// create a model using schema
const Game = mongoose.model('Game', gameSchema);

// on every save, add the date
gameSchema.pre('save', (next) => {
  if (!this.created_at) {
      this.created_at = new Date();
  }
  next();
});

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
