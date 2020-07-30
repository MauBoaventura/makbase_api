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

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

};
