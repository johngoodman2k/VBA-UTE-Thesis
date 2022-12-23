import { Statement } from "pg-extension";
import { PostFilter } from "./post";

export function buildQuery(s: PostFilter): Statement {
	let query = `select * from posts`;
	const where = [];
	const params = [];
	let i = 1;
	if (s.id && s.id.length > 0) {
		where.push(`id = $${i++}`);
		params.push(s.id);
	}
	// if (s.name && s.name.length > 0) {
	//   where.push(`name ilike $${i++}`);
	//   params.push("%" + s.name + "%");
	// }

	if (where.length > 0) {
		query = query + ` where ` + where.join(' and ');
	}
	return { query, params };
}