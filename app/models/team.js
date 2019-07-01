const mongoose = require('mongoose');

const { Schema } = mongoose;

const teamSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  abbreviation: {
    type: String,
    unique: true,
  },
  coach: String,
  date: { type: Date, default: Date.now },
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
