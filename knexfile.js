// Update with your config settings.
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: 'localhost' || process.env.DB_HOST,
      user: 'root' || process.env.DB_USER,
      password: 'password' || process.env.DB_PASS,
      database: 'markbase' || process.env.DB_NAME,
      timezone: 'utc'
    },
    migrations: {
      directory: './src/database/migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'heroku_4458bb5d838ce78',
      host: 'us-cdbr-east-02.cleardb.com',
      user: 'b9341b93806e07',
      password: '709fa3ad',
      timezone: 'utc'

    },
    migrations: {
      directory: './src/database/migrations'
    }
  },
};
