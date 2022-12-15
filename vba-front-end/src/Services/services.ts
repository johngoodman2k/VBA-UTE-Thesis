import axios from 'axios';
import { HttpRequest } from 'axios-core';
import {
	AuthenticateServices,
	MatchServices,
	PlayerServices,
	ProcessServices,
	SeasonServices,
	StandingsServices,
	TeamServices,
	TournamentServices
} from '.';
import {
	AuthenticateServicesRoot,
	MatchServicesRoot,
	PlayerServicesRoot,
	ProcessServicesRoot,
	SeasonServicesRoot,
	StandingsServicesRoot,
	TeamServicesRoot,
	TournamentServicesRoot
} from './servicesroot';

const httpRequest = new HttpRequest(axios);
class VbaContext {
	public tournamentServices?: TournamentServicesRoot;
	public matchServices?: MatchServicesRoot;
	public teamServices?: TeamServicesRoot;
	public playerServices?: PlayerServicesRoot;
	public processServices?: ProcessServicesRoot;
	public authenticateServices?: AuthenticateServicesRoot;
	public standingsServices?: StandingsServicesRoot;
	public seasonServices?: SeasonServicesRoot;

	getTournamentServices(): TournamentServicesRoot {
		if (!this.tournamentServices) {
			this.tournamentServices = new TournamentServices('http://localhost:8080/tournaments', httpRequest);
		}
		return this.tournamentServices;
	}
	getMatchServices(): MatchServicesRoot {
		if (!this.matchServices) {
			this.matchServices = new MatchServices('http://localhost:8080/matches', httpRequest);
		}
		return this.matchServices;
	}

	getTeamServices(): TeamServicesRoot {
		if (!this.teamServices) {
			this.teamServices = new TeamServices('http://localhost:8080/teams', httpRequest);
		}
		return this.teamServices;
	}

	getPlayerServices(): PlayerServicesRoot {
		if (!this.playerServices) {
			this.playerServices = new PlayerServices('http://localhost:8080/players', httpRequest);
		}
		return this.playerServices;
	}

	getProcessServices(): ProcessServicesRoot {
		if (!this.processServices) {
			this.processServices = new ProcessServices('http://localhost:8080/process', httpRequest);
		}
		return this.processServices;
	}
	getAuthenticateServices(): AuthenticateServicesRoot {
		if (!this.authenticateServices) {
			this.authenticateServices = new AuthenticateServices('http://localhost:8080/authenticate', httpRequest);
		}
		return this.authenticateServices;
	}
	getStandingsServices(): StandingsServicesRoot {
		if (!this.standingsServices) {
			this.standingsServices = new StandingsServices('http://localhost:8080/standings', httpRequest);
		}
		return this.standingsServices;
	}
	getSeasonServices(): SeasonServicesRoot {
		if (!this.seasonServices) {
			this.seasonServices = new SeasonServices('http://localhost:8080/seasons', httpRequest);
		}
		return this.seasonServices;
	}
}
export const vbaContext = new VbaContext();
