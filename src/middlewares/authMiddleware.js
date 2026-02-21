const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/envVariables");

async function authMiddleware(event) {
  try {
    const authHeader =
      event.headers?.authorization || event.headers?.Authorization;

    if (!authHeader) {
      return { error: "Authorization header missing", statusCode: 401 };
    }

    const token = authHeader.split(" ")[1]; 

    if (!token) {
      return { error: "Token missing", statusCode: 401 };
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    return { user: decoded }; // return user to handler
  } catch (err) {
    return { error: "Invalid or expired token", statusCode: 401 };
  }
}

module.exports = authMiddleware;