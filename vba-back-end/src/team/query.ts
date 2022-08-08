import { Statement } from "query-core";
import { TeamFilter } from "./team";
// export function buildQuery(s: TeamFilter): Statement {
//   let query = `select * from teams`;
//   const where = [];
//   const params = [];
//   let i = 1;

//   if (where.length > 0) {
//     query = query + ` where ` + where.join(" and ");
//   }

//   if (s.id && s.id.length > 0) {
//     where.push(`id = $${i++}`);
//     params.push(s.id);
//   }

//   return { query, params };
// }
