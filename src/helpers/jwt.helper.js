const jwt = require("jsonwebtoken");
const appConfig = require("../../config/appConfig");

/**
 * GENERATE Access token.
 *
 * @param {Object} payload Send a payload to be added to the Token
 *
 * @returns {String} Send back the generated Token.
 */
const createToken = (payload) => {
  const secret = appConfig.SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: appConfig.EXPIRES_IN });

  return token;
};

/**
 * DECODE Access Token
 *
 * @param {String} token Access Token
 *
 * @returns {any} Return an Object or String
 */
const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, appConfig.SECRET);

    return decoded;
  } catch (err) {
    return err.message || "Error decoding token";
  }
};

module.exports = { createToken, decodeToken };
