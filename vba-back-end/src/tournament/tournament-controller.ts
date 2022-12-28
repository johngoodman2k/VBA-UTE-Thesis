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
		this.getMergeTournamentById  = this.getMergeTournamentById.bind(this);
		this.generatePlayOff = this.generatePlayOff.bind(this)
		this.nextRound = this.nextRound.bind(this)

		
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
		const teams = await this.tournamentService.getTeamBySeasonId(seasonId);
		if (!teams || teams.length < 2 ) {
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
					season[0].id,
					roundId,
					'roundrobin',
					teamLength - indexRound
				);

				// // console.log(Date.now);
				const newMatches = checkGhostTeamAndRemove(matches);
				const matchesSaveToRound = newMatches.map((match) => {return {id: match.id}})

				// console.log(newMatches);
				matchesArray.push(...newMatches);

				roundArray = [
					...roundArray,
					{
						id: roundId,
						matches: matchesSaveToRound,
						roundname: (teamLength - indexRound + 1).toString(),
						seasonId: season[0].id,
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
							season[0].id,
							roundId,
							'roundrobin',
							teamLength * 2 - indexReverse
						);
						// // console.log(Date.now);
						const newMatches = checkGhostTeamAndRemove(matches);
						const matchesSaveToRound = newMatches.map((match) => {return {id: match.id}})

						// console.log(newMatches);
						matchesArray.push(...newMatches);

						roundArray = [
							...roundArray,
							{
								id: roundId,
								matches: matchesSaveToRound,
								roundname: (teamLength * 2 - indexReverse + 1).toString(),
								seasonId: season[0].id,
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

			const matches = convertTeamsGeneratedToMatches(newTeamGenerated, season[0].id, roundId, 'elimination', 1);

			const teamPlayWithGhostTeam = getTeamPlayWithGhostTeam(matches);
			const newMatches = checkGhostTeamAndRemove(matches);
			const matchesSaveToRound = newMatches.map((match) => {return {id: match.id}})

			matchesArray.push(...newMatches);

			roundArray = [
				{
					id: roundId,
					playoff:true,
					matches: matchesSaveToRound,
					roundname: newTeam.length ===8?"Tứ kết":newTeam.length ===4 ? "Bán kết" : newTeam.length ===2 ? "Chung kết":`1/${newTeam.length}`,
					seasonId: season[0].id,
					createdAt: new Date(Date.now())
				}
			];

			let round = 2;
			let remainingTeams = newTeam.length / 2; //remainingTeams= 2
			const flag = remainingTeams; // flag =2
			let newTeam1 = [];

			while (remainingTeams > 1) {
				const roundId1 = nanoid();

				for (let i = 0; i < remainingTeams; i++) { 
					newTeam1.push({
						teamname: 'W' + '#' + (i + 1) + ' ' + '1/' + remainingTeams * 2
					});
				}


				
				const teamSplited = splitTheTeam(newTeam1);
				const matches = convertTeamsGeneratedToMatches(teamSplited, season[0].id, roundId1, 'elimination', round);
				const matchesSaveToRound = matches.map((match) => {return {id: match.id}})

				matchesArray.push(...matches);

				roundArray = [
					...roundArray,
					{
						id: roundId1,
						playoff:true,
						matches: matchesSaveToRound,
						roundname: remainingTeams ===8?"Tứ kết":remainingTeams ===4 ? "Bán kết" : remainingTeams ===2 ? "Chung kết":`1/${remainingTeams}`,
						seasonId: season[0].id,
						createdAt: new Date(Date.now())
					}
				];
				newTeam1 =[]
				remainingTeams = remainingTeams / 2;
				round++;
			}

		}

		// return res.status(200).json(roundArray);

		// console.log("OK!");
		// matchesArray roundArray
		const newRoundArray = roundArray.map((round) => {return {id: round.id}})
		season[0].rounds = newRoundArray as any

		// const createMatches = await this.tournamentService.buildToInsertMatches(matchesArray);

		const rs = await this.tournamentService.createGenerate(matchesArray,roundArray,season[0])
		if(rs === 0){
			return res.status(400).json({ message: 'Generate failed' });
		}

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

	async getMergeTournamentById (req:Request, res:Response){
		const {tournamentId,seasonId} = req.params

		const seasons = await this.tournamentService.getMergeTournamentById(tournamentId,seasonId)

		if(!seasons){
			return res.status(400).json({err: "Tournament doest not exist"})
		}
		if(seasons.length ===0 )return res.status(200).json(seasons)

		const rounds = await this.tournamentService.getRoundBySeasonId(seasons[0].id)
		if(!rounds){
			return res.status(404).json({err: "Rounds doest not exist"})
		}
		if(rounds.length ===0) {
			seasons[0].rounds= []
			return res.status(200).json(seasons[0])
		}

		
		const matchesInSeason = await this.tournamentService.getMatchesBySeasonId(seasons[0].id);
		if(!matchesInSeason){
			return res.status(404).json({err: "Matches doest not exist"})
		}
		if(matchesInSeason.length ===0){
			seasons[0].rounds = rounds
			return res.status(200).json(seasons[0])
		}

		const teamsInSeason = await this.tournamentService.getTeamBySeasonId(seasons[0].id);
		if(!teamsInSeason){
			return res.status(404).json({err: "Teams doest not exist"})
		}
		if(teamsInSeason.length ===0){
			seasons[0].rounds = rounds
			return res.status(200).json(seasons[0])
		}

		for(const m of matchesInSeason){
			m.home = teamsInSeason.find((t: Team) => t.id === m.home) ?? m.home
			m.away = teamsInSeason.find((t: Team) => t.id === m.away) ?? m.away
		}
		
		for(const r of rounds){
			r.matches = matchesInSeason.filter((m:Match)=> m.round === r.id);
		}
		// const newArray = [...];

		const rs = seasons.map((s) => {return {...s , rounds: rounds,teams: teamsInSeason}}) as Season[]
		// seasons[0].rounds =rounds;
		return res.status(200).json(rs)
	}

	async generatePlayOff(req: Request, res: Response) {
		const {seasonId} = req.params;
		const {teamNumber} = req.body

		if(teamNumber%3 === 0 || teamNumber%2 !== 0){
			return res.status(400).json({err: 'Số lượng đội cần generate phải là bội số của 2 và không chia hết cho 3'})
		}

		const season = await this.tournamentService.getSeasonById(seasonId);
		if (!season || season.length === 0) {
			return res.status(400).json({ err: 'Failed to get season' });
		}
		
		const teams = await this.tournamentService.getTeamAndSortWon(seasonId);
		if (!teams || teams.length <2 ) {
			return res.status(400).json({ error: 'Need more team in season to generate' });
		}

		// if(teams.length %3 === 0 || teams.length %4 !== 0) return  res.status(400).json({err: 'Số lượng team'})	
		if(teamNumber > teams.length && (teams.length%3 === 0 || teams.length%2 !== 0)){
			return res.status(400).json({err: 'Số lượng đội cần generate phải là bội số của 2 và không chia hết cho 3'})
		}

		let teamSave = teams.slice(0,teamNumber)
		let matchesArray = [];
		let roundArray = [];

		const newTeam = randomTeam(teamSave);
		const newTeamGenerated = splitTheTeam(newTeam);
		const roundId = nanoid();


		const matches = convertTeamsGeneratedToMatches(newTeamGenerated, season[0].id, roundId, 'elimination', 1);

		const newMatches = checkGhostTeamAndRemove(matches);
		const matchesSaveToRound = newMatches.map((match) => {return {id: match.id}})

		matchesArray.push(...newMatches);

		roundArray = [
			{
				id: roundId,
				playoff:true,
				matches: matchesSaveToRound,
				roundname: newTeam.length ===8?"Tứ kết":newTeam.length ===4 ? "Bán kết" : newTeam.length ===2 ? "Chung kết":`1/${newTeam.length}`,
				seasonId: season[0].id,
				createdAt: new Date(Date.now())
			}
		];

		let round = 2;
		let remainingTeams = newTeam.length / 2; //remainingTeams= 2
		let newTeam1 = [];

		while (remainingTeams > 1) {
			const roundId1 = nanoid();

			for (let i = 0; i < remainingTeams; i++) { 
				newTeam1.push({
					teamname: 'W' + '#' + (i + 1) + ' ' + '1/' + remainingTeams * 2
				});
			}


			
			const teamSplited = splitTheTeam(newTeam1);
			const matches = convertTeamsGeneratedToMatches(teamSplited, season[0].id, roundId1, 'elimination', round);
			const matchesSaveToRound = matches.map((match) => {return {id: match.id}})

			matchesArray.push(...matches);

			roundArray = [
				...roundArray,
				{
					id: roundId1,
					playoff:true,
					matches: matchesSaveToRound,
					roundname: remainingTeams ===8?"Tứ kết":remainingTeams ===4 ? "Bán kết" : remainingTeams ===2 ? "Chung kết":`1/${remainingTeams}`,
					seasonId: season[0].id,
					createdAt: new Date(Date.now())
				}
			];
			newTeam1 =[]
			remainingTeams = remainingTeams / 2;
			round++;
		}
		const newRoundArray = roundArray.map((round) => {return {id: round.id}})
		season[0].rounds = newRoundArray as any


		const rs = this.tournamentService.createGenerate(matchesArray,roundArray,season[0])

		return res.status(200).json(rs);
	}

	async nextRound(req: Request, res: Response) {
		const {id} =req.params

		const roundPlayOff = await this.tournamentService.getRoundPlayOff();
		if(!roundPlayOff || roundPlayOff.length===0) return res.status(400).json({err: "Failed to get round"})

		const round = roundPlayOff.find(round => round.id === id);
		if(!round) return res.status(400).json({err: "Failed to get round"})

		const match = await this.tournamentService.getMatchesByRoundId(id);
		if(!match || match.length ===0) return res.status(200).json(round)
		round.matches = match

		const	roundBefore = roundPlayOff.find(r => {
			if(r.matches && (r.matches.length === round.matches.length *2)){
				return true
			}
		})
		if(!roundBefore) return res.status(400).json({err: "Can not next round"})

		const matchBefore = await this.tournamentService.getMatchesByRoundId(roundBefore.id)
		roundBefore.matches = matchBefore

		for(let i =0 ;i < round.matches.length; i++){
			for(let j = i*2 ;j < roundBefore.matches.length;j++){
				if(!roundBefore.matches[j].endmatch) return res.status(400).json({message: "Please all match before next round"})
				if(roundBefore.matches[j].homeResult >= roundBefore.matches[j].awayResult){
					round.matches[i].home = roundBefore.matches[j].home
				}
				else{
					round.matches[i].home = roundBefore.matches[j].away
				}

				if(roundBefore.matches[j+1].homeResult >= roundBefore.matches[j+1].awayResult){
					round.matches[i].away = roundBefore.matches[j+1].home
				}
				else{
					round.matches[i].away = roundBefore.matches[j+1].away
				}
				break;
			}
		}

		

		return this.tournamentService.updateMatch(round.matches)
		
	}
}
