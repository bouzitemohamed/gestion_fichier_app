const sequelize = require('../config/db');
const UserModel = require('../models/user.model')(sequelize);
const bcrypt = require('bcrypt');
async function createUser(data) {
  // This is reusable anywhere
  const password=await bcrypt.hash(data.password,10);
  return await UserModel.create({ name: data.name, email: data.email, password:password });
}

module.exports = {
  createUser,
};