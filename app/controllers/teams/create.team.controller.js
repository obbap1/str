const Team = require('../../models/team');

const createTeam = (req, res) => {
  const { name, coach, abbreviation } = req.body;
  const team = new Team({
    name,
    coach,
    abbreviation,
  });

  team.save((err, data) => {
    if (err) { console.log({err});return res.status(400).send(err)};
    return res.status(200).send('Successful! Team has been saved');
  });
};

module.exports = createTeam;
