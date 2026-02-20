module.exports.health = async (event) => {
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Server is healthy!' }),
  };
};