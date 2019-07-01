const Team = require('../../models/team');

const viewTeam = (req, res) => {
  const { name } = req.query;
  if (name) {
    // FInd for a single team
    Team.findOne(
      { name },
      (err, data) => {
        if (err) return res.status(400).send('Invalid Team');
        return res.status(200).json(data);
      },
    );
  } else {
    // Show all teams
    Team.find({},
      (err, data) => {
        if (err) return res.status(400).send('Oops! Please try again');
        return res.status(200).json(data);
      });
  }
};

module.exports = viewTeam;
