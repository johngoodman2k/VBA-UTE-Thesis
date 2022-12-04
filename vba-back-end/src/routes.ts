import { Application } from "express";
import { Pool } from "pg";
import { ApplicationContext } from "./context";
export function routes(app: Application, ctx: ApplicationContext): void {
    app.get("/health", ctx.health.check);
    app.patch("/log", ctx.log.config);
    app.patch("/middleware", ctx.middleware.config);

    app.get("/tournaments/getall", ctx.tournament.GetAllTournament); //ok
    app.post("/tournaments", ctx.tournament.create); //ok
    app.post("/tournaments/search", ctx.tournament.search); //xem xet
    app.get("/tournaments/search", ctx.tournament.search); //xem xet
    app.get("/tournaments/:id", ctx.tournament.load); //ok
    // app.post("/tournaments", ctx.tournament.createTournament);
    app.put("/tournaments/:id", ctx.tournament.update); //ok
    app.patch("/tournaments/:id", ctx.tournament.patch); //xem xet
    app.delete("/tournaments/:id", ctx.tournament.delete); //ok
    app.get(
        "/tournaments/matches/:tournamentId/:seasonId",
        ctx.tournament.GetGeneratedMatches //ok
    );

    app.post("/tournaments/createSeasonAndAddToTournament", ctx.tournament.createSeasonAndAddToTournament); //ok

    app.post("/players/search", ctx.player.search); //xem xet
    app.get("/players/search", ctx.player.search); //used
    app.get("/players/:id", ctx.player.load); //ok
    app.post("/players", ctx.player.create); //ok
    app.put("/players/:id", ctx.player.update); //ok
    app.patch("/players/:id", ctx.player.patch); //ok
    app.delete("/players/:id", ctx.player.delete); //ok
    app.get("/players/getplayersbyteamid/:teamId", ctx.player.getPlayersByTeamId); //ok

    app.post("/matches/search", ctx.match.search); //xem xet
    app.get("/matches/search", ctx.match.search); // used
    app.get("/matches/:id", ctx.match.load); //ok
    app.post("/matches", ctx.match.create); //ok
    app.put("/matches/:id", ctx.match.update); //ok
    app.patch("/matches/:id", ctx.match.patch); //ok
    app.delete("/matches/:id", ctx.match.delete); //ok
    app.post(
        "/matches/addProcessToMatch/:matchId",
        ctx.match.addProcessToMatch //ok
    );
    app.post("/matches/updateProcess/:matchId", ctx.match.updateProcess); //ok

    app.post("/teams/search", ctx.team.search); //xem xet
    app.get("/teams/search", ctx.team.search); //used
    app.get("/teams/:id", ctx.team.load); //ok
    app.post("/teams", ctx.team.create);
    app.put("/teams/:id", ctx.team.update); //ok
    app.patch("/teams/:id", ctx.team.patch); //ok
    app.delete("/teams/:id", ctx.team.delete); //ok
    app.post("/teams/addplayertoteam/:teamId", ctx.team.addPlayerToTeam); // fixing

    app.post("/process/search", ctx.process.search); //xem xet
    app.get("/process/search", ctx.process.search); //ok
    app.get("/process/:id", ctx.process.load); //ok
    app.post("/process", ctx.process.create); //ok
    app.put("/process/:id", ctx.process.update); //ok
    app.patch("/process/:id", ctx.process.patch); //ok
    app.delete("/process/:id", ctx.process.delete); //ok

    app.post("/seasons/search", ctx.season.search); //xem xet
    app.get("/seasons/search", ctx.season.search); //ok
    app.get("/seasons/:id", ctx.season.load); //ok
    app.post("/seasons", ctx.season.create); //ok
    app.put("/seasons/:id", ctx.season.update); //ok
    app.patch("/seasons/:id", ctx.season.patch); //ok
    app.delete("/seasons/:id", ctx.season.delete); //ok
    app.post(
        "/seasons/createTeamAndAddTeamToSeason",
        ctx.season.createTeamAndAddTeamToSeason //ok
    );
    // app.get("/teams/:tournament", ctx.team.getTeamByTournamentId);

    app.post("/standings/search", ctx.standings.search); //xem xet
    app.get("/standings/search", ctx.standings.search); //ok
    app.get("/standings/:id", ctx.standings.load); //ok
    app.post("/standings", ctx.standings.create); //ok
    app.put("/standings/:id", ctx.standings.update); //ok
    app.patch("/standings/:id", ctx.standings.patch); //ok
    app.delete("/standings/:id", ctx.standings.delete); //ok

    app.post("/authenticate/search", ctx.user.search); //xem xet
    app.get("/authenticate/search", ctx.user.search); //ok
    app.get("/authenticate/:id", ctx.user.load); //ok
    app.post("/authenticate", ctx.user.create); //don't use
    app.put("/authenticate/:id", ctx.user.update); //ok
    app.patch("/authenticate/:id", ctx.user.patch); //ok
    app.delete("/authenticate/:id", ctx.user.delete); //ok
    app.post("/authenticate/signIn", ctx.user.signIn);
    app.post("/authenticate/signUp", ctx.user.signUp);
}
