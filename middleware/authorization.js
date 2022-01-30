const jsonwebtoken = require("jsonwebtoken");
const db = require("../config/database");
const { secret } = require("config.json");

async function authorization(req, res, next) {
  const accessToken = req.headers["authorization"];
  if (!accessToken) {
    return res.status(401).json({ message: "Token must be present" });
  }
  const token = accessToken.split(" ")[1] || accessToken;

  //Decoded
  let decoded;

  try {
    decoded = await jsonwebtoken.verify(token, secret);
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
    const user = await db.models.User.findByPk(decoded.sub);
    if (user) {
      return next();
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
}

module.exports = authorization;
