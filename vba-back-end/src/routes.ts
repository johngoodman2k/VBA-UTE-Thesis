import { Application } from "express";
import { Pool } from "pg";
import { ApplicationContext } from "./context";
export function routes(app: Application, ctx: ApplicationContext): void {
    app.get("/health", ctx.health.check);
    app.patch("/log", ctx.log.config);
    app.patch("/middleware", ctx.middleware.config);

    // app.post("/users/search", ctx.user.search);
    // app.get("/users/search", ctx.user.search);
    // app.get("/users/:id", ctx.user.load);
    // app.post("/users", ctx.user.create);
    // app.put("/users/:id", ctx.user.update);
    // app.patch("/users/:id", ctx.user.patch);
    // app.delete("/users/:id", ctx.user.delete);

    app.get("/tournaments/getall", ctx.tournament.GetAllTournament);
    app.post("/tournaments/search", ctx.tournament.search);
    app.get("/tournaments/search", ctx.tournament.search);
    app.get("/tournaments/:id", ctx.tournament.load);
    // app.post("/tournaments", ctx.tournament.createTournament);
    app.put("/tournaments/:id", ctx.tournament.update);
    app.patch("/tournaments/:id", ctx.tournament.patch);
    app.delete("/tournaments/:id", ctx.tournament.delete);
    app.get(
        "/tournaments/matches/:tournament",
        ctx.tournament.GetGeneratedMatches
    );

    app.post(
        "/tournaments/createSeasonAndAddToTournament/:tournamentId",
        ctx.tournament.createSeasonAndAddToTournament
    );

    app.post("/players/search", ctx.player.search);
    app.get("/players/search", ctx.player.search);
    app.get("/players/:id", ctx.player.load);
    app.post("/players", ctx.player.create);
    app.put("/players/:id", ctx.player.update);
    app.patch("/players/:id", ctx.player.patch);
    app.delete("/players/:id", ctx.player.delete);
    app.get(
        "/players/getplayersbyteamid/:teamId",
        ctx.player.getPlayersByTeamId
    );

    app.post("/matches/search", ctx.match.search);
    app.get("/matches/search", ctx.match.search);
    app.get("/matches/:id", ctx.match.load);
    app.post("/matches", ctx.match.create);
    app.put("/matches/:id", ctx.match.update);
    app.patch("/matches/:id", ctx.match.patch);
    app.delete("/matches/:id", ctx.match.delete);
    app.get("/matches/:tournament/:round", ctx.match.getMatches);
    app.post(
        "/matches/addProcessToMatch/:matchId",
        ctx.match.addProcessToMatch
    );
    app.post("/matches/updateProcess/:matchId", ctx.match.updateProcess);

    app.post("/teams/search", ctx.team.search);
    app.get("/teams/search", ctx.team.search);
    app.get("/teams/:id", ctx.team.load);
    app.post("/teams", ctx.team.create);
    app.put("/teams/:id", ctx.team.update);
    app.patch("/teams/:id", ctx.team.patch);
    app.delete("/teams/:id", ctx.team.delete);
    app.post("/teams/addplayertoteam/:teamId", ctx.team.addPlayerToTeam);

    app.post("/process/search", ctx.process.search);
    app.get("/process/search", ctx.process.search);
    app.get("/process/:id", ctx.process.load);
    app.post("/process", ctx.process.create);
    app.put("/process/:id", ctx.process.update);
    app.patch("/process/:id", ctx.process.patch);
    app.delete("/process/:id", ctx.process.delete);

    app.post("/seasons/search", ctx.season.search);
    app.get("/seasons/search", ctx.season.search);
    app.get("/seasons/:id", ctx.season.load);
    app.post("/seasons", ctx.season.create);
    app.put("/seasons/:id", ctx.season.update);
    app.patch("/seasons/:id", ctx.season.patch);
    app.delete("/seasons/:id", ctx.season.delete);

    // app.get("/teams/:tournament", ctx.team.getTeamByTournamentId);
}
