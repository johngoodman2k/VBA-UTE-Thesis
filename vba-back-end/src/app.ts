import { merge } from "config-plus";
import dotenv from "dotenv";
import express, { json } from "express";
import { allow, loadTemplates, MiddlewareLogger } from "express-ext";
import http from "http";
import { createLogger } from "logger-core";
import { Pool } from "pg";
import { PoolManager } from "pg-extension";
import { log } from "query-core";
import { buildTemplates, trim } from "query-mappers";
import { config, env } from "./config";
import { useContext } from "./context";
import { routes } from "./routes";

dotenv.config();
const conf = merge(config, process.env, env, process.env.ENV);

const app = express();
const logger = createLogger(conf.log);
const middleware = new MiddlewareLogger(logger.info, conf.middleware);

app.use(allow(conf.allow), json(), middleware.log);

// const templates = loadTemplates(conf.template, buildTemplates, trim, [
//   "./src/query.xml",
// ]);

const pool = new Pool(conf.db);

//test
pool.connect().then((client) => {
  client
    .query("select $1::text as name", ["pg-pool"])
    .then((res) => {
      client.release();
      console.log("hello from", res.rows[0].name);
    })
    .catch((e) => {
      client.release();
      console.error("query error", e.message, e.stack);
    });
});


const db = log(new PoolManager(pool), conf.log.db, logger, "sql");
const ctx = useContext(db, logger, middleware);

routes(app, ctx);

http.createServer(app).listen(conf.port, () => {
  console.log("Start server at port " + conf.port);
});
