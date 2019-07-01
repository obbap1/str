/**
 * Created by olatunji on 19/09/2017.
 */
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const redis = require("../../config/redis").getInstance();
const User = require("../models/user");

const tokenExpiration = 24 * 60 * 60; // 1 day
const appString = "idfidiidfii55556666";
const options = {
  key: fs.readFileSync(
    path.join(__dirname, "../helpers/privateKey.pem"),
    "utf8"
  ),
  passphrase: "top secret"
};
const publicKey = fs.readFileSync(
  path.join(__dirname, "../helpers/publicKey.pem"),
  "utf8"
);

const cacheUser = user => {
  redis.set(
    `user::profile::${user.id}`,
    JSON.stringify(user),
    "EX",
    tokenExpiration
  );
};

const generateUserToken = user =>
  new Promise(resolve => {
    user = JSON.parse(JSON.stringify(user));
    cacheUser(user);
    user.token = jwt.sign(
      { type: user.type, email: user.email, id: user.id },
      options,
      { algorithm: "RS256", expiresIn: tokenExpiration }
    );
    resolve(user);
  });

const getCacheUser = id =>
  new Promise(resolve => {
    redis.get(`user::profile::${id}`, (err, u) => {
      if (err) {
        throw err;
      }
      if (!u) {
        User.findOne(id).then(user => {
          if (!user) return resolve(null);
          user = JSON.parse(JSON.stringify(user));
          cacheUser(user);
          return resolve(user);
        });
      }
      u = JSON.parse(u);
      return resolve(u);
    });
  });

const authorizeAll = () => (req, res, next) => {
  if (!req.header("Authorization")) return res.status(401).send("invalid user");

  jwt.verify(
    req
      .header("Authorization")
      .toString()
      .split(" ")[1],
    publicKey,
    { algorithms: ["RS256"] },
    (err, decoded) => {
      if (err) return res.status(401).send(err);
      res.token = jwt.sign(
        { type: decoded.type, email: decoded.email, id: decoded.id },
        options,
        { algorithm: "RS256", expiresIn: tokenExpiration }
      );
      getCacheUser(decoded.id).then(u => {
        if (!u) return res.status(401).send("Invalid User");
        u = Object.assign({}, u, decoded);
        req.authUser = u;
        next();
      });
    }
  );
};

const hashKey = value =>
  crypto
    .createHmac("sha256", appString)
    .update(value)
    .digest("hex");

const comparekey = (value, key) =>
  key ===
  crypto
    .createHmac("sha256", appString)
    .update(value)
    .digest("hex");

const isUser = () => (req, res, next) => {
  if (req.authUser.type !== "user") return res.status(401).send("Invalid User");
  next();
};

const isAdmin = () => (req, res, next) => {
  if (req.authUser.type !== "admin")
    return res.status(403).send("Invalid User");
  next();
};

module.exports = {
  isUser,
  isAdmin,
  hashKey,
  comparekey,
  generateUserToken,
  authorizeAll,
  cacheUser
};
