export const config = {
	port: 8081,
	template: true,
	allow: {
		origin: '*',
		credentials: 'true',
		methods: 'GET,PUT,POST,DELETE,OPTIONS,PATCH',
		headers: '*'
	},
	log: {
		level: 'debug',
		map: {
			time: '@timestamp',
			msg: 'message'
		},
		db: true
	},
	middleware: {
		log: true,
		skips: 'health,log,middleware',
		request: 'request',
		response: 'response',
		status: 'status',
		size: 'size'
	},
	db: {
		user: 'postgres',
		host: 'db.ahkpnvfycebxyfmzbjnb.supabase.co',
		password: 'Khang0913988035',
		database: 'postgres',
		port: 5432,
		url: 'jdbc:postgresql://db.ahkpnvfycebxyfmzbjnb.supabase.co:5432/postgres'
	},
	dblocal: {
		user: 'postgres',
		host: 'localhost',
		password: '123321',
		database: 'masterdata2',
		port: 5432
	},
	jwt: {
		jwtsecret: 'ProjectVba'
	},
	mailer: {
		adminemail: 'hiphopmusic21cnpm@gmail.com',
		adminemailpassword: 'mkrctffizjocowmw',
		portsendmail: 465
	},
	keysecret: 'NguyenQuachBoiLam'
};

export const env = {
	sit: {
		port: 8082,
		db: {
			database: 'masterdata_sit'
		}
	},
	prod: {
		middleware: {
			log: false
		}
	}
};
