export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  primaryDB: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT,
    username: process.env.USERNAME || 'root',
    password: process.env.PASSWORD || 'root',
    database: process.env.DATABASE_NAME || 'test',
  },
  // secondaryDB: {
  //   type: process.env.SEC_DATABASE_TYPE,
  //   host: process.env.SEC_DATABASE_HOST || 'localhost',
  //   port: process.env.SEC_DATABASE_PORT,
  //   username: process.env.SEC_USERNAME || 'root',
  //   password: process.env.SEC_PASSWORD || 'root',
  //   database: process.env.SEC_DATABASE_NAME || 'test',
  // },
});
