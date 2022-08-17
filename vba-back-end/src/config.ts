export const config = {
  port: 8081,
  template: true,
  allow: {
    origin: "*",
    credentials: "true",
    methods: "GET,PUT,POST,DELETE,OPTIONS,PATCH",
    headers: "*",
  },
  log: {
    level: "debug",
    map: {
      time: "@timestamp",
      msg: "message",
    },
    db: true,
  },
  middleware: {
    log: true,
    skips: "health,log,middleware",
    request: "request",
    response: "response",
    status: "status",
    size: "size",
  },
  db: {
    user: "dsyolioonliiii",
    host: "ec2-34-251-115-141.eu-west-1.compute.amazonaws.com",
    password:
      "893c1649e656a75cb9d04980077d99ed640483c6e45e196648662d3d8c2940b4",
    database: "d73419p6mm4jj9",
    port: 5432,
    url: "postgres://dsyolioonliiii:893c1649e656a75cb9d04980077d99ed640483c6e45e196648662d3d8c2940b4@ec2-34-251-115-141.eu-west-1.compute.amazonaws.com:5432/d73419p6mm4jj9",
  },
  dblocal: {
    user: "postgres",
    host: "localhost",
    password: "123321",
    database: "masterdata2",
    port: 5432,
  },
};

export const env = {
  sit: {
    port: 8082,
    db: {
      database: "masterdata_sit",
    },
  },
  prod: {
    middleware: {
      log: false,
    },
  },
};
