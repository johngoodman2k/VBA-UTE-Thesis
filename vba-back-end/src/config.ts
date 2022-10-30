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
		user: 'ffmxutholnduij',
		host: 'ec2-3-213-66-35.compute-1.amazonaws.com',
		password:
			'f17fc7b42474fa1d3085761283e366a563c2efad437f628237d2adade2d67325',
		database: 'dbt29tub5f87lo',
		port: 5432,
		url: 'postgres://ffmxutholnduij:f17fc7b42474fa1d3085761283e366a563c2efad437f628237d2adade2d67325@ec2-3-213-66-35.compute-1.amazonaws.com:5432/dbt29tub5f87lo'
	},
	dblocal: {
		user: 'postgres',
		host: 'localhost',
		password: '123321',
		database: 'masterdata2',
		port: 5432
	}
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
