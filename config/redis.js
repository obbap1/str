const redis = require('redis');

const url = 'redis://localhost:6379'; // process.env.REDIS_DB || 'redis://localhost:6379';

const Redis = (() => {
  let instance;

  function createInstance() {
    const client = redis.createClient({ url });
    client.select(0, (err) => {
      if (err) throw err;
    });
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
