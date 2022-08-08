import {
    HealthController,
    LogController,
    Logger,
    Middleware,
    MiddlewareController,
    resources,
  } from "express-ext";
  import { createChecker, DB } from "query-core";
  import { TemplateMap } from "query-mappers";
  import { createValidator } from "xvalidators";

  import { TournamentController, useTournamentController} from "./tournament/index"
  import { MatchController, useMatchController} from "./match/index"
  import { PlayerController, usePlayerController} from "./player/index"
  import { TeamController, useTeamController} from "./team/index"

  resources.createValidator = createValidator;
  
  export interface ApplicationContext {
    health: HealthController;
    log: LogController;
    middleware: MiddlewareController;
    tournament: TournamentController;
    match: MatchController;
    player: PlayerController;
    team: TeamController;
  }
  export function useContext(
    db: DB,
    logger: Logger,
    midLogger: Middleware,
    mapper?: TemplateMap
  ): ApplicationContext {
    const log = new LogController(logger);
    const middleware = new MiddlewareController(midLogger);
    const sqlChecker = createChecker(db);
    const health = new HealthController([sqlChecker]);
    const tournament = useTournamentController(logger.error,db,)
    const match = useMatchController(logger.error,db)
    const player = usePlayerController(logger.error,db)
    const team = useTeamController(logger.error,db)

    return {
      health,
      log,
      middleware,
      tournament,
      match,
      player,
      team
    };
  }
  