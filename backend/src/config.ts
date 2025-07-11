require("dotenv").config();

const env = {
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 3000,
  SECRET: process.env.JWT_SECRET_KEY,
  POSTGRES_URL: process.env.POSTGRES_URL || "postgres://username:password@host:port/database",
  API_KEY: process.env.API_KEY
}

export default env;