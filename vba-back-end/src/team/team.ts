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
    id?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    image?: string;
    shirtNumber?: number;
    createdAt?: Date;
    teamId?: string;
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
    createPlayerAndAddPlayerToTeam(player: Player, team: Team): Promise<number>
    getTeamById(teamId: string): Promise<Team[]>;
    getTeamsBySeasonId(seasonId: string):Promise<Team[]>;
    updateTeam( id:string,team:Team):Promise<number>;
}

export interface PlayerRepository extends Repository<Player, string> {
    getPlayerById(player: string, ctx?: any): Promise<Player[]>;
}
export interface TeamService extends Service<Team, string, TeamFilter> {
    // getTeamByTournamentId(tournamentId: string): Promise<Team[]>;
    getPlayerById(player: string, ctx?: any): Promise<Player[]>;
    getTeamById(teamId: string): Promise<Team[]>;
    createPlayerAndAddPlayerToTeam(player: Player, team: Team): Promise<number>
    getTeamsBySeasonId(seasonId: string):Promise<Team[]>;
    updateTeam( id:string,team:Team):Promise<number>;

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
    seasonId: { type: "string" },
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
