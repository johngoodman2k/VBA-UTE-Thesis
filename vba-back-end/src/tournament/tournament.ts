import { Attributes, DateRange, Filter, Repository, Service } from "onecore";
import { StringLiteral } from "typescript";

export interface Tournament {
  id: string;
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  type: string;
  competitor: string;
  seasons: Season[];
  team: Team[];
  createdAt: Date;
}
export interface Season {
  id: string;
  name: string;
  status: string;
  rounds: Round[];
  standingsId: string;
  createdAt: Date;
}

export interface Match {
  id: string;
  tournamentId: string;
  round: string;
  home: Team;
  away: Team;
  homeResult: string;
  awayResult: string;
  matchDay: Date;
  endmatch: boolean;
  createdAt: Date;
}

export interface Team {
  id: string;
  teamname: string;
  teamlogo: string;
  stadiumname?: string;
  stadiumpic?: string;
  description?: string;
  status?: string;
  eliminated?: boolean;
  players: Player[];
  createdAt: Date;
}

export interface Player {
  id: string;
  lastName: string;
  firstName: string;
  dateOfBirth: Date;
  image: string;
  shirtNumber: string;
  scored: string;
  createdAt: Date;
  card: Card;
}

interface Card {
  red: string;
  yellow: string;
}

export interface Round {
  id: string;
  roundname: string;
  tournamentId: string;
  matches: Match[];
  createdAt: Date;
}

export interface Standings {
  id: string;
  seasonId: string;
  statistics: Statistics[];
  createdAt: Date;
}

export interface Statistics {
  team: Team;
  played: string;
  won: string;
  drawn: string;
  lost: string;
  goalsFor: string;
  goalsAgainst: string;
  goalsDifference: string;
  points: string;
  form: Match[];
}
// interface Team {
//   name: string;
//   logo: string;
// }

// interface Match {
//   home: Team;
//   away: Team;
//   homResult: string;
//   awayresult: string;
//   matchDay: string;
// }
export interface TournamentRepository extends Repository<Tournament, string> {
  getTournamentById(id: string): Promise<Tournament[]>;
  updateSeasonTournament(
    tournament: Tournament,
    newSeason: Season[],
    ctx?: any
  ): Promise<number>;
  getAllTournament(): Promise<Tournament[]>;
  createTournament(tournament: Tournament, ctx?: any): Promise<number>;
}
export interface MatchRepository extends Repository<Match, string> {
  buildToInsertMatches(matches: Match[], ctx?: any): Promise<number>;
}

export interface RoundRepository extends Repository<Round, string> {
  getRoundByTournament(tournament: string): Promise<Round[]>;
  saveRound(roud: Round): Promise<number>;
  buildToInsertRound(rounds: Round[], ctx?: any): Promise<number>;
}
export interface TeamRepository extends Repository<Team, string> {
  getTeamByTournament(tournament: string): Promise<Team[]>;
}
export interface StandingsRepository extends Repository<Standings, string> {
  createStandings(standings: Standings, ctx?: any): Promise<number>;
}
export interface SeasonRepository extends Repository<Season, string> {
  createSeason(season: Season, ctx?: any): Promise<number>;
}
export interface TournamentService
  extends Service<Tournament, string, TournamentFilter> {
  buildToInsertMatches(matches: Match[], ctx?: any): Promise<number>;
  buildToInsertRound(rounds: Round[], ctx?: any): Promise<number>;

  getRoundByTournament(tournament: string): Promise<Round[]>;

  getTeamByTournament(tournament: string): Promise<Team[]>;
  getTournamentById(id: string): Promise<Tournament[]>;

  updateSeasonTournament(
    tournament: Tournament,
    newSeason: Season[],
    ctx?: any
  ): Promise<number>;

  getAllTournament(): Promise<Tournament[]>;
  createTournament(tournament: Tournament, ctx?: any): Promise<number>;

  createStandings(standings: Standings, ctx?: any): Promise<number>;

  createSeason(season: Season, ctx?: any): Promise<number>;

  // addTeamForTournament();
}

export const tournamentModel: Attributes = {
  id: {
    key: true,
    match: "equal",
  },
  name: {
    required: true,
  },
  description: {},
  startDate: {
    field: "startdate",
  },
  endDate: {},
  type: {},
  competitor: {},
  seasons: { type: "array" },
  team: { type: "array" },
  createdAt: { type: "datetime" },
};

export interface TournamentFilter extends Filter {
  id: string;
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  type: string;
  competitor: string;
  seasons: Season[];
  team: Team[];
  createdAt: Date;
}
