/**
 * Module dependencies.
 */
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
// create a schema
const teamSchema = new Schema({
  name: { type: String, required: true, unique: true, minlength: 1 },
  created_at: Date
});

// create a model using schema
const Team = mongoose.model('Team', teamSchema);

// on every save, add the date
teamSchema.pre('save', (next) => {
  if (!this.created_at) {
      this.created_at = new Date();
  }
  next();
});

// make this available to our users in our Node applications
module.exports = Team;
