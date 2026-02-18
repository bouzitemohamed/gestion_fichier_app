module.exports.health = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ status: "ok server work well" }),
  };
};