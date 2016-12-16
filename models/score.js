/**
 * Module dependencies.
 */
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

// create a schema
const ScoreSchema = new Schema({
    team: { type: Schema.Types.ObjectId, required: true},
    points: {type: Number, required: true},
    created_at: Date
});

ScoreSchema.pre('save', function(next) {
    if (!this.created_at) {
        this.created_at = new Date();
    }
    next();
});

// create a model using schema
const Score = mongoose.model('Score', ScoreSchema);

// make this available to our users in our Node applications
module.exports = Score;
