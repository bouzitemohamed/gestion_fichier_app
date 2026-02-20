'use strict';
const sequelize = require('../config/db');
const UserSessions = require("../models/UserSessions.model")(sequelize);
const { JWT_SECRET_KEY, JWT_EXPIRE_IN, JWT_REFRESH_SECRET_KEY, JWT_REFRESH_EXPIRE_IN } = require('../config/envVariables');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Generate access token
function generateNormalToken(user) {
  return jwt.sign(
    { id: user.id, name: user.name },
    JWT_SECRET_KEY,
    { expiresIn: JWT_EXPIRE_IN }
  );
}

// Generate or return refresh token
async function generateOrGetRefreshToken({ user, user_agent, ip_address }) {
  let session = await UserSessions.findOne({
    where: { user_id: user.id, user_agent, ip_address }
  });

  const now = new Date();
  let refresh_token;

  if (session) {
    // Expired -> generate new
    if (session.expires_at < now) {
      refresh_token = jwt.sign(
        { id: user.id, name: user.name },
        JWT_REFRESH_SECRET_KEY,
        { expiresIn: JWT_REFRESH_EXPIRE_IN }
      );
      session.refresh_token_hash = await bcrypt.hash(refresh_token, 12);
      session.expires_at = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      await session.save();
    } else {
      // Still valid -> generate a token from hash for sending (store plaintext somewhere if needed)
      refresh_token = jwt.sign(
        { id: user.id, name: user.name },
        JWT_REFRESH_SECRET_KEY,
        { expiresIn: JWT_REFRESH_EXPIRE_IN }
      );
    }
  } else {
    // No session -> create new
    refresh_token = jwt.sign(
      { id: user.id, name: user.name },
      JWT_REFRESH_SECRET_KEY,
      { expiresIn: JWT_REFRESH_EXPIRE_IN }
    );
    session = await UserSessions.create({
      user_id: user.id,
      refresh_token_hash: await bcrypt.hash(refresh_token, 12),
      expires_at: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      user_agent,
      ip_address
    });
  }

  return { refresh_token, session };
}

// Regenerate access token using refresh token
async function regenerateAccessToken(refresh_token) {
  if (!refresh_token) return { error: "Refresh token missing" };

  let decoded;
  try {
    decoded = jwt.verify(refresh_token, JWT_REFRESH_SECRET_KEY);
  } catch (err) {
    return { error: "Invalid refresh token" };
  }

  const session = await UserSessions.findOne({ where: { user_id: decoded.id } });
  if (!session) return { error: "Session not found" };

  const isMatch = await bcrypt.compare(refresh_token, session.refresh_token_hash);
  if (!isMatch) return { error: "Refresh token mismatch" };
  if (session.expires_at < new Date()) return { error: "Refresh token expired. Please login again." };

  const new_access_token = generateNormalToken(decoded);
  return { new_access_token };
}

module.exports = {
  generateNormalToken,
  generateOrGetRefreshToken,
  regenerateAccessToken
};