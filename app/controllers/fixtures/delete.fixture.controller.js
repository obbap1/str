const Fixture = require('../../models/fixture');

const deleteFixture = (req, res) => {
  const { matchLink } = req.body;
  Fixture.findOneAndDelete({ matchLink }, (err, data) => {
    if (err) return res.status(400).send('Invalid Fixture');
    return res.status(200).send('This Fixture has been deleted successfully');
  });
};

module.exports = deleteFixture;
