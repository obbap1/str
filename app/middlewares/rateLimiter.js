const RateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('../../config/redis').getInstance();

const Limiter = new RateLimit({
  store: new RedisStore({
    client: redis,
    expiry: 60 * 60,
  }),
  max: 250,
  delayMs: 0,
  message: 'Too many invalid requests, please try again after an hour',
});

module.exports = Limiter;
