'use strict';
const { login, refreshToken: refreshTokenController } = require("../controllers/auth.Controller");

/*function extractRefreshToken(event) {
  const cookies = event.cookies || [];
  const refreshCookie = cookies.find(c => c.startsWith("refresh_token="));
  if (!refreshCookie) return null;

  const base64Value = refreshCookie.split("=")[1];
  return Buffer.from(base64Value, 'base64').toString('utf-8'); 
}*/

const loginHandler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const user_agent = event.headers['user-agent'];
    const ip_address = event.requestContext?.http?.sourceIp;

    const result = await login({ body, user_agent, ip_address });
    if (result.error) return { statusCode: 401, body: JSON.stringify(result) };

    const headers = { "Content-Type": "application/json" };
   /* if (result.refresh_token) {
          const refresh_token_base64 = Buffer.from(result.refresh_token).toString('base64');
          headers["Set-Cookie"] =
          `refresh_token=${refresh_token_base64}; HttpOnly; SameSite=Strict; Path=/; Max-Age=604800`;
         } // Serverless Offline doesn’t fully handle cookies like a real browser/server
    */

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ access_token: result.normal_token, user: result.user ,refresh_token:result.refresh_token })
    };

  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: JSON.stringify({ error: "Internal server error" }) };
  }
};

const refreshTokenHandler = async (event) => {
  try {
    /*const refresh_token = extractRefreshToken(event);
    if (!refresh_token) return { statusCode: 401, body: JSON.stringify({ error: "No refresh token" }) };

    const result = await refreshTokenController(refresh_token);
    if (result.error) return { statusCode: 401, body: JSON.stringify(result) };*/
    const body = JSON.parse(event.body); // parse JSON
    const refresh_token = body.refresh_token;
    const result = await refreshTokenController(refresh_token);
    if (result.error) return { statusCode: 401, body: JSON.stringify(result) };
    return { statusCode: 200, body: JSON.stringify({ access_token: result.new_access_token }) };

  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: "Internal error" }) };
  }
};

module.exports = { loginHandler, refreshTokenHandler };