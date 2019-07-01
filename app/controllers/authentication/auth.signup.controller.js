const User = require('../../models/user');
const { hashKey } = require('../../middlewares/verify.status');

const createUser = (req, res) => {
  const {
    firstname, lastname, password, type, email,
  } = req.body;
  const user = new User({
    firstname,
    lastname,
    password: hashKey(password),
    type,
    email,
  });

  user.save((err, data) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send('Your signup process was successful!');
  });
};

module.exports = createUser;
