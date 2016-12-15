/**
 * Module dependencies.
 */
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
// create a schema
const scoreSchema = new Schema({
    team: { type: Schema.Types.ObjectId, required: true},
    points: {type: Number, required: true}
});

// create a model using schema
const Score = mongoose.model('Score', scoreSchema);

// make this available to our users in our Node applications
module.exports = Score;
