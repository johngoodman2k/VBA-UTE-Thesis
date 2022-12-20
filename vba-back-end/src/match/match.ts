import { Attributes, DateRange, Filter, Repository, Service } from "onecore";
// import { Player } from "../player/player";
import { Team } from "../team/team";

export interface Match {
    id: string;
    seasonId: string;
    round: string;
    home: string | Team;
    away: string | Team;
    homeResult: number;
    awayResult: number;
    createdAt: Date;
    matchDay: Date;
    referee: string;
    spectators: string;
    assistance: Player;
    process: Process[];
    endmatch: boolean;
}

export interface Process {
    id: string;
    type: string;
    mins: string;
    quater: string;
    playerAttack: string;
    playerSupport: string;
    cardcolor: string;
    side: string;
    match: string;
    option: string;
    description: string;
    createdAt: Date;
}

interface Player {
    name: string;
    image: string;
    shirtNumber: number;
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    createdAt: Date;
    teamId: string;
}

export interface MatchRepository extends Repository<Match, string> {
    updateMatch(id: string, process: Process[], ctx?: any): Promise<Match[]>;
    getMatchById(matchId: string): Promise<Match[]>;
    getMatchDetails(matchId: string): Promise<Match[]>;
}
export interface ProcessRepository extends Repository<Process, string> {
    addProcess(process: Process[], ctx?: any): Promise<number>;
    getProcessById(processId: string): Promise<Process[]>;
    updateProcess(process: Process, ctx?: any): Promise<number>;
}

export interface TeamRepository extends Repository<Team, string> {
    getTeamByMatchId(matchId: string): Promise<Team[]>;
    getTeamById(teamId: string): Promise<Team[]>
}

export interface MatchService extends Service<Match, string, MatchFilter> {
    updateMatch(id: string, process: Process[], ctx?: any): Promise<Match[]>;
    addProcess(process: Process[], ctx?: any): Promise<number>;
    getMatchById(matchId: string): Promise<Match[]>;
    getProcessById(processId: string): Promise<Process[]>;
    updateProcess(process: Process, ctx?: any): Promise<number>;
    getMatchDetails(matchId: string): Promise<Match[]>;
    getTeamByMatchId(matchId: string): Promise<Team[]>;
    getTeamById(teamId: string): Promise<Team[]>
}

export const matchModel: Attributes = {
    id: {
        key: true,
        match: "equal",
        type: "string",
    },
    seasonId: {
        type: "string",
    },
    round: {
        type: "string",
    },
    home: {
        type: "string",
    },
    away: {
        type: "string",
    },
    homeResult: { type: "number" },
    awayResult: { type: "number" },
    createdAt: {
        type: "datetime",
    },
    matchDay: {},
    referee: { type: "string" },
    spectators: { type: "object" },
    assistance: { type: "object" },
    process: { type: "array" },
    endmatch: { type: "boolean" },
};

export interface MatchFilter extends Filter {
    id: string;
    seasonId: string;
    round: string;
    home: string;
    away: string;
    homeResult: string;
    awayResult: string;
    createdAt: Date;
    matchDay: Date;
    referee: string;
    spectators: string;
    assistance: string;
    process: Process[];
    endmatch: boolean;
}
