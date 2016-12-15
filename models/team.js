/**
 * Module dependencies.
 */
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

// create a schema
const TeamSchema = new Schema({
  name: { type: String, required: true, unique: true, minlength: 1 },
  created_at: Date
});

// on every save, add the date
TeamSchema.pre('save', function(next) {
  if (!this.created_at) {
    this.created_at = new Date();
  }
  next();
});

// create a model using schema
const Team = mongoose.model('Team', TeamSchema);

// make this available to our users in our Node applications
module.exports = Team;
