import { Controller, handleError, Log } from "express-ext";
import e, { Request, Response } from "express";
import { nanoid } from "nanoid";
import {
  Match,
  Tournament,
  TournamentFilter,
  TournamentService,
  Statistics,
  Standings,
} from "./tournament";
import { buildToInsertBatch } from "query-core";
import {
  checkDuplicateMatch,
  checkGhostTeamAndRemove,
  convertTeamsGeneratedToMatches,
  generateRound,
  isCompetitor,
  randomTeam,
  splitTheTeam,
} from "./query";

export class TournamentController extends Controller<
  Tournament,
  string,
  TournamentFilter
> {
  constructor(log: Log, protected tournamentService: TournamentService) {
    super(log, tournamentService);
    this.getGeneratedMatches = this.getGeneratedMatches.bind(this);
    this.getAllTournament = this.getAllTournament.bind(this);
    this.createTournament = this.createTournament.bind(this);
    // this. = this.getTeamByTournament.bind(this);
  }

  async getGeneratedMatches(req: Request, res: Response) {
    const { tournament } = req.params;

    const roundArray = [];

    const tournamentResult = await this.tournamentService.getTournamentById(
      tournament
    );

    if (!tournamentResult)
      return res.status(400).json({ err: "  Failed to get tournament" });

    if (tournamentResult.length === 0)
      return res.status(200).json(tournamentResult);

    const teams = await this.tournamentService.getTeamByTournament(tournament);
    if (!teams) return res.status(400).json({ err: "Failed to get teams" });
    console.log(teams);

    if (tournamentResult[0].rounds === null) {
      let indexRound = teams.length;
      let teamLength = teams.length;

      if (indexRound % 2 === 0 && indexRound >= 0) {
        indexRound = indexRound - 1;
        teamLength = teamLength - 1;
      }

      let roundArray = [];
      let matchesArray = [];
      let saveTeam = [];
      const team = randomTeam(teams, tournamentResult[0].competitor);

      while (indexRound > 0) {
        const roundId = nanoid();
        const teamGenerated = generateRound(team);

        team.push(team[1]);
        team.splice(1, 1);

        saveTeam = [...saveTeam, teamGenerated];

        const newTeamGenerated = splitTheTeam(teamGenerated);
        const matches = convertTeamsGeneratedToMatches(
          newTeamGenerated,
          tournament,
          roundId,
          teamLength - indexRound
        );
        // // console.log(Date.now);
        const newMatches = checkGhostTeamAndRemove(matches);

        // console.log(newMatches);
        matchesArray.push(...newMatches);

        roundArray = [
          ...roundArray,
          {
            id: roundId,
            matches: newMatches,
            roundname: (teamLength - indexRound + 1).toString(),
            tournamentId: tournament,
            createdAt: new Date(Date.now()),
          },
        ];

        indexRound--;
      }

      if (tournamentResult[0].competitor === "double") {
        let indexReverse = teams.length;
        let teamLength = teams.length;
        if (indexReverse % 2 === 0 && indexReverse >= 0) {
          indexReverse = indexReverse - 1;
          teamLength = teamLength - 1;
        }

        while (indexReverse > 0) {
          saveTeam.forEach((element) => {
            const roundId = nanoid();
            const teamReversed = element.reverse();

            const newTeamGenerated = splitTheTeam(teamReversed);

            const matches = convertTeamsGeneratedToMatches(
              newTeamGenerated,
              tournament,
              roundId,
              teamLength * 2 - indexReverse
            );
            // // console.log(Date.now);
            const newMatches = checkGhostTeamAndRemove(matches);

            // console.log(newMatches);
            matchesArray.push(...newMatches);

            roundArray = [
              ...roundArray,
              {
                id: roundId,
                matches: newMatches,
                roundname: (teamLength * 2 - indexReverse + 1).toString(),
                tournamentId: tournament,
                createdAt: new Date(Date.now()),
              },
            ];

            indexReverse--;
          });
        }
      }

      const createMatches = await this.tournamentService.buildToInsertMatches(
        matchesArray
      );
      if (!createMatches || createMatches === 0)
        return res.status(400).json({ err: "Save matches failed" });
      const createRound = await this.tournamentService.buildToInsertRound(
        roundArray
      );
      if (!createRound || createRound === 0)
        return res.status(400).json({ err: "Save rounds failed" });

      const newTournament = await this.tournamentService.updateRoundTournament(
        tournamentResult[0],
        roundArray
      );
      if (!newTournament || newTournament === 0)
        return res.status(400).json({ err: "Update tournament failed" });

      return res.status(200).json({ message: "Generate succedded" });
    } else {
      res.status(400).json({
        err: "Rounds already exist",
        // message: roundArray,
      });
    }

    // this.tournamentService
    //   .getTournamentById(tournament)
    //   .then((tournamentResult) => {
    //     // console.log(tournamentResult);
    //     this.tournamentService
    //       .getTeamByTournament(tournament)
    //       .then((teams) => {
    //         // console.log(tournamentResult);
    //         // console.log(tournamentResult[0].competitor);

    //         if (tournamentResult[0].rounds === null) {
    //           let indexRound = teams.length;
    //           let teamLength = teams.length;

    //           if (indexRound % 2 === 0 && indexRound >= 0) {
    //             indexRound = indexRound - 1;
    //             teamLength = teamLength - 1;
    //           }

    //           let roundArray = [];
    //           let matchesArray = [];
    //           let saveTeam = [];
    //           const team = randomTeam(teams, tournamentResult[0].competitor);

    //           while (indexRound > 0) {
    //             const roundId = nanoid();
    //             const teamGenerated = generateRound(team);

    //             team.push(team[1]);
    //             team.splice(1, 1);

    //             saveTeam = [...saveTeam, teamGenerated];

    //             const newTeamGenerated = splitTheTeam(teamGenerated);
    //             const matches = convertTeamsGeneratedToMatches(
    //               newTeamGenerated,
    //               tournament,
    //               roundId,
    //               teamLength - indexRound
    //             );
    //             // // console.log(Date.now);
    //             const newMatches = checkGhostTeamAndRemove(matches);

    //             // console.log(newMatches);
    //             matchesArray.push(...newMatches);

    //             roundArray = [
    //               ...roundArray,
    //               {
    //                 id: roundId,
    //                 matches: newMatches,
    //                 roundname: (teamLength - indexRound + 1).toString(),
    //                 tournamentId: tournament,
    //                 createdAt: new Date(Date.now()),
    //               },
    //             ];

    //             indexRound--;
    //           }

    //           if (tournamentResult[0].competitor === "double") {
    //             let indexReverse = teams.length;
    //             let teamLength = teams.length;
    //             if (indexReverse % 2 === 0 && indexReverse >= 0) {
    //               indexReverse = indexReverse - 1;
    //               teamLength = teamLength - 1;
    //             }

    //             while (indexReverse > 0) {
    //               saveTeam.forEach((element) => {
    //                 const roundId = nanoid();
    //                 const teamReversed = element.reverse();

    //                 const newTeamGenerated = splitTheTeam(teamReversed);

    //                 const matches = convertTeamsGeneratedToMatches(
    //                   newTeamGenerated,
    //                   tournament,
    //                   roundId,
    //                   teamLength * 2 - indexReverse
    //                 );
    //                 // // console.log(Date.now);
    //                 const newMatches = checkGhostTeamAndRemove(matches);

    //                 // console.log(newMatches);
    //                 matchesArray.push(...newMatches);

    //                 roundArray = [
    //                   ...roundArray,
    //                   {
    //                     id: roundId,
    //                     matches: newMatches,
    //                     roundname: (
    //                       teamLength * 2 -
    //                       indexReverse +
    //                       1
    //                     ).toString(),
    //                     tournamentId: tournament,
    //                     createdAt: new Date(Date.now()),
    //                   },
    //                 ];

    //                 indexReverse--;
    //               });
    //             }

    //             this.tournamentService
    //               .buildToInsertMatches(matchesArray)
    //               .then((r) => {
    //                 if (r === 0) {
    //                   res.status(400).json({ err: "Save match failed" });
    //                 }
    //               })
    //               .catch((err) => {
    //                 handleError(err, res, this.log);
    //               });

    //             this.tournamentService
    //               .buildToInsertRound(roundArray)
    //               .then((r) => {
    //                 if (r === 0) {
    //                   res.status(400).json({ err: "Save round failed" });
    //                 }
    //               })
    //               .catch((err) => {
    //                 handleError(err, res, this.log);
    //               });

    //             this.tournamentService
    //               .updateRoundTournament(tournamentResult[0], roundArray)
    //               .then((r) => {
    //                 if (r === 0) {
    //                   res
    //                     .status(400)
    //                     .json({ message: "Update Tournament failed" });
    //                 }
    //               })
    //               .catch((err) => {
    //                 handleError(err, res, this.log);
    //               });
    //           }
    //           res.status(200).json({
    //             message: "Generate succedded",
    //             // message: roundArray,
    //           });
    //         } else {
    //           res.status(400).json({
    //             err: "Rounds already exist",
    //             // message: roundArray,
    //           });
    //         }
    //       })
    //       .catch((err) => {
    //         handleError(err, res, this.log);
    //       });
    //   })
    //   .catch((err) => {
    //     handleError(err, res, this.log);
    //   });
  }

  async getAllTournament(req: Request, res: Response) {
    const { _page, _limit } = req.query;

    const tournament = await this.tournamentService.getAllTournament();
    if (!tournament)
      return res.status(400).json({ err: "Failed to get tournament" });
    if (_page && !_limit) {
      const limit = 10;
      const page = parseInt(_page.toString());
      const skipPage = (page - 1) * limit;
      const lastPage = skipPage + limit;
      const newTournament = tournament.slice(skipPage, lastPage);
    }

    return res.status(200).json(tournament);
  }

  async createTournament(req: Request, res: Response) {
    const tournament = req.body;

    const tournamentId = nanoid();

    const standingsId = nanoid();

    const tournamentCreated = await this.tournamentService.createTournament({
      id: tournamentId,
      standingsId: standingsId,
      createdAt: new Date(Date.now()),
      ...tournament,
    });

    if (!tournamentCreated || tournamentCreated === 0)
      return res.status(400).json({ err: "Failed to create tournament" });

    // const team  = await this.tournamentService.getTeamByTournament(tournament)

    const standingsObj = new StandingsClass(
      standingsId,
      tournamentId,
      new Date(Date.now())
    );

    const standingsCreated = await this.tournamentService.createStandings(
      standingsObj.getObjDefault()
    );

    if (!standingsCreated || standingsCreated === 0)
      return res.status(400).json({ err: "Failed to create standings" });

    return res.status(200).json({ message: "Created successfully" });
  }
  // getTeamByTournament(req: Request, res: Response) {
  //   const { tournament } = req.params;
  //   this.tournamentService.getTeamByTournament(tournament).then((team) => {})
  // }

  // saveMatches(tournament: string): Promise<Match[]>
}
class StandingsClass {
  id: string;
  tournamentId: string;
  createdAt: Date;
  statistics: Statistics[];
  // objDefault = {};

  constructor(id: string, tournamentId: string, createdAt: Date) {
    this.id = id;
    this.tournamentId = tournamentId;
    this.createdAt = createdAt;
    this.statistics = [];
    this.getObjDefault = this.getObjDefault.bind(this);
  }

  getObjDefault(): Standings {
    return {
      id: this.id,
      tournamentId: this.tournamentId,
      statistics: this.statistics,
      createdAt: this.createdAt,
    };
  }
}
