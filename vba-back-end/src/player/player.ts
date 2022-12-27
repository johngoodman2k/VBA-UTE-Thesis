import { Attributes, Filter, Repository, Service } from "onecore";
// import { Team } from "../team/team";

export interface Player {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    image: string;
    shirtNumber: number;
    height:number;
    weight:number;
    createdAt: Date;
    teamId: string;
    country: string;
    position:string;
    experience:string;
}

export interface Team{
    id:string;
    players: {id: string}[];
}

export interface PlayerFilter extends Filter{
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    image: string;
    height:number;
    weight:number;
    shirtNumber: number;
    createdAt: Date;
    teamId: string;
    country:string;
}

export interface PlayerRepository extends Repository<Player, string> {
    getPlayersByTeamId(teamId: string): Promise<Player[]>;
    updatePlayer(id:string,player:Player):Promise<number>;
    getAllPlayer():Promise<Player[]>;
}
export interface TeamRepository extends Repository<Team, string> {
}
export interface PlayerService extends Service<Player, string, PlayerFilter> {
    getPlayersByTeamId(teamId: string): Promise<Player[]>;
    updatePlayer(id:string,player:Player):Promise<number>;
    getAllPlayer():Promise<Player[]>;
}
export const playerModel: Attributes = {
    id: {
        key: true,
        match: "equal",
        type: "string",
    },
    firstName: { type: "string" },
    lastName: { type: "string" },
    dateOfBirth: { type: "datetime" },
    image: { type: "string" },
    height: { type: "number" },
    weight: { type: "number" },
    shirtNumber: { type: "number" },
    position:{type: "string"},
    experience:{type: "string"},
    country: {type: "string"},
    createdAt: { type: "datetime" },
    teamId: {},
};
