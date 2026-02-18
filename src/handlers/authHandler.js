'use strict';

const { login } = require("../controllers/auth.Controller");

const loginHandler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const result = await login(body);

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