/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema   = mongoose.Schema
// create a schema
const playerSchema = new Schema({
  name: { type: String, minlength: 1 },
  username: { type: String, required: true, unique: true, minlength: 1 },
  team: Schema.Types.ObjectId,
  created_at: Date,
});

// create a model using schema
const Player = mongoose.model('Player', playerSchema);

// on every save, add the date
playerSchema.pre('save', (next) => {
  if (!this.created_at) {
    this.created_at = new Date();
  }
  next();
});

// make this available to our users in our Node applications
module.exports = Player;
