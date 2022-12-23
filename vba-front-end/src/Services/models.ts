export interface MatchEventInterface {
	type: 'Score' | 'Substitution' | 'Red Card' | 'Yellow Card';
	mins: number;
	homeBadge: string;
	homeName: string;
	homeResult: number;
	awayBadge: string;
	awayName: string;
	awayResult: number;
	playerName?: string;
	playerImg?: string;
	playerNumber?: number;
	assistance?: string;
	subOn?: string;
	subOnImg?: string;
	subOnNumber?: number;
	subOff?: string;
	subOffImg?: string;
	subOffNumber?: number;
	side: 'home' | 'away';
}

// export interface MatchDetail {
//   id: string;
//   mins?: number;
//   homeBadge: string;
//   homeName: string;
//   homeResult?: number;
//   awayBadge: string;
//   awayName: string;
//   awayResult: number;
//   playerName?: string;
//   playerImg?: string;
//   playerNumber?: number;
//   assistance?: string;
//   subOn?: string;
//   subOnImg?: string;
//   subOnNumber?: number;
//   subOff?: string;
//   subOffImg?: string;
//   subOffNumber?: number;
// }


export interface Tournament {
	id?: string;
	name?: string;
	description?: string;
	startDate?: Date | string;
	endDate?: Date | string;
	type?: string;
	competitor?: string;
	seasons?: Season[];
	createdAt?: Date;
}

export interface Season {
	id?: string;
	name?: string;
	status?: string;
	rounds?: Round[];
	standingsId?: string;
	teams?: Team[];
	tournamentId?: string;
	createdAt?: Date;
}

export interface Round {
	id?: string;
	roundname?: string;
	tournamentId?: string;
	tournamentid?: string;

	matches?: Match[];
	createdAt?: Date;
	createdat?: Date
}
// export interface Match {
//   id: string;
//   tournamentId: string;
//   round: string;
//   home: Team;
//   away: Team;
//   homeResult: string;
//   awayResult: string;
//   matchDay: Date;
//   createdAt: Date;
// }

export interface Team {
	id?: string;
	teamname?: string;
	teamlogo?: string | File;
	stadiumname?: string;
	stadiumpic?: string | File;
	description?: string;
	status?: string;
	eliminated?: boolean;
	players?: Player[];
	homeResult?: string;
	awayResult?: string;
	seasonId?: string
	createdAt?: Date;
	color?: string;
	shortname?: string;

	teamName?: string;
	teamLogo?: string | File;
	shortName?: string;
}


export interface TeamStandings {
	id: string;
	teamName: string;
	teamLogo: string;
	stadiumname?: string;
	stadiumpic?: string;
	description?: string;
	status?: string;
	eliminated?: boolean;
	players: Player[];
	homeResult: string;
	awayResult: string;

	createdAt: Date;
	color: string;
}

export interface Match {
	id?: string;
	tournamentId?: string;
	seasonid?: string;
	seasonId?: string;
	round?: string;
	home?: Team;
	away?: Team;
	homeResult?: string;
	awayResult?: string;
	homeresult?: string;
	homeLineUp?: string[] | Player[];
	awayLineUp?: string[] | Player[];
	awayresult?: string;
	createdAt?: Date;
	createdat?: Date;
	matchDay?: Date;
	matchday?: Date;
	referee?: string;
	spectators?: string;
	assistance?: Player;
	process?: Process[];
}

export interface CustomTeam {
	id?: string,
	teamname?: string,
	teamlogo?: string,
	stadiumname?: string,
	stadiumpic?: string,
	description?: string,
	status?: string,
	color?: string,
	seasonid?: string,
	eliminated?: boolean,
	shortname?: string,
	createdat?: Date,
	playerid?: string,
	firstname?: string,
	lastname?: string,
	dateofbirth?: Date,
	image?: string,
	shirtnumber?: number,
	height?: number,
	weight?: number,
	teamid?: string,
	country?: string,
}

export interface MatchProcess {
	homeResult?: string;
	awayResult?: string;
	process: Process[] | undefined;
}

export interface Process {
	id?: string;
	type?: string;
	mins?: number;
	quater?: string;
	playerOne?: Player;
	playerTwo?: Player;
	cardcolor?: string;
	side?: string;
	match?: string;
	option?: string;
	description?: string;
	createdAt?: Date;
}
export interface Player {
	id?: string;
	firstName?: string;
	lastName?: string;
	dateOfBirth?: Date;
	image?: File | string;
	shirtNumber?: number;
	height?: number;
	weight?: number;
	createdAt?: Date;
	teamId?: string;
	country?: string;

	flag?: string;
	firstname?: string;
	lastname?: string;
	shirtnumber?: number;
	createdat?: Date;

	teamlogo?: string;
	dateofbirth?: string;
}

export interface Standings {
	id: string;
	seasonId: string;
	statistics: Statistics[];
	createdAt: Date;
}

export interface Statistics {
	team: TeamStandings;
	played?: number;
	won?: number;
	drawn?: number;
	lost?: number;
	home?: Point;
	road?: Point;
	matchResult: number[];
}

interface Point {
	won: number;
	lost: number;
}

export interface User {
	id?: string;
	username: string;
	password: string;
	email?: string;
	name?: string;
	image?: string;
	role?: number;
	lock?: boolean;
	resetLink?: string;
	otp?: string;
	otpFG?: string;
	activated?: boolean;
}

export interface Result<T> {
	status: number | string;
	message?: string;
	value?: T;
	err?: string;
	success?: string;
}

export interface CustomTournament {
	id?: string;
	name?: string;
	description?: string;
	startdate?: string | Date;
	enddate?: string | Date;
	type?: string;
	competitor?: string;
	seasonid?: string;
	seasonname?: string;
	roundname?: string;
	roundid?: string;
	roundcreatedat?: Date | string;
	teamname?: string;
	teamlogo?: string;
	matchday?: string | Date;

	matchid?: string;
	matchhome?: string;
	matchaway?: string;
	teamid?: string;

	stadiumname?: string;

}