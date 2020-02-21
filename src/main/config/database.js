module.exports = {

	client: 'mysql',
	connection: {
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		timezone: 'UTC'
	},
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations',
		directory: __dirname + '/../database/migrations'
	}

};