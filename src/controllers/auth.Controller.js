'use strict';
const sequelize = require('../config/db');
const User = require("../models/user.model")(sequelize);
const { generateNormalToken, generateOrGetRefreshToken, regenerateAccessToken } = require("../services/token.Service");
const bcrypt = require("bcrypt");

async function login({ body, user_agent, ip_address }) {
  const isUser = await User.findOne({ where: { email: body.email } });
  if (!isUser) return { error: "User not found" };

  const isPassword = await bcrypt.compare(body.password, isUser.password);
  if (!isPassword) return { error: "Password incorrect" };

  const normal_token = generateNormalToken(isUser);

  const { refresh_token } = await generateOrGetRefreshToken({
    user: isUser,
    user_agent,
    ip_address
  });

  isUser.password = undefined;

  return { normal_token, refresh_token, user: isUser };
}

async function refreshTokenController(refresh_token) {
  const result = await regenerateAccessToken(refresh_token);
  return result;
}

module.exports = {
  login,
  refreshToken: refreshTokenController
};