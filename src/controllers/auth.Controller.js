const sequelize = require('../config/db');
const User = require("../models/user.model")(sequelize);
const { generateNormalToken, generateOrGetRefreshToken } = require("../services/token.Service");
const bcrypt = require("bcrypt");

async function login(data) { 
  const isUser = await User.findOne({ where: { email: data.body.email } });

  if (!isUser) return { error: "User not found" };

  const isPassword = await bcrypt.compare(data.body.password, isUser.password);
  if (!isPassword) return { error: "Password incorrect" };

  
  const normal_token = generateNormalToken(isUser);

 
  const data_login = {
    user: isUser,
    user_agent:data.user_agent,
    ip_address: data.ip_address,
  };


  const { refresh_token } = await generateOrGetRefreshToken(data_login);


  isUser.password = undefined;

  return { normal_token, refresh_token, user: isUser };
}

module.exports = {
  login,
};