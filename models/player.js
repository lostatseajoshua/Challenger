/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema   = mongoose.Schema

// create a schema
const PlayerSchema = new Schema({
  name: { type: String, minlength: 1 },
  username: { type: String, required: true, unique: true, minlength: 1 },
  team: Schema.Types.ObjectId,
  created_at: Date,
});

// on every save, add the date
PlayerSchema.pre('save', function(next) {
  if (!this.created_at) {
    this.created_at = new Date();
  }
  next();
});

// create a model using schema
const Player = mongoose.model('Player', PlayerSchema);

// make this available to our users in our Node applications
module.exports = Player;
