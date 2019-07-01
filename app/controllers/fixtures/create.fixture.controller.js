const crypto = require('crypto');

const Fixture = require('../../models/fixture');

const createFixture = (req, res) => {
  const { firstteam, secondteam } = req.body;
  // create unique link
  crypto.randomBytes(64, (error, buf) => {
    if (error) throw error;
    const matchlink = buf.toString('hex');

    const fixture = new Fixture({
      firstteam,
      secondteam,
      matchlink,
    });

    fixture.save((err) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send('Successful! Fixture has been saved');
    });
  });
};

module.exports = createFixture;
