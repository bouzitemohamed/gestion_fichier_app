'use strict';
const { createUser } = require('../controllers/user.Controller');

module.exports.createUser = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const user = await createUser(body); // call the controller

    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong' }),
    };
  }
};