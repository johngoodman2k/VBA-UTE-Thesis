import { Attributes, Filter, Repository, Service } from "onecore";
// import { Team } from "../team/team";

export interface Player {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    image: string;
    shirtNumber: string;
    createdAt: Date;
    teams: Team[];
}

export interface Team {
    id: string;
}
export interface PlayerFilter extends Filter {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    image: string;
    shirtNumber: number;
    createdAt: Date;
    teams: Team;
}
export interface PlayerRepository extends Repository<Player, string> {
    getPlayersByTeamId(teamId: Team): Promise<Player[]>;
}
export interface PlayerService extends Service<Player, string, PlayerFilter> {
    getPlayersByTeamId(teamId: Team): Promise<Player[]>;
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
    shirtNumber: { type: "number" },
    createdAt: { type: "datetime" },
    teams: {},
};
