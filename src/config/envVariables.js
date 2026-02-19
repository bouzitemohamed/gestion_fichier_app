require("dotenv").config();
const envVariables={
DB_NAME:process.env.DB_NAME,
DB_USER:process.env.DB_USER,
DB_PASSWORD:process.env.DB_PASSWORD,
DB_HOST:process.env.DB_HOST,
NODE_ENV:process.env.NODE_ENV,
JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
JWT_EXPIRE_IN:process.env.JWT_EXPIRE_IN,
JWT_REFRESH_SECRET_KEY:process.env.JWT_REFRESH_SECRET_KEY,
JWT_REFRESH_EXPIRE_IN:process.env.JWT_REFRESH_EXPIRE_IN,
};
module.exports=envVariables;