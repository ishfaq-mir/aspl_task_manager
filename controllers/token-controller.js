const jwt = require("jsonwebtoken");
class Tokens {
  static token(officeEmail, password) {
    return jwt.sign({ officeEmail, password }, process.env.JWT_PRIVATE_KEY);
  }
  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  }
}
module.exports = { Tokens };
