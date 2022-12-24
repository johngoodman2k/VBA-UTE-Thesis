import { Application } from 'express';
import { authenToken } from './middlewares/verifyToken';
import { Pool } from 'pg';
import { ApplicationContext } from './context';
import { uploadFile, uploadFileFieldStadiumpic, uploadFileFieldTeamLogo, uploadFiles } from './middlewares/firebase';
import { upload } from './middlewares/upload';
export function routes(app: Application, ctx: ApplicationContext): void {
	app.get('/health', ctx.health.check);
	app.patch('/log', ctx.log.config);
	app.patch('/middleware', ctx.middleware.config);

	app.get('/tournaments/getall', ctx.tournament.GetAllTournament); //ok
	app.post('/tournaments', ctx.tournament.create); //ok
	app.post('/tournaments/search', ctx.tournament.search); //xem xet
	app.get('/tournaments/search', ctx.tournament.search); //xem xet
	app.get('/tournaments/:id', ctx.tournament.load); //ok
	// app.post("/tournaments", ctx.tournament.createTournament);
	app.put('/tournaments/:id', ctx.tournament.update); //ok
	app.patch('/tournaments/:id', ctx.tournament.patch); //xem xet
	app.delete('/tournaments/:id', ctx.tournament.delete); //ok
	app.get(
		'/tournaments/matches/:tournamentId/:seasonId',
		ctx.tournament.GetGeneratedMatches //ok
	);
	app.get(
		'/tournaments/getMergeTournamentById/:tournamentId/:seasonId',
		ctx.tournament.getMergeTournamentById //ok
	);
	

	app.post('/tournaments/createSeasonAndAddToTournament', ctx.tournament.createSeasonAndAddToTournament); //ok

	app.post('/players/search', ctx.player.search); //xem xet
	app.get('/players/search', ctx.player.search); //used
	app.get('/players/getall', ctx.player.getAllPlayer); //used

	app.get('/players/:id', ctx.player.load); //ok
	app.post('/players', ctx.player.create); //ok
	app.put('/players/:id',upload.single("image"),uploadFile, ctx.player.update); //ok
	app.patch('/players/:id', ctx.player.patch); //ok
	app.delete('/players/:id', ctx.player.delete); //ok
	app.get('/players/getplayersbyteamid/:teamId', ctx.player.getPlayersByTeamId); //ok

	
	
	app.post('/matches/search', ctx.match.search); //xem xet
	app.get('/matches/search', ctx.match.search); // used
	app.get('/matches/:id', ctx.match.load); //ok
	app.post('/matches', ctx.match.create); //ok
	app.put('/matches/:id', ctx.match.update); //ok
	app.patch('/matches/:id', ctx.match.patch); //ok
	app.delete('/matches/:id', ctx.match.delete); //ok
	app.post(
		'/matches/addProcessToMatch',
		ctx.match.addProcessToMatch //ok
	);
	app.get('/matches/getMatchDetails/:id', ctx.match.getMatchDetails); //ok

	app.post('/teams/search', ctx.team.search); //xem xet
	app.get('/teams/search', ctx.team.search); //used
	app.get('/teams/:id', ctx.team.load); //ok
	app.post('/teams', ctx.team.create);
	app.put('/teams/:id',upload.fields([{name: 'teamLogo', maxCount: 1}, {name: 'stadiumpic', maxCount: 1}]),uploadFileFieldTeamLogo,uploadFileFieldStadiumpic, ctx.team.update); //ok
	app.patch('/teams/:id', ctx.team.patch); //ok
	app.delete('/teams/:id', ctx.team.delete); //ok
	app.post('/teams/addPlayerToTeam', upload.single("image"),uploadFile, ctx.team.addPlayerToTeam); // fixing
	app.get('/teams/getTeamsBySeasonId/:seasonId', ctx.team.getTeamsBySeasonId); 


	app.post('/process/search', ctx.process.search); //xem xet
	app.get('/process/search', ctx.process.search); //ok
	app.get('/process/:id', ctx.process.load); //ok
	app.get('/process/getProcessesByMatchId/:id', ctx.process.getProcessesByMatchId); //ok
	app.post('/process', ctx.process.create); //ok
	app.put('/process/:id', ctx.process.update); //ok
	app.patch('/process/:id', ctx.process.patch); //ok
	app.delete('/process/:id', ctx.process.delete); //ok

	

	app.post('/seasons/search', ctx.season.search); //xem xet
	app.get('/seasons/search', ctx.season.search); //ok
	app.get('/seasons/:id', ctx.season.load); //ok
	app.post('/seasons', ctx.season.create); //ok
	app.put('/seasons/:id', ctx.season.update); //ok
	app.patch('/seasons/:id', ctx.season.patch); //ok
	app.delete('/seasons/:id', ctx.season.delete); //ok
	app.post(
		'/seasons/createTeamAndAddTeamToSeason',upload.fields([{name: 'teamLogo', maxCount: 1}, {name: 'stadiumpic', maxCount: 1}]),uploadFileFieldTeamLogo,uploadFileFieldStadiumpic,
		ctx.season.createTeamAndAddTeamToSeason //ok
	);
	app.get('/seasons/getSeasonByTournamentId/:tournamentId', ctx.season.getSeasonByTournamentId);
	// app.get("/teams/:tournament", ctx.team.getTeamByTournamentId);

	app.post('/standings/search', ctx.standings.search); //xem xet
	app.get('/standings/search', ctx.standings.search); //ok
	app.get('/standings/:id', ctx.standings.load); //ok
	app.post('/standings', ctx.standings.create); //ok
	app.put('/standings/:id', ctx.standings.update); //ok
	app.patch('/standings/:id', ctx.standings.patch); //ok
	app.delete('/standings/:id', ctx.standings.delete); //ok
	

	app.post('/authenticate/search', ctx.user.search); //xem xet
	app.get('/authenticate/search', ctx.user.search); //ok
	app.get('/authenticate/:id', ctx.user.load); //ok
	app.post('/authenticate', ctx.user.create); //don't use
	app.put('/authenticate/:id', ctx.user.update); //ok
	app.patch('/authenticate/:id', ctx.user.patch); //ok
	app.delete('/authenticate/:id', ctx.user.delete); //ok
	app.post('/authenticate/signin', ctx.user.signIn); //ok
	app.post('/authenticate/signup', ctx.user.signUp); //ok

	app.post('/authenticate/checkotpsignup', ctx.user.checkOtpSignUp);
	app.post('/authenticate/forgetPassword', ctx.user.forgetPassword);
	app.post('/authenticate/resetpassword', ctx.user.resetPassword);
	app.post('/authenticate/checkotpfg', ctx.user.checkOtpFG);
	app.get('/authenticate/user', authenToken, ctx.user.userInfo);

	app.post('/posts/search', ctx.post.search); //xem xet
	app.get('/posts/search', ctx.post.search); //ok
	app.get('/posts/:id', ctx.post.load); //ok
	app.post('/posts',upload.single("image"),uploadFile ,ctx.post.create); //ok
	app.put('/posts/:id', ctx.post.update); //ok
	app.patch('/posts/:id', ctx.post.patch); //ok
}
