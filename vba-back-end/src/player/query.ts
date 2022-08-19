import { Statement } from "query-core";
import { PlayerFilter } from "./player";

export const getPlayersByTeamId = `select * from players where '{"id": "$1"}' <@ ANY(teams)`;

export function buildQuery(s: PlayerFilter): Statement {
  let query = `select * from players`;
  const where = [];
  const params = [];
  let i = 1;
  if (s.id && s.id.length > 0) {
    where.push(`id = $${i++}`);
    params.push(s.id);
  }
  if (s.name && s.name.length > 0) {
    where.push(`name ilike $${i++}`);
    params.push("%" + s.name + "%");
  }

  if (where.length > 0) {
    query = query + ` where ` + where.join(" and ");
  }
  return { query, params };
}
// CREATE INDEX interests_index ON users (interests);
// db.Query(`select interests from users where interests && $1 and skills && $2`, [ 'Basketball', 'Kapp' ])
