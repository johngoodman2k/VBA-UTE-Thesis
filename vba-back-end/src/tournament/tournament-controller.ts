import { Controller, handleError, Log } from 'express-ext';
import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { Match, Tournament, TournamentFilter, TournamentService, Standings, Team, Season } from './tournament';
import { buildToInsertBatch } from 'query-core';
import {
	checkDuplicateMatch,
	checkGhostTeamAndRemove,
	convertTeamsGeneratedToMatches,
	generateRound,
	getTeamPlayWithGhostTeam,
	isCompetitor,
	randomTeam,
	splitTheTeam
} from './query';

export class TournamentController extends Controller<Tournament, string, TournamentFilter> {
	constructor(log: Log, protected tournamentService: TournamentService) {
		super(log, tournamentService);
		this.GetGeneratedMatches = this.GetGeneratedMatches.bind(this);
		this.GetAllTournament = this.GetAllTournament.bind(this);
		this.createSeasonAndAddToTournament = this.createSeasonAndAddToTournament.bind(this);

		// this.createTournament = this.createTournament.bind(this);
		// this. = this.getTeamByTournament.bind(this);
	}

	async GetGeneratedMatches(req: Request, res: Response) {
		const { tournamentId, seasonId } = req.params;
		//get object tournament theo id
		const tournamentResult = await this.tournamentService.getTournamentById(tournamentId);
		if (!tournamentResult || tournamentResult.length === 0)
			return res.status(400).json({ err: 'Failed to get tournament' });

		// console.log("b", teams);
		const season = await this.tournamentService.getSeasonById(seasonId);
		if (!season || season.length === 0) {
			return res.status(400).json({ err: 'Failed to get season' });
		}
		const teams = season[0].teams;
		if (!teams) {
			return res.status(400).json({ error: 'Need more team in season to generate' });
		}
		// const teams = tournamentResult[0].seasons[0].team

		let roundArray = [];
		let matchesArray = [];
		if (tournamentResult[0].type === 'roundrobin') {
			let indexRound = teams.length;
			let teamLength = teams.length;

			if (indexRound % 2 === 0 && indexRound >= 0) {
				indexRound = indexRound - 1;
				teamLength = teamLength - 1;
			}

			let saveTeam = [];
			const team = randomTeam(teams);

			while (indexRound > 0) {
				const roundId = nanoid();
				const teamGenerated = generateRound(team);

				team.push(team[1]);
				team.splice(1, 1);

				saveTeam = [...saveTeam, teamGenerated];

				const newTeamGenerated = splitTheTeam(teamGenerated);
				const matches = convertTeamsGeneratedToMatches(
					newTeamGenerated,
					tournamentId,
					roundId,
					'roundrobin',
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
						tournamentId: tournamentId,
						createdAt: new Date(Date.now())
					}
				];

				indexRound--;
			}

			if (tournamentResult[0].competitor === 'double') {
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
							tournamentId,
							roundId,
							'roundrobin',
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
								tournamentId: tournamentId,
								createdAt: new Date(Date.now())
							}
						];

						indexReverse--;
					});
				}
			}
		} else {
			const newTeam = randomTeam(teams);
			const newTeamGenerated = splitTheTeam(newTeam);
			const roundId = nanoid();

			// return res.status(200).json(newTeamGenerated);

			const matches = convertTeamsGeneratedToMatches(newTeamGenerated, tournamentId, roundId, 'elimination', 1);

			const teamPlayWithGhostTeam = getTeamPlayWithGhostTeam(matches);
			const newMatches = checkGhostTeamAndRemove(matches);

			matchesArray.push(...newMatches);

			roundArray = [
				...roundArray,
				{
					id: roundId,
					matches: newMatches,
					roundname: `1/${newTeam.length}`,
					tournamentId: tournamentId,
					createdAt: new Date(Date.now())
				}
			];

			let round = 2;
			let remainingTeams = newTeam.length / 2;
			const flag = remainingTeams;
			let newTeam1 = [];

			while (remainingTeams >= 1) {
				const roundId1 = nanoid();

				for (let i = 0; i < remainingTeams - 1; i++) {
					newTeam1.push({
						teamname: 'W' + '#' + (i + 1) + ' ' + '1/' + remainingTeams * 2
					});
				}
				if (remainingTeams === flag && teamPlayWithGhostTeam) {
					newTeam1.push(teamPlayWithGhostTeam);
				} else {
					const lastTeam = {
						teamname: 'W' + '#' + remainingTeams + ' ' + '1/' + remainingTeams * 2
					};
					newTeam1.push(lastTeam);

					// newTeam1.push(teamPlayWithGhostTeam);
				}

				if (remainingTeams === 1) {
					const bronzeMatchTeam1 = {
						teamname: 'L' + '#' + 1 + ' ' + '1/' + remainingTeams * 2
					};
					const bronzeMatchTeam2 = {
						teamname: 'L' + '#' + 2 + ' ' + '1/' + remainingTeams * 2
					};
					newTeam1.push(bronzeMatchTeam1, bronzeMatchTeam2);
				}

				const teamSplited = splitTheTeam(newTeam1);

				const matches = convertTeamsGeneratedToMatches(teamSplited, tournamentId, roundId1, 'elimination', round);

				matchesArray.push(...matches);

				roundArray = [
					...roundArray,
					{
						id: roundId1,
						matches: matches,
						roundname: `1/${remainingTeams}`,
						tournamentId: tournamentId,
						createdAt: new Date(Date.now())
					}
				];
				remainingTeams = remainingTeams / 2;
				round++;
			}
		}

		// return res.status(200).json(roundArray);

		// console.log("OK!");
		const createMatches = await this.tournamentService.buildToInsertMatches(matchesArray);

		if (!createMatches || createMatches === 0) return res.status(400).json({ err: 'Save matches failed' });

		const createRound = await this.tournamentService.buildToInsertRound(roundArray);

		if (!createRound || createRound === 0) return res.status(400).json({ err: 'Save rounds failed' });

		return res.status(200).json({ message: 'Generate succedded' });
	}

	async GetAllTournament(req: Request, res: Response) {
		const { _page, _limit } = req.query;

		const tournament = await this.tournamentService.getAllTournament();
		if (!tournament) return res.status(400).json({ err: 'Failed to get tournament' });
		if (_page && !_limit) {
			const limit = 10;
			const page = parseInt(_page.toString());
			const skipPage = (page - 1) * limit;
			const lastPage = skipPage + limit;
			const newTournament = tournament.slice(skipPage, lastPage);
		}

		return res.status(200).json(tournament);
	}

	async createSeasonAndAddToTournament(req: Request, res: Response) {
		const season = req.body as Season;
		const tournament = await this.tournamentService.getTournamentById(season.tournamentId);
		if (!tournament || tournament.length === 0) return res.status(400).json({ message: 'tournament does not exist' });

		//create season
		const seasonId = nanoid();
		season.id = seasonId;

		//add season to tournament
		if (!tournament[0].seasons) {
			tournament[0].seasons = [];
		}
		tournament[0].seasons.push({ id: season.id });

		//create standings
		const standingsId = nanoid();
		const standings = {} as Standings;
		standings.id = standingsId;
		standings.seasonId = seasonId;
		season.standingsId = standings.id;

		const rs = await this.tournamentService.createSeasonAndAddToTournament(season, tournament[0], standings);
		if (rs === 0) return res.status(400).json({ message: 'season create failed' });

		return res.status(201).json(tournament);
	}
}
