const sequelize = require('../config/db');
const User = require("../models/user.model")(sequelize);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE_IN,
    }
  );
}

async function login(data) {
  const isUser = await User.findOne({ where: { email: data.email } });

  if (!isUser) {
    return { error: "User not found" };
  }

  const isPassword = await bcrypt.compare(data.password, isUser.password);

  if (!isPassword) {
    return { error: "Password incorrect" };
  }

  const token = createToken(isUser);

  // remove password before sending response
  isUser.password = undefined;

  return { token, user: isUser };
}

module.exports = {
  login,
};