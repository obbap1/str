const redis = require('redis');

const url = require('url'); 
const redisURL = url.parse(process.env.REDISCLOUD_URL);
// process.env.REDIS_DB || 'redis://localhost:6379';

const Redis = (() => {
  let instance;

  function createInstance() {
    const client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
    client.auth(redisURL.auth.split(":")[1]);
    return client;
  }

  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

module.exports = Redis;
