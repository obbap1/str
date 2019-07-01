const Team = require('../../models/team');

const updateTeam = (req, res) => {
  const { name, abbreviation, coach } = req.body;
  Team.findOneAndUpdate(
    { name },
    { name, abbreviation, coach },
    (err, data) => {
      if (err) {console.log('invalid team',err);return res.status(400).send('Invalid Team')};
      return res.status(200).send('This Team has been updated successfully');
    },
  );
};

module.exports = updateTeam;
