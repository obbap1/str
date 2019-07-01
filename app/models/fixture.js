const mongoose = require('mongoose');

const { Schema } = mongoose;

const fixtureSchema = new Schema({
  firstteam: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  secondteam: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  matchlink: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
  scores: {
    type: Object,
    default: {
      firstteam: 0,
      secondteam: 0,
    },
  },
  date: { type: Date, default: Date.now },
});

const Fixture = mongoose.model('Fixture', fixtureSchema);

module.exports = Fixture;
