const User = require('../../models/user');
const {
  comparekey,
  generateUserToken,
} = require('../../middlewares/verify.status');

const loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(async (user) => {
      if (comparekey(password, user.password)) {
        const response = await generateUserToken(user);
        return res.status(200).json(response.token);
      } return res.status(400).send('Invalid User');
    })
    .catch(e => res.status(500).json(e));
};

module.exports = loginUser;
