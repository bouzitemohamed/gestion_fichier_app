'use strict';

const { login } = require("../controllers/auth.Controller");

const loginHandler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const user_agent=event.headers['user-agent'];
    const ip_address=event.requestContext?.http?.sourceIp;
    const data={
      body:body,
      user_agent:user_agent,
      ip_address:ip_address
    };
    const result = await login(data);

    if (result.error) {
      return {
        statusCode: 401,
        body: JSON.stringify(result),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};

module.exports = {
  loginHandler,
};