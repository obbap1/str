const Fixture = require('../../models/fixture');

const viewFixture = (req, res) => {
  const { matchlink } = req.query;
  if (matchlink) {
    // FInd for a single fixture
    Fixture.find({ matchlink })
      .populate({ path: 'firstteam' })
      .populate({ path: 'secondteam' })
      .then(data => res.status(200).json(data))
      .catch(e => res.status(400).send(e));
  } else {
    // Show all fixtures
    Fixture.find({})
      .populate({ path: 'firstteam' })
      .populate({ path: 'secondteam' })
      .then(data => res.status(200).json(data))
      .catch(e => res.status(400).send(e));
  }
};

module.exports = viewFixture;
