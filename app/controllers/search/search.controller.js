const Team = require('../../models/team');

const findTeamDetails = (req, res) => {
  const query = {
    name: {
      $regex: new RegExp(req.query.search),
      $options: 'i',
    },
  };

  Team.aggregate([
    {
      $match: query,
    },
    {
      $lookup: {
        from: 'fixtures',
        localField: '_id',
        foreignField: 'firstteam',
        as: 'firstteam_results',

      },
    },
    { $unwind: { path: '$firstteam_results', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'fixtures',
        localField: '_id',
        foreignField: 'secondteam',
        as: 'secondteam_results',

      },
    },
    { $unwind: { path: '$secondteam_results', preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: '$_id',
        teamName: { $first: '$name' },
        coach: { $first: '$coach' },
        abbreviation: { $first: '$abbreviation' },
        away_team: { $first: '$firstteam_results.secondteam' },
        home_scores: { $first: '$firstteam_results.scores' },
        home_team: { $first: '$secondteam_results.firsteam' },
        away_scores: { $first: '$secondteam_results.scores' },
        home_count: {
          $sum: { $cond: ['$firstteam_results', 1, 0] },
        },
        away_count: {
          $sum: { $cond: ['$secondteam_results', 1, 0] },
        },

      },
    },
    {
      $project: {
        _id: '$_id',
        teamName: '$teamName',
        abbreviation: '$abbreviation',
        coach: '$coach',
        away_team: '$away_team',
        home_scores: '$home_scores',
        home_team: '$home_team',
        away_scores: '$away_scores',
        home_count: '$home_count',
        away_count: '$away_count',

      },
    },
  ])
    .then(results => res.status(200).json(results))
    .catch(e => res.status(400).send(e));
};

module.exports = findTeamDetails;
