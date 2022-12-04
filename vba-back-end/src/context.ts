import { HealthController, LogController, Logger, Middleware, MiddlewareController, resources } from "express-ext";
import { createChecker, DB } from "query-core";
import { TemplateMap } from "query-mappers";
import { createValidator } from "xvalidators";

import { TournamentController, useTournamentController } from "./tournament/index";
import { MatchController, useMatchController } from "./match/index";
import { PlayerController, usePlayerController } from "./player/index";
import { TeamController, useTeamController } from "./team/index";
import { ProcessController, useProcessController } from "./process/index";
import { SeasonController, useSeasonController } from "./season/index";
import { StandingsController, useStandingsController } from "./standings/index";
import { UserController, useUserController } from "./authenticate/index";

import { config as Config, env as Env } from "./config";

resources.createValidator = createValidator;

export interface ApplicationContext {
    health: HealthController;
    log: LogController;
    middleware: MiddlewareController;
    user: UserController;
    tournament: TournamentController;
    match: MatchController;
    player: PlayerController;
    team: TeamController;
    process: ProcessController;
    season: SeasonController;
    standings: StandingsController;
}
export function useContext(
    db: DB,
    logger: Logger,
    midLogger: Middleware,
    config?: typeof Config,
    mapper?: TemplateMap
): ApplicationContext {
    const log = new LogController(logger);
    const middleware = new MiddlewareController(midLogger);
    const sqlChecker = createChecker(db);
    const health = new HealthController([sqlChecker]);
    const user = useUserController(logger.error, db, config);
    const tournament = useTournamentController(logger.error, db);
    const match = useMatchController(logger.error, db);
    const player = usePlayerController(logger.error, db);
    const team = useTeamController(logger.error, db);
    const process = useProcessController(logger.error, db);
    const season = useSeasonController(logger.error, db);
    const standings = useStandingsController(logger.error, db);

    return {
        health,
        log,
        middleware,
        user,
        tournament,
        match,
        player,
        team,
        process,
        season,
        standings,
    };
}
