import { Attributes, DateRange, Filter, Repository, Service } from "onecore";
import { StringLiteral } from "typescript";

export interface Tournament {
    id: string;
    name: string;
    description: string;
    startDate?: Date;
    endDate?: Date;
    type: string;
    competitor: string;
    seasons: Season[];
    createdAt: Date;
}
export interface Season {
    id: string;
    name: string;
    status: string;
    rounds: Round[];
    standingsId: string;
    teams: Team[];
    tournamentId: string;
    createdAt: Date;
}

export interface Match {
    id: string;
    tournamentId: string;
    round: string;
    home: Team;
    away: Team;
    homeResult: number;
    awayResult: number;
    matchDay: Date;
    endmatch: boolean;
    createdAt: Date;
}

export interface Team {
    id: string;
    teamName: string;
    teamLogo: string;
    stadiumname?: string;
    stadiumpic?: string;
    description?: string;
    status?: string;
    eliminated?: boolean;
    shortName: string;
    seasonId: string;
    players: Player[];
    createdAt: Date;
}

export interface Player {
    id: string;
    lastName: string;
    firstName: string;
    dateOfBirth: Date;
    image: string;
    shirtNumber: number;
    scored: number;
    createdAt: Date;
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
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalsDifference: number;
    points: number;
    form: Match[];
}

export interface TournamentRepository extends Repository<Tournament, string> {
    getTournamentById(id: string): Promise<Tournament[]>;
    updateTournament(tournament: Tournament, ctx?: any): Promise<number>;
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
    updateTournament(tournament: Tournament, ctx?: any): Promise<number>;

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
        type: "string",
    },
    name: {
        type: "string",
        required: true,
    },
    description: { type: "string" },
    startDate: {
        type: "datetime",
    },
    endDate: { type: "datetime" },
    type: { type: "string" },
    competitor: { type: "string" },
    seasons: {},
    team: {},
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
