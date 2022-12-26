import { Attributes, DateRange, Filter, Repository, Service } from "onecore";
// import { Player } from "../player/player";

export interface Match {
    id?: string;
    seasonId?: string;
    round?: string;
    home?: Team;
    away?: Team;
    homeResult?: number;
    awayResult?: number;
    homeLineUp?: Player[];
    awayLineUp?: Player[];
    createdAt?: Date;
    matchDay?: Date;
    referee?: string;
    spectators?: string;
    assistance?: Player;
    process?: Process[];
    endmatch?: boolean;
    
}

export interface Process {
    id?: string;
    type?: string;
    mins?: string;
    quater?: string;
    playerOne?: string | Player;
    playerTwo?: string | Player;
    cardcolor?: string;
    side?: string;
    match?: string;
    option?: string;
    description?: string;
    createdAt?: Date;
}

export interface Team {
    id?:string;
    won?: number;
    lost?: number;
    drawn?: number;
    homepoint?: Point;
    awaypoint?:Point;

    players?: Player[];

}
export interface Point {
    won?:number;
    lost?:number;
}

export interface Player {
    id?: string;
    name?: string;
    image?: string;
    shirtnumber?: number;
    firstname?: string;
    lastname?: string;
    dateofbirth?: Date;
    createdat?: Date;
    teamid?: string;
}

export interface MatchRepository extends Repository<Match, string> {
    updateMatch(id: string, process: Process[], ctx?: any): Promise<Match[]>;
    getMatchById(matchId: string): Promise<Match[]>;
    getMatchDetails(matchId: string): Promise<Match[]>;
    createProcessAndAddProcessToMatch(process:Process,match:Match):Promise<number>;
    endMatch(match: Match): Promise<number>;
}
export interface ProcessRepository extends Repository<Process, string> {
    addProcess(process: Process[], ctx?: any): Promise<number>;
    getProcessById(processId: string): Promise<Process[]>;
    updateProcess(process: Process, ctx?: any): Promise<number>;
    getProcessByMatchId(matchId:string): Promise<Process[]>;
}

export interface TeamRepository extends Repository<Team, string> {
    getTeamByMatchId(matchId: string): Promise<Team[]>;
    getTeamById(teamId: string): Promise<Team[]>;
    getTeamBySeasonId(seasonId: string): Promise<Team[]>
}
export interface PlayerRepository extends Repository<Player, string> {
    getPlayerByTeamId(teamId:string):Promise<Player[]>;
}

export interface MatchService extends Service<Match, string, MatchFilter> {
    updateMatch(id: string, process: Process[], ctx?: any): Promise<Match[]>;
    addProcess(process: Process[], ctx?: any): Promise<number>;
    getMatchById(matchId: string): Promise<Match[]>;
    getProcessById(processId: string): Promise<Process[]>;
    updateProcess(process: Process, ctx?: any): Promise<number>;
    getMatchDetails(matchId: string): Promise<Match[]>;
    getTeamByMatchId(matchId: string): Promise<Team[]>;
    getTeamById(teamId: string): Promise<Team[]>;
    getTeamBySeasonId(seasonId: string): Promise<Team[]>;
    getProcessByMatchId(matchId:string): Promise<Process[]>;
    getPlayerByTeamId(teamId:string):Promise<Player[]>;
    createProcessAndAddProcessToMatch(process:Process,match:Match):Promise<number>;
    endMatch(match: Match): Promise<number>;
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
    homeLineUp:{type: "array"},
    awayLineUp:{type: "array"},
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
    homeLineUp: Player[];
    awayLineUp: Player[];
    createdAt: Date;
    matchDay: Date;
    referee: string;
    spectators: string;
    assistance: string;
    process: Process[];
    endmatch: boolean;
}
