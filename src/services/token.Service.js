const sequelize = require('../config/db');
const UserSessions = require("../models/UserSessions.model")(sequelize);
const { JWT_SECRET_KEY, JWT_EXPIRE_IN, JWT_REFRESH_SECRET_KEY, JWT_REFRESH_EXPIRE_IN } = require('../config/envVariables');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function generateNormalToken(user) {
  return jwt.sign(
    { id: user.id, name: user.name },
    JWT_SECRET_KEY,
    { expiresIn: JWT_EXPIRE_IN }
  );
}

async function generateOrGetRefreshToken({ user, user_agent, ip_address }) {
  // 1️⃣ Try to find existing session for this user + device
  let session = await UserSessions.findOne({
    where: { user_id: user.id, user_agent, ip_address }
  });

  const now = new Date();

  if (session) {

    if (session.expires_at < now) {
      
      const refresh_token = jwt.sign(
        { id: user.id, name: user.name },
        JWT_REFRESH_SECRET_KEY,
        { expiresIn: JWT_REFRESH_EXPIRE_IN }
      );

      const refresh_token_hashed = await bcrypt.hash(refresh_token, 12);

      session.refresh_token_hash = refresh_token_hashed;
      session.expires_at = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);s
      await session.save();

      return { refresh_token, session };
    } else {
      return { refresh_token: null, session }; 
    }
  } else {
   
    const refresh_token = jwt.sign(
      { id: user.id, name: user.name },
      JWT_REFRESH_SECRET_KEY,
      { expiresIn: JWT_REFRESH_EXPIRE_IN }
    );

    const refresh_token_hashed = await bcrypt.hash(refresh_token, 12);

    session = await UserSessions.create({
      user_id: user.id,
      refresh_token_hash: refresh_token_hashed,
      expires_at: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), 
      user_agent,
      ip_address,
    });

    return { refresh_token, session };
  }
}

module.exports = {
  generateNormalToken,
  generateOrGetRefreshToken
};