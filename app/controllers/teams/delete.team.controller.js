const Team = require('../../models/team');

const deleteTeam = (req, res) => {
  const { name } = req.body;
  Team.findOneAndDelete({ name }, (err, data) => {
    if (err) return res.status(400).send('Invalid Team');
    return res.status(200).send('This Team has been deleted successfully');
  });
};

module.exports = deleteTeam;
