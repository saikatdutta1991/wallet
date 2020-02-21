module.exports = {

	client: 'mysql',
	connection: {
		host: 'bmo3ywktxeht1g7vdwuf-mysql.services.clever-cloud.com',
		database: 'bmo3ywktxeht1g7vdwuf',
		user: 'uypdwhwnf5pbuncj',
		password: 'UBWE6TMXTOKoBmAgiEPn'
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