import { StringLiteral } from "typescript";

export interface MatchEventInterface {
  type: "Score" | "Substitution" | "Red Card" | "Yellow Card";
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
  side: "home" | "away";
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
  id: string;
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  type: string;
  status: string;
  competitor: string;
  rounds: Round[];
  team: Team[];
  standingId: string;
  createdAt: Date;
}

export interface Round {
  id: string;
  roundname: string;
  tournamentId: string;
  matches: Match[];
  createdAt: Date;
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
  id: string;
  teamname: string;
  teamlogo: string;
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
  id: string;
  tournamentId: string;
  round: string;
  home: Team;
  away: Team;
  homeResult: string;
  awayResult: string;
  createdAt: Date;
  matchDay: Date;
  referee?: string;
  spectators?: string;
  assistance?: Player;
  process: Process[];
}

export interface MatchProcess {
  homeResult?: string;
  awayResult?: string;
  process: Process[] | undefined;
}

export interface Process {
  type: string;
  mins: string;
  player: Player[];
  side: string;
}

export interface Player {
  id: string;
  name: string;
  dateOfBirth: Date;
  image: string;
  shirtNumber: string;
  createdAt: Date;
  teams: Team[];
  card: Card;
}

interface Card {
  red: string;
  yellow: string;
}