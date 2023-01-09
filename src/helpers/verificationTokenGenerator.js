const crypto = require("crypto");

const verificationTokenGenerator = () => {
  return crypto.randomBytes(20).toString("hex");
};

module.exports = { verificationTokenGenerator };
