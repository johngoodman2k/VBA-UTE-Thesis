import React, { useEffect, useState } from "react";
import { HeroBlock } from "../../components/Match/HeroBlock";
import classNames from "classnames/bind";
import styles from "./matchDetailPage.module.scss";
import { NavigationBar } from "../../components/Bar/NavigationBar";
import { SidebarFixture } from "../../components/LandingPage/SideBarFixtures";
import { MatchInfoBar } from "../../components/Bar/MatchInfoBar";
import { MatchResultDetailBar } from "../../components/Bar/MatchResultDetailBar";
import { MatchEvent } from "../../components/Match/MatchEvent";
import {
  MatchEventInterface,
  Player,
  Process,
  Team,
  Tournament,
} from "../../Services/models";
import { MatchEventAssistant } from "../../components/Match/MatchEventAssistant";
import { MatchEventTimeLine } from "../../components/Match/MatchEventTimeLine";
import { ModalBlock } from "../../components/Modal/ModalBlock";
import { ContentWrapper } from "../../components/Container/ContentWrapper";
import { vbaContext } from "../../Services/services";
import { Match } from "../../Services/models";
import { dateFormat } from "../../utils/dateFormat";
import { useParams } from "react-router-dom";
import { convertCompilerOptionsFromJson } from "typescript";
import { RightClickModal } from "../../components/Modal/RightClickModal";

const cx = classNames.bind(styles);

const test: MatchEventInterface[] = [
  {
    type: "Score",
    mins: 35,
    homeBadge:
      "https://logos-world.net/wp-content/uploads/2020/05/Miami-Heat-Logo-2000-Present.png ",
    homeName: "MIA",
    homeResult: 1,
    awayBadge:
      "https://1000logos.net/wp-content/uploads/2016/10/Boston-Celtics-Logo-500x313.png",
    awayName: "BOS",
    awayResult: 0,
    playerName: "Jimmy Butler",
    playerImg: "https://cdn.nba.com/headshots/nba/latest/1040x760/202710.png",
    playerNumber: 22,
    assistance: "Kevin Durant",
    side: "home",
  },
  {
    type: "Score",
    mins: 24,
    homeBadge:
      "https://logos-world.net/wp-content/uploads/2020/05/Miami-Heat-Logo-2000-Present.png ",
    homeName: "MIA",
    homeResult: 1,
    awayBadge:
      "https://1000logos.net/wp-content/uploads/2016/10/Boston-Celtics-Logo-500x313.png",
    awayName: "BOS",
    awayResult: 0,
    playerName: "Jimmy Butler",
    playerImg: "https://cdn.nba.com/headshots/nba/latest/1040x760/202710.png",
    playerNumber: 22,
    assistance: "Kevin Durant",
    side: "home",
  },

  {
    type: "Score",
    mins: 60,
    homeBadge:
      "https://logos-world.net/wp-content/uploads/2020/05/Miami-Heat-Logo-2000-Present.png ",
    homeName: "MIA",
    homeResult: 1,
    awayBadge:
      "https://1000logos.net/wp-content/uploads/2016/10/Boston-Celtics-Logo-500x313.png",
    awayName: "BOS",
    awayResult: 1,
    playerName: "Lê Hiếu Thành",
    playerImg:
      "https://sport5.mediacdn.vn/2019/11/26/photo-1574780315715-1574780315724959665461.jpeg",
    playerNumber: 0,
    assistance: "Jaylen Brown",
    side: "away",
  },
  {
    type: "Substitution",
    mins: 40,
    homeBadge:
      "https://logos-world.net/wp-content/uploads/2020/05/Miami-Heat-Logo-2000-Present.png ",
    homeName: "MIA",
    homeResult: 1,
    awayBadge:
      "https://1000logos.net/wp-content/uploads/2016/10/Boston-Celtics-Logo-500x313.png",
    awayName: "BOS",
    awayResult: 0,
    subOn: "Kyrie Irving",
    subOnNumber: 11,
    subOnImg: "https://cdn.nba.com/headshots/nba/latest/1040x760/202681.png",
    subOff: "Kevin Durant",
    subOffNumber: 7,
    subOffImg: "https://c.neh.tw/thumb/f/720/comdlpng6955114.jpg",

    side: "away",
  },
];
const matchServices = vbaContext.getMatchServices();
const teamServices = vbaContext.getTeamServices();
const playerServices = vbaContext.getPlayerServices();
export const MatchDetailPage = () => {
  const params = useParams();
  const [clickedId, setClickedId] = useState("");
  // const [clickedType, setClickedType] = useState("");
  const [cardType, setCardType] = useState("yellow");
  const [homePlayers, setHomePlayers] = useState<Player[]>([]);
  const [awayPlayers, setAwayPlayers] = useState<Player[]>([]);

  const [typeSelected, setTypeSelected] = useState("goal");
  const [sideSelected, setSideSelected] = useState("home");

  const [playerSelected, setPlayerSelected] = useState("");
  const [assistantSelected, setAssistantSelected] = useState("");
  const [subInSelected, setSubInSelected] = useState("");
  const [subOffSelected, setSubOffSelected] = useState("");
  const [reload, setReload] = useState(false);

  const [matchDetail, setMatchDetail] = useState<Match>();

  useEffect(() => {
    (async () => {
      const res = await matchServices.getMatchDetailsById(params.id);
      const res1 = await playerServices.getPlayersByTeamId(res.home.id);
      const res2 = await playerServices.getPlayersByTeamId(res.away.id);

      setMatchDetail(res);
      setHomePlayers(res1);
      setAwayPlayers(res2);
      const init =
        sideSelected === "home" && res1.length !== 0
          ? res1[0].id
          : sideSelected === "away" && res2.length !== 0
          ? res2[0].id
          : "";
      setAssistantSelected(init);
      setPlayerSelected(init);
      setSubInSelected(init);
      setSubOffSelected(init);
      console.log("129", res);
    })();
  }, [params.id, sideSelected, reload]);

  const getPlayerById = (id: string): Player | undefined => {
    let player = homePlayers.find((p: any) => p.id === id);
    console.log(player);
    if (!player) player = awayPlayers.find((p: any) => p.id === id);
    return player;
  };

  const [show, setShow] = React.useState(false);
  const [positions, setPositions] = React.useState({ x: 0, y: 0 });

  const createMatchEvent = async (e: any) => {
    e.preventDefault();
    const type = typeSelected;
    const side = sideSelected;
    console.log(assistantSelected);

    let player = getPlayerById(playerSelected);
    let homeResult = "";
    let awayResult = "";
    const mins = e.target.mins.value;
    let card = "";
    const subIn = getPlayerById(subInSelected);
    const subOff = getPlayerById(subOffSelected);

    let processObj = {
      type: type,
      side: side,
      mins: mins,
      player: new Array<Player>(),
    };
    if (player) {
      if (processObj.type === "goal") {
        const assistant = getPlayerById(assistantSelected);
        homeResult = e.target.homeresult.value;
        awayResult = e.target.awayresult.value;
        if (assistant) processObj.player.push(player, assistant);
      } else if (processObj.type === "sub") {
        if (subIn && subOff) processObj.player.push(subIn, subOff);
      } else {
        card = cardType;
        if (card === "red") {
          player.card.red = (parseInt(player?.card.red) + 1).toString();
          processObj.player.push(player);
        } else {
          player.card.yellow = (parseInt(player?.card.yellow) + 1).toString();
          processObj.player.push(player);
        }
      }
    }

    let newProcess = new Array<Process>();
    if (matchDetail?.process) {
      matchDetail?.process.push(processObj);
      newProcess = [...newProcess, ...matchDetail?.process];
    } else {
      newProcess.push(processObj);
    }

    const getMatchProcess = (
      type: string,
      process: Process[],
      homeresult: string,
      awayresult: string
    ) => {
      const result = { process: process };
      if (type === "goal") {
        return { ...result, homeResult: homeresult, awayResult: awayresult };
      } else {
        return result;
      }
    };

    const matchProcess = getMatchProcess(
      type,
      newProcess,
      homeResult,
      awayResult
    );

    const res3 = await matchServices.patchMatchDetailsById(
      params.id,
      matchProcess
    );

    setReload(!reload);
    console.log("203", res3);
  };

  return (
    <>
      <ContentWrapper>
        <section className="grid grid-cols-5">
          <div className={`${cx("__nav")} `}>
            <SidebarFixture></SidebarFixture>
          </div>
          <div className="col-span-4">
            <div className={cx("__centralContent")}>
              <section className={cx("__centralContent__box")}>
                <div className={cx("__centralContent__theme")}>
                  {/* <div className={cx("__centralContent__themeTeams")}> */}
                  <div className={cx("__centralContent__homeTheme")}>
                    <div className={cx("__centralContent__teamLogoBlock")}>
                      <img
                        src={matchDetail ? matchDetail.home.teamlogo : ""}
                        alt=""
                        className={cx(
                          "__centralContent__teamLogoBlock--adjust"
                        )}
                      />
                    </div>
                  </div>
                  {/* </div> */}
                </div>
                <div className={cx("__centralContent__theme")}>
                  {/* <div className={cx("__centralContent__themeTeams")}> */}
                  <div className={cx("__centralContent__awayTheme")}>
                    <div className={cx("__centralContent__teamLogoBlock")}>
                      <img
                        src={matchDetail ? matchDetail.away.teamlogo : "/"}
                        alt=""
                        className={cx(
                          "__centralContent__teamLogoBlock--adjust"
                        )}
                      />
                    </div>
                  </div>
                  {/* </div> */}
                </div>
                <div className={cx("__centralContent__theme")}>
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <polygon
                      points="0,0 60,0 40,100 0,100 0,0"
                      fill={matchDetail ? matchDetail.home.color : ""}
                      fillOpacity="0.95"
                    ></polygon>
                    <polygon
                      points="60,0 40,100 100,100 100,0 60,0"
                      fill={matchDetail ? matchDetail.away.color : ""}
                      fillOpacity="0.95"
                    ></polygon>
                  </svg>
                </div>
                <div className={cx("__centralContent__theme")}>
                  <div className={cx("__centralContent__themeShadow")}></div>
                </div>
                {/* <picture className={cx("__centralContent__box__background")}>
              <source
                media="min-width: 1024px"
                srcSet="https://resources.premierleague.com/premierleague/photo/2016/07/21/ccade424-00e6-4310-a183-48f7101b1f5e/Arsenal_Stadium_Emirates.jpeg"
              ></source>
              <img
                className={cx("__centralContent__box__image")}
                src="https://resources.premierleague.com/premierleague/photo/2016/07/21/ccade424-00e6-4310-a183-48f7101b1f5e/Arsenal_Stadium_Emirates.jpeg"
              ></img>
            </picture> */}
                {/* bar */}
                <div className={cx("__container")}>
                  <div className={cx("__bar")}>
                    <MatchInfoBar
                      date={
                        matchDetail
                          ? dateFormat(matchDetail.matchDay).toString()
                          : ""
                      }
                      referee={matchDetail ? matchDetail.referee : ""}
                      stadiumName={
                        matchDetail ? matchDetail.home.stadiumname : ""
                      }
                      spectators={matchDetail ? matchDetail.spectators : ""}
                    />
                  </div>
                </div>

                {/* Edit + Modal */}
                <div className={cx("__editBlock")}>
                  <div className={cx("__editBlock__wrapper")}>
                    <ul className={cx("__editBlock__wrapper--adjust")}>
                      <li
                        id="edit"
                        onClick={(e: any) =>
                          e.currentTarget.id === "edit"
                            ? setClickedId("edit")
                            : ""
                        }
                        className={
                          clickedId === "edit" ? cx("__editActive") : ""
                        }
                      >
                        Edit
                      </li>
                      {/* <li
                        id="update"
                        onClick={(e: any) =>
                          e.currentTarget.id === "update"
                            ? setClickedId("update")
                            : ""
                        }
                        className={
                          clickedId === "update" ? cx("__updateActive") : ""
                        }
                      >
                        Update
                      </li> */}
                    </ul>
                  </div>
                </div>

                <div
                  className={
                    clickedId === "edit" ? cx("__active") : cx("__inactive")
                  }
                >
                  <ModalBlock>
                    <form onSubmit={createMatchEvent}>
                      <section className="container mx-auto text-left">
                        <div className="max-w-[70%] text-7xl font-bold uppercase">
                          match detail
                        </div>
                        <label className={`${cx("__modal__title")}`}>
                          Type&nbsp;
                          <div className="inline">*</div>
                        </label>
                        <div className={`relative block ${cx("__dropdown")}`}>
                          <select
                            className={`${cx("__modal__title--select")}`}
                            value={typeSelected}
                            onChange={(e: any) => {
                              setTypeSelected(e.target.value);
                            }}
                          >
                            <option value="goal">Goal</option>
                            <option value="card">Card</option>
                            <option value="sub">Sub</option>
                          </select>
                        </div>
                        {typeSelected === "goal" ? (
                          <div>
                            <label className={`${cx("__modal__title")}`}>
                              Side&nbsp;
                              <div className="inline">*</div>
                            </label>
                            <div
                              className={`relative block ${cx("__dropdown")}`}
                            >
                              <select
                                className={`${cx("__modal__title--select")}`}
                                value={sideSelected}
                                onChange={(e: any) => {
                                  setSideSelected(e.target.value);
                                }}
                              >
                                <option value="home">Home</option>
                                <option value="away">Away</option>
                              </select>
                            </div>

                            <label className={`${cx("__modal__title")}`}>
                              Result&nbsp;
                              <div className="inline">*</div>
                            </label>
                            <div>
                              <div className="grid grid-cols-4 text-center">
                                <p className={`${cx("__modal__title")}`}>
                                  Home
                                </p>
                                <div className="col-span-2 mt-[20px] mb-[12px]">
                                  <input
                                    id="homeresult"
                                    className={`${cx("__modal__input")}`}
                                  ></input>
                                  <input
                                    id="awayresult"
                                    className={`${cx("__modal__input")}`}
                                  ></input>
                                </div>
                                <p className={`${cx("__modal__title")}`}>
                                  Away
                                </p>
                              </div>

                              <div
                                className={`grid grid-cols-3   text-center ${cx(
                                  "__modal__main"
                                )}`}
                              >
                                <div>
                                  <label className={`${cx("__modal__title")}`}>
                                    Scorer&nbsp;
                                    <div className="inline">*</div>
                                  </label>

                                  {sideSelected === "home" ? (
                                    <>
                                      <div
                                        className={`relative block ${cx(
                                          "__optionsDropdown"
                                        )}`}
                                      >
                                        <select
                                          value={playerSelected}
                                          onChange={(e: any) => {
                                            setPlayerSelected(e.target.value);
                                          }}
                                          className={`${cx("__options")}`}
                                        >
                                          {homePlayers?.map((x: any) => {
                                            return (
                                              <option value={x.id}>
                                                {x.name}
                                              </option>
                                            );
                                          })}
                                        </select>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div
                                        className={`relative block ${cx(
                                          "__optionsDropdown"
                                        )}`}
                                      >
                                        <select
                                          value={playerSelected}
                                          onChange={(e: any) => {
                                            setPlayerSelected(e.target.value);
                                          }}
                                          className={`${cx("__options")}`}
                                        >
                                          {awayPlayers?.map((x: any) => {
                                            return (
                                              <option value={x.id}>
                                                {x.name}
                                              </option>
                                            );
                                          })}
                                        </select>
                                      </div>
                                    </>
                                  )}
                                </div>
                                <div>
                                  <label className={`${cx("__modal__title")}`}>
                                    Assistant&nbsp;
                                    <div className="inline">*</div>
                                  </label>
                                  {sideSelected === "home" ? (
                                    <>
                                      <div
                                        className={`relative block ${cx(
                                          "__optionsDropdown"
                                        )}`}
                                      >
                                        <select
                                          value={assistantSelected}
                                          onChange={(e: any) => {
                                            setAssistantSelected(
                                              e.target.value
                                            );
                                          }}
                                          className={`${cx("__options")}`}
                                        >
                                          {homePlayers?.map((x: any) => {
                                            return (
                                              <option value={x.id}>
                                                {x.name}
                                              </option>
                                            );
                                          })}
                                        </select>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div
                                        className={`relative block ${cx(
                                          "__optionsDropdown"
                                        )}`}
                                      >
                                        <select
                                          value={assistantSelected}
                                          onChange={(e: any) => {
                                            setAssistantSelected(
                                              e.target.value
                                            );
                                          }}
                                          className={`${cx("__options")}`}
                                        >
                                          {awayPlayers?.map((z: any) => {
                                            return (
                                              <option value={z.id}>
                                                {z.name}
                                              </option>
                                            );
                                          })}
                                        </select>
                                      </div>
                                    </>
                                  )}
                                </div>
                                <div>
                                  <label className={`${cx("__modal__title")}`}>
                                    Mins&nbsp;
                                    <div className="inline">*</div>
                                  </label>
                                  <input
                                    id="mins"
                                    className={`${cx("__modal__input--goal")}`}
                                  ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : typeSelected === "card" ? (
                          <div>
                            <label className={`${cx("__modal__title")}`}>
                              Side&nbsp;
                              <div className="inline">*</div>
                            </label>
                            <div
                              className={`relative block ${cx("__dropdown")}`}
                            >
                              <select
                                className={`${cx("__modal__title--select")}`}
                                value={sideSelected}
                                onChange={(e: any) => {
                                  setSideSelected(e.target.value);
                                }}
                              >
                                <option value="home">Home</option>
                                <option value="away">Away</option>
                              </select>
                            </div>
                            <label className={`${cx("__modal__title")}`}>
                              Type of Card&nbsp;
                              <div className="inline">*</div>
                            </label>

                            <div>
                              <div
                                className={`relative block ${cx("__dropdown")}`}
                              >
                                <select
                                  className={`${cx("__modal__title--select")}`}
                                  value={cardType}
                                  onChange={(e: any) => {
                                    setCardType(e.target.value);
                                  }}
                                >
                                  <option value="yellow">Yellow</option>
                                  <option value="red">Red</option>
                                </select>
                              </div>

                              <div
                                className={`grid grid-cols-2   text-center ${cx(
                                  "__modal__main"
                                )}`}
                              >
                                <div>
                                  <label className={`${cx("__modal__title")}`}>
                                    Name&nbsp;
                                    <div className="inline">*</div>
                                  </label>
                                  {sideSelected === "home" ? (
                                    <>
                                      <div
                                        className={`relative block ${cx(
                                          "__optionsNameCard"
                                        )}`}
                                      >
                                        <select
                                          value={playerSelected}
                                          onChange={(e: any) => {
                                            setPlayerSelected(e.target.value);
                                          }}
                                          className={`${cx("__options")}`}
                                        >
                                          {homePlayers?.map((x: any) => {
                                            return (
                                              <option value={x.id}>
                                                {x.name}
                                              </option>
                                            );
                                          })}
                                        </select>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div
                                        className={`relative block ${cx(
                                          "__optionsNameCard"
                                        )}`}
                                      >
                                        <select
                                          value={playerSelected}
                                          onChange={(e: any) => {
                                            setPlayerSelected(e.target.value);
                                          }}
                                          className={`${cx("__options")}`}
                                        >
                                          {awayPlayers?.map((x: any) => {
                                            return (
                                              <option value={x.id}>
                                                {x.name}
                                              </option>
                                            );
                                          })}
                                        </select>
                                      </div>
                                    </>
                                  )}
                                </div>
                                <div>
                                  <label className={`${cx("__modal__title")}`}>
                                    Mins&nbsp;
                                    <div className="inline">*</div>
                                  </label>
                                  <input
                                    id="mins"
                                    className={`${cx("__modal__input--goal")}`}
                                  ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <label className={`${cx("__modal__title")}`}>
                              Side&nbsp;
                              <div className="inline">*</div>
                            </label>
                            <div>
                              <div
                                className={`relative block ${cx("__dropdown")}`}
                              >
                                <select
                                  className={`${cx("__modal__title--select")}`}
                                  value={sideSelected}
                                  onChange={(e: any) => {
                                    setSideSelected(e.target.value);
                                  }}
                                >
                                  <option value="home">Home</option>
                                  <option value="away">Away</option>
                                </select>
                              </div>

                              <div
                                className={`grid grid-cols-3   text-center ${cx(
                                  "__modal__main"
                                )}`}
                              >
                                <div>
                                  <label className={`${cx("__modal__title")}`}>
                                    Substituition In&nbsp;
                                    <div className="inline">*</div>
                                  </label>
                                  {sideSelected === "home" ? (
                                    <>
                                      <div
                                        className={`relative block ${cx(
                                          "__optionsDropdown"
                                        )}`}
                                      >
                                        <select
                                          value={subInSelected}
                                          onChange={(e: any) => {
                                            setSubInSelected(e.target.value);
                                          }}
                                          className={`${cx("__options")}`}
                                        >
                                          {homePlayers?.map((x: any) => {
                                            return (
                                              <option value={x.id}>
                                                {x.name}
                                              </option>
                                            );
                                          })}
                                        </select>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div
                                        className={`relative block ${cx(
                                          "__optionsDropdown"
                                        )}`}
                                      >
                                        <select
                                          value={subInSelected}
                                          onChange={(e: any) => {
                                            setSubInSelected(e.target.value);
                                          }}
                                          className={`${cx("__options")}`}
                                        >
                                          {awayPlayers?.map((x: any) => {
                                            return (
                                              <option value={x.id}>
                                                {x.name}
                                              </option>
                                            );
                                          })}
                                        </select>
                                      </div>
                                    </>
                                  )}
                                </div>
                                <div>
                                  <label className={`${cx("__modal__title")}`}>
                                    Substituition Off&nbsp;
                                    <div className="inline">*</div>
                                  </label>
                                  {sideSelected === "home" ? (
                                    <>
                                      <div
                                        className={`relative block ${cx(
                                          "__optionsDropdown"
                                        )}`}
                                      >
                                        <select
                                          value={subOffSelected}
                                          onChange={(e: any) => {
                                            setSubOffSelected(e.target.value);
                                          }}
                                          className={`${cx("__options")}`}
                                        >
                                          {homePlayers?.map((x: any) => {
                                            return (
                                              <option value={x.id}>
                                                {x.name}
                                              </option>
                                            );
                                          })}
                                        </select>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div
                                        className={`relative block ${cx(
                                          "__optionsDropdown"
                                        )}`}
                                      >
                                        <select
                                          value={subOffSelected}
                                          onChange={(e: any) => {
                                            setSubOffSelected(e.target.value);
                                          }}
                                          className={`${cx("__options")}`}
                                        >
                                          {awayPlayers?.map((x: any) => {
                                            return (
                                              <option value={x.id}>
                                                {x.name}
                                              </option>
                                            );
                                          })}
                                        </select>
                                      </div>
                                    </>
                                  )}
                                </div>
                                <div>
                                  <label className={`${cx("__modal__title")}`}>
                                    Mins&nbsp;
                                    <div className="inline">*</div>
                                  </label>
                                  <input
                                    id="mins"
                                    className={`${cx("__modal__input--goal")}`}
                                  ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div>
                          <div className={cx("__modal__action")}>
                            <div className={cx("__modal__action__wrapper")}>
                              <ul
                                className={cx(
                                  "__modal__action__wrapper--adjust"
                                )}
                              >
                                <li>
                                  <button
                                    id="save"
                                    type="submit"
                                    onClick={(e: any) =>
                                      e.currentTarget.id === "save"
                                        ? setClickedId("save")
                                        : ""
                                    }
                                    className={
                                      clickedId === "save"
                                        ? cx("__editActive")
                                        : ""
                                    }
                                  >
                                    Save
                                  </button>
                                </li>
                                <li
                                  id="close"
                                  onClick={(e: any) =>
                                    e.currentTarget.id === "close"
                                      ? setClickedId("close")
                                      : ""
                                  }
                                  className={
                                    clickedId === "close"
                                      ? cx("__editActive")
                                      : ""
                                  }
                                >
                                  Close
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </section>
                    </form>
                  </ModalBlock>
                </div>

                {/* scorebox */}
                <div className={cx("__scoreboxContainer")}>
                  <div className={cx("__container")}>
                    <div className={cx("__scoreboxContainer")}>
                      <MatchResultDetailBar
                        homeBadge={matchDetail ? matchDetail.home.teamlogo : ""}
                        homeName={matchDetail ? matchDetail.home.teamname : ""}
                        homeResult={matchDetail ? matchDetail.homeResult : ""}
                        awayBadge={matchDetail ? matchDetail.away.teamlogo : ""}
                        awayName={matchDetail ? matchDetail.away.teamname : ""}
                        awayResult={matchDetail ? matchDetail.awayResult : ""}
                      ></MatchResultDetailBar>

                      <div className={cx("__matchStats")}>
                        <div className={cx("__matchStats__halfTime")}>
                          <span>Half Time</span>
                          {matchDetail ? matchDetail.homeResult : ""} -{" "}
                          {matchDetail ? matchDetail.awayResult : ""}
                        </div>
                      </div>
                      <div className={cx("__matchStats__kickOff")}>
                        KickOff:
                        <strong>
                          {matchDetail
                            ? dateFormat(matchDetail.matchDay).toString()
                            : ""}
                        </strong>
                      </div>
                      <div className={cx("__matchEvents")}>
                        <div className={cx("__matchEvents__home")}>
                          {matchDetail
                            ? matchDetail.process?.map((x: any) => {
                                return x.side === "home" ? (
                                  <MatchEvent
                                    playerName={
                                      x.player ? x.player[0].name : ""
                                    }
                                    side={x.side}
                                    type={x.type}
                                    mins={x.mins}
                                  ></MatchEvent>
                                ) : (
                                  <></>
                                );
                              })
                            : ""}
                        </div>

                        <div className={cx("__matchEvents__away")}>
                          {matchDetail
                            ? matchDetail.process?.map((x: any) => {
                                return x.side === "away" ? (
                                  <MatchEvent
                                    playerName={
                                      x.player.length !== 0
                                        ? x.player[0].name
                                        : ""
                                    }
                                    side={x.side}
                                    type={x.type}
                                    mins={x.mins}
                                  ></MatchEvent>
                                ) : (
                                  <></>
                                );
                              })
                            : ""}
                        </div>
                      </div>

                      <div className={cx("__assists")}>
                        <div className={cx("__assists__title")}>Assists</div>
                        <div className={cx("__assistsHome")}>
                          {matchDetail
                            ? matchDetail.process?.map((x: any) => {
                                return x.side === "home" &&
                                  x.type === "goal" ? (
                                  <MatchEventAssistant
                                    assistance={
                                      x.player.length !== 0
                                        ? x.player[1].name
                                        : ""
                                    }
                                    side={x.side}
                                    mins={x.mins}
                                  ></MatchEventAssistant>
                                ) : (
                                  <></>
                                );
                              })
                            : ""}
                        </div>

                        <div className={cx("__assistsAway")}>
                          {matchDetail
                            ? matchDetail.process?.map((x: any) => {
                                return x.side === "away" &&
                                  x.type === "goal" ? (
                                  <MatchEventAssistant
                                    assistance={
                                      x.player.length !== 0
                                        ? x.player[1].name
                                        : ""
                                    }
                                    side={x.side}
                                    mins={x.mins}
                                  ></MatchEventAssistant>
                                ) : (
                                  <></>
                                );
                              })
                            : ""}
                        </div>
                      </div>

                      <div className={cx("__timeLine")}>
                        <a className={cx("__timeLine__team")}>
                          <span className={cx("__timeLine__badge")}>
                            <span className={cx("__timeLine__badge__block")}>
                              <img
                                src={
                                  matchDetail ? matchDetail.home.teamlogo : ""
                                }
                                className={cx("__timeLine__badge--adjust")}
                              ></img>
                            </span>
                          </span>
                          {matchDetail ? matchDetail.home.teamname : ""}
                        </a>
                        <div className={cx("__timeLine__crossbar")}>
                          <div className={cx("__timeLine__crossbar--adjust")}>
                            HT
                          </div>
                          {matchDetail
                            ? matchDetail.process.map((x: any) => {
                                return (
                                  <MatchEventTimeLine
                                    type={x.type}
                                    mins={x.mins}
                                    homeBadge={matchDetail.home.teamlogo}
                                    homeName={matchDetail.home.teamname}
                                    homeResult={matchDetail.homeResult}
                                    awayBadge={matchDetail.away.teamlogo}
                                    awayName={matchDetail.away.teamname}
                                    awayResult={matchDetail.awayResult}
                                    playerName={x.player[0].name}
                                    playerImg={x.player[0].image}
                                    playerNumber={x.player[0].shirtnumber}
                                    assistance={x.player[1].name}
                                    subOn={x.player[0].name}
                                    subOnImg={x.player[0].image}
                                    subOnNumber={x.player[0].shirtnumber}
                                    subOff={x.player[1].name}
                                    subOffImg={x.player[1].image}
                                    subOffNumber={x.player[1].shirtnumber}
                                    side={x.side}
                                  ></MatchEventTimeLine>
                                );
                              })
                            : ""}
                        </div>

                        <a className={cx("__timeLine__team")}>
                          <span className={cx("__timeLine__badge")}>
                            <span className={cx("__timeLine__badge__block")}>
                              <img
                                src={
                                  matchDetail ? matchDetail.away.teamlogo : ""
                                }
                                className={cx("__timeLine__badge--adjust")}
                              ></img>
                            </span>
                          </span>
                          {matchDetail ? matchDetail.away.teamname : ""}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div className={cx("__optionsBlock")}>
                <div className={cx("__optionsBlock__wrapper")}>
                  <ul className={cx("__optionsBlock__wrapper--adjust")}>
                    <li
                      id="stats"
                      onClick={(e: any) =>
                        e.currentTarget.id === "stats"
                          ? setClickedId("stats")
                          : ""
                      }
                      className={
                        clickedId === "stats" ? cx("__optionsActive") : ""
                      }
                    >
                      Stats
                    </li>
                    <li
                      id="lineUps"
                      onClick={(e: any) =>
                        e.currentTarget.id === "lineUps"
                          ? setClickedId("lineUps")
                          : ""
                      }
                      className={
                        clickedId === "lineUps" ? cx("__optionsActive") : ""
                      }
                    >
                      Line up
                    </li>
                  </ul>
                </div>
              </div>
              <div className={cx("_detailsWrapper")}>
                <div
                  className={
                    clickedId === "stats" ? cx("__active") : cx("__inactive")
                  }
                >
                  {/* <MatchStats></MatchStats> */}
                </div>
                <div
                  className={
                    clickedId === "lineUps" ? cx("__active") : cx("__inactive")
                  }
                >
                  {/* <LineUps></LineUps> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ContentWrapper>
    </>
  );
};
