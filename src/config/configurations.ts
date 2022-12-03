export default () => ({
  jwt: {
    secret: process.env.SECRET_KEY,
    expiresIn: process.env.EXPIRES_IN,
  },
  database: {
    type: process.env.TYPE,
    host: process.env.HOST,
    port: process.env.PORT,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  }
});