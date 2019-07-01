const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const signUpController = require('../app/controllers/authentication/auth.signup.controller');
const logInController = require('../app/controllers/authentication/auth.login.controller');
const createFixtureController = require('../app/controllers/fixtures/create.fixture.controller');
const createTeamController = require('../app/controllers/teams/create.team.controller');
const updateFixtureController = require('../app/controllers/fixtures/update.fixture.controller');
const updateTeamController = require('../app/controllers/teams/update.team.controller');
const viewFixtureController = require('../app/controllers/fixtures/view.fixture.controller');
const viewTeamController = require('../app/controllers/teams/view.team.controller');
const deleteFixtureController = require('../app/controllers/fixtures/delete.fixture.controller');
const deleteTeamController = require('../app/controllers/teams/delete.team.controller');
const searchController = require('../app/controllers/search/search.controller');
const Limiter = require('../app/middlewares/rateLimiter');
const {
  isAdmin,
  authorizeAll,
} = require('../app/middlewares/verify.status');

router.post('/signup', [check('firstname').exists(),
  check('lastname').exists(),
  check('password').exists().isLength({ min: 6 }),
  check('type').exists(),
  check('email').isEmail(),
], (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  next();
}, signUpController);

router.post('/login', [Limiter, [
  check('password').exists(),
  check('email').isEmail(),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}], logInController);

router.post(
  '/create-fixture',
  [authorizeAll(), isAdmin(), [
    check('firstteam').exists(),
    check('secondteam').exists(),

  ], (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  }],
  createFixtureController,
);

router.post(
  '/create-team',
  [authorizeAll(), isAdmin(), [
    check('name').exists(),
    check('abbreviation').exists(),
    check('coach').exists(),
  ], (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  }],
  createTeamController,
);

router.put(
  '/update-team',
  [authorizeAll(), isAdmin()],
  updateTeamController,
);

router.put(
  '/update-fixture',
  [authorizeAll(), isAdmin()],
  updateFixtureController,
);

router.delete(
  '/delete-fixture',
  [authorizeAll(), isAdmin()],
  deleteFixtureController,
);

router.delete(
  '/delete-team',
  [authorizeAll(), isAdmin()],
  deleteTeamController,
);

router.get(
  '/view-fixture',
  [authorizeAll()],
  viewFixtureController,
);

router.get(
  '/view-team',
  [authorizeAll()],
  viewTeamController,
);

router.get(
  '/search',
  searchController,
);

module.exports = router;
