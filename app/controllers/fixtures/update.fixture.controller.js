const Fixture = require('../../models/fixture');

const updateFixture = (req, res) => {
  const {
    firstteam, secondteam, scores, status, matchlink,
  } = req.body;
  Fixture.findOneAndUpdate(
    { matchlink },
    {
      firstteam, secondteam, scores, status,
    },
    (err, data) => {
      if (err) {console.log('invalid fixture',err);return res.status(400).send('Invalid Fixture')};
      return res.status(200).send('This Fixture has been updated successfully');
    },
  );
};

module.exports = updateFixture;
