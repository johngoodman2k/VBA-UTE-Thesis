import { Statement } from "query-core";
import { Match, TournamentFilter } from "./tournament";
import { Team } from "./tournament";
import { nanoid } from "nanoid";
import e from "express";

// interface Matches {
//   team: Team[];
// }
// [];

export const getTournamentById = `select * from tournaments where id = $1`;

export const getRoundByTournamentId = `select * from rounds where tournamentId = $1`;

export function buildQuery(s: TournamentFilter): Statement {
    let query = `select * from tournaments`;
    const where = [];
    const params = [];
    let i = 1;

    if (where.length > 0) {
        query = query + ` where ` + where.join(" and ");
    }

    if (s.id && s.id.length > 0) {
        where.push(`id = $${i++}`);
        params.push(s.id);
    }

    return { query, params };
}

export const generateRound = (team: Team[]): Team[] => {
    // let index = teamArray.length;
    let duplicate = false;
    // do {
    //   team = [...randomTeam(teamArray, competitor)];

    //   // console.log("team", team);
    //   // console.log("roundGenerated", roundGenerated);
    //   duplicate = checkDuplicateMatch(team, roundGenerated);
    //   // console.log(duplicate);
    // } while (duplicate);
    // const newTeam = team.map((value, index) => {
    //   if (index >= team.length / 2) return value;
    // });
    const result = [];

    for (let i = 0; i < team.length / 2; i++) {
        result.push(team[i], team[team.length - 1 - i]);
    }

    // console.log(result);

    return result;
};

export const isCompetitor = (competitor: string, team: Team[]) => {
    let result = [];
    if (competitor === "double") result = [...team, ...team.reverse()];

    // console.log(round);
    const newResult = splitTheTeam(result);

    return newResult;
};

export const splitTheTeam = (team: Team[]) => {
    let result = [];
    team.forEach((item, index) => {
        if (index % 2 === 0) {
            result.push(team.slice(index, index + 2));
        }
    });
    return result;
};

export const checkDuplicateMatch = (
    team: Team[] | any,
    roundGenerated: Team[]
): boolean => {
    const round1 = roundGenerated;
    const round2 = round1.map((e: any) => e.id);
    // console.log(round2);

    let duplicate = false;

    let indexRound = 0;
    while (indexRound < round1.length) {
        let index = 0;

        while (index < team.length) {
            if (
                round1[indexRound][0].id === team[index].id &&
                round1[indexRound][1].id === team[index + 1].id
            ) {
                duplicate = true;
                break;
            }
            index = index + 2;
        }
        if (duplicate) {
            break;
        }
        console.log("indexRound", indexRound);
        indexRound++;
    }

    return duplicate;
};

export const randomTeam = (teamArray: Team[]): Team[] => {
    const flagArray: number[] = [];
    const round = [];
    let index = teamArray.length;

    if (teamArray.length % 2 === 1) {
        const ghostTeam = { id: 999, teamName: "ghostteam" };
        round.push(ghostTeam);
    }

    do {
        const team = randomNumber(0, teamArray.length - 1);

        if (flagArray.indexOf(team) === -1) {
            flagArray.push(team);
            round.push(teamArray[team]);
            index = index - 1;
        }
    } while (index > 0);

    let result = [...round];
    const result1 = [];
    return result;
};

export const randomNumber = (min: number, max: number) => {
    const maxNumber = Math.random() * (max - min + 1);

    return Math.floor(maxNumber) + min;
};

const matchDayGenerated = (
    indexRound: number,
    index: number,
    team: number
): Date => {
    const date = new Date(
        Date.now() +
            (indexRound * team + index + indexRound * 4) * 60 * 60 * 1000 * 24
    );
    date.setMinutes(0);
    date.setSeconds(0);
    if (team < 6) {
        date.setHours(16 + index);
    } else if (team >= 6 && team < 11) {
        date.setHours(12 + index);
    } else {
        date.setHours(7 + index);
    }

    return date;
};

// const matchDayGeneratedWithTypeElimination = (
//   indexRound: number,
//   index:number,
// ): Date => {
//   const date = new Date(
//     Date.now() +
//     (indexRound * team + index + indexRound * 4) * 60 * 60 * 1000 * 24  );

//   date.setMinutes(0);
//   date.setSeconds(0);

//   return date;
// };

export const convertTeamsGeneratedToMatches = (
    teamGenerated: Team[],
    seasonId: string,
    round: string,
    type: "roundrobin" | "elimination",
    indexRound: number
): Match[] => {
    const matches = [];
    const team = teamGenerated.length;
    teamGenerated.forEach((teamDuo, index: number) => {
        matches.push({
            id: nanoid(),
            seasonId: seasonId,
            home: teamDuo[0]?.id?? teamDuo[0]?.teamname ?? "",
            away: teamDuo[1]?.id??teamDuo[1]?.teamname ?? "",
            homeResult: 0,
            awayResult: 0,
            round: round,
            endmatch: false,
            refeere: "",
            spectators: "",
            createdAt: new Date(Date.now()),
            matchDay:
                type === "roundrobin"
                    ? matchDayGenerated(indexRound, index, team)
                    : matchDayGenerated(indexRound, index, team),
        });
    });
    return matches;
};

export const checkGhostTeamAndRemove = (matches: Match[]) => {
    // console.log(matches);
    const result = matches.filter((match) => {
        if (
            match.home as any === 999 ||
            match.away as any === 999
        ) {
            return false;
        } else {
            return true;
        }
    });
    return result;
};

export const getTeamPlayWithGhostTeam = (matches: Match[]) => {
    // console.log(matches);
    let result1 = undefined;
    let result2 = undefined;
    matches.forEach((match) => {
        if (match.home as any === 999) {
            result1 = match.away;
        } else if (match.away as any === 999) {
            result2 = match.home;
        }
    });
    if (result1) {
        return result1;
    } else if (result2) {
        return result2;
    } else {
        return undefined;
    }
};
