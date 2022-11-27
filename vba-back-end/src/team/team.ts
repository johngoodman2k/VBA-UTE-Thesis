import { Attributes, DateRange, Filter, Repository, Service } from "onecore";

export interface Team {
    id: string;
    teamName: string;
    teamLogo: string;
    stadiumname: string;
    stadiumpic: string;
    description: string;
    status: string;
    color: string;
    seasonId: string;
    players: Player[];
    eliminated: boolean;
    shortName: string;
    createdAt: Date;
}

export interface Player {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    image: string;
    shirtNumber: number;
    createdAt: Date;
    teams: Team;
}

export interface Tournament {
    id: string;
    name: string;
    description: string;
    startDate?: string;
    endDate?: string;
    type: string;
    status: string;
    createdAt: Date;
}

export interface TeamRepository extends Repository<Team, string> {
    // getTeamByTournamentId(tournamentId: string): Promise<Team[]>;
    getTeamById(teamId: string): Promise<Team[]>;
    updateTeam(team: Team, ctx?: any): Promise<number>;
}

export interface PlayerRepository extends Repository<Player, string> {
    getPlayerById(player: string, ctx?: any): Promise<Player[]>;
    addPlayer(players: Player[], ctx?: any): Promise<number>;
}
export interface TeamService extends Service<Team, string, TeamFilter> {
    // getTeamByTournamentId(tournamentId: string): Promise<Team[]>;
    getPlayerById(player: string, ctx?: any): Promise<Player[]>;
    getTeamById(teamId: string): Promise<Team[]>;
    updateTeam(team: Team, ctx?: any): Promise<number>;
    addPlayer(players: Player[], ctx?: any): Promise<number>;
}

export const teamModel: Attributes = {
    id: {
        key: true,
        match: "equal",
    },
    teamName: {
        required: true,
    },
    teamLogo: { type: "string" },
    stadiumname: { type: "string" },
    stadiumpic: { type: "string" },
    description: { type: "string" },
    status: { type: "string" },
    color: { type: "string" },
    season: { type: "string" },
    eliminated: {
        default: false,
        type: "boolean",
    },
    shortName: { type: "string" },
    players: { type: "array" },
    createdAt: { type: "datetime", default: new Date(Date.now()) },
};

export interface TeamFilter extends Filter {
    id: string;
    teamname: string;
    teamlogo: string;
    stadiumname: string;
    stadiumpic: string;
    description: string;
    status: string;
    color: string;
    tournament: Tournament[];
    players: Player[];
    eliminated: boolean;
    shortname: string;
    createdAt: Date;
}
