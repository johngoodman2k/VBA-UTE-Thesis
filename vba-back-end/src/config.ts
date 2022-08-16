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
    user: "ffieihcycxlxxe",
    host: "ec2-34-247-72-29.eu-west-1.compute.amazonaws.com",
    password:
      "5b83da7d10731314799ba92b09235bda953bb963cec4527691b3002ff74ae008",
    database: "di4hair2a6nc5",
    port: 5432,
    url: "postgres://ffieihcycxlxxe:5b83da7d10731314799ba92b09235bda953bb963cec4527691b3002ff74ae008@ec2-34-247-72-29.eu-west-1.compute.amazonaws.com:5432/di4hair2a6nc5",
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
