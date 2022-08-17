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
  Team,
  Tournament,
} from "../../Services/models";
import { MatchEventAssistant } from "../../components/Match/MatchEventAssistant";
import { MatchEventTimeLine } from "../../components/Match/MatchEventTimeLine";
import { Modal } from "../../components/Modal";
import { ContentWrapper } from "../../components/Container/ContentWrapper";
import { vbaContext } from "../../Services/services";
import { Match } from "../../Services/models";
import { dateFormat } from "../../utils/dateFormat";
import { useParams } from "react-router-dom";
import { convertCompilerOptionsFromJson } from "typescript";

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
export const MatchDetailPage = () => {
  const params = useParams();
  const [clickedId, setClickedId] = useState("");
  // const [clickedType, setClickedType] = useState("");
  const [typeSelected, setTypeSelected] = useState("goal");
  const [cardType, setCardType] = useState("yellow");
  const [side, setSide] = useState("home");
  const [homePlayers, setHomePlayers] = useState<Team>();
  const [awayPlayers, setAwayPlayers] = useState<Team>();

  const [matchDetail, setMatchDetail] = useState<Match>();
  useEffect(() => {
    (async () => {
      const res = await matchServices.getMatchDetailsById(params.id);
      console.log("113", res);
      const res1 = await teamServices.getPlayersByTeamId(res.home.id);
      const res2 = await teamServices.getPlayersByTeamId(res.away.id);
      console.log("117", res1);
      console.log("118", res2);
      setMatchDetail(res);
      setHomePlayers(res1);
      setAwayPlayers(res2);
    })();
  }, []);

  const createMatchEvent = async (e: any) => {
    e.preventDefault();
    const type = typeSelected;
    const cardValue = cardType;
    const sideValue = side;
    const homeResult = e.target.homeresult.value;
    const awayResult = e.target.awayresult.value;
    const name = e.target.name.value;
    const assistant = e.target.assistant.value;
    const mins = e.target.mins.value;
    const subIn = e.target.subin.value;
    const subOff = e.target.suboff.value;
    const yellowCard = e.target.yellow.value;
    const redCard = e.target.red.value;
    let processObj = { type: type, side: sideValue, mins: mins, player: [] };
    // type === "goal" ? processObj.player.push({name: name,image: "", playernumber: ""})  : type ==="card" ? :

    //   const res = await matchServices.patchMatchDetailsById(
    //     params.id,
    //     { ...e, process: e.process.push()}

    //   );
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
                    </ul>
                  </div>
                </div>

                <div
                  className={
                    clickedId === "edit" ? cx("__active") : cx("__inactive")
                  }
                >
                  <Modal>
                    <form>
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
                                value={side}
                                onChange={(e: any) => {
                                  setSide(e.target.value);
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

                                  {side === "home" ? (
                                    <>
                                      <div
                                        className={`relative block ${cx(
                                          "__optionsDropdown"
                                        )}`}
                                      >
                                        <select
                                          className={`${cx("__options")}`}
                                        >
                                          {homePlayers?.players?.map(
                                            (x: any) => {
                                              return (
                                                <option value={x.name}>
                                                  {x.name}
                                                </option>
                                              );
                                            }
                                          )}
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
                                          className={`${cx("__options")}`}
                                        >
                                          {awayPlayers?.players?.map(
                                            (x: any) => {
                                              return (
                                                <option value={x.name}>
                                                  {x.name}
                                                </option>
                                              );
                                            }
                                          )}
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
                                  {side === "home" ? (
                                    <>
                                      <div
                                        className={`relative block ${cx(
                                          "__optionsDropdown"
                                        )}`}
                                      >
                                        <select
                                          className={`${cx("__options")}`}
                                        >
                                          {homePlayers?.players?.map(
                                            (x: any) => {
                                              return (
                                                <option value={x.name}>
                                                  {x.name}
                                                </option>
                                              );
                                            }
                                          )}
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
                                          className={`${cx("__options")}`}
                                        >
                                          {awayPlayers?.players?.map(
                                            (z: any) => {
                                              return (
                                                <option value={z.name}>
                                                  {z.name}
                                                </option>
                                              );
                                            }
                                          )}
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
                                value={side}
                                onChange={(e: any) => {
                                  setSide(e.target.value);
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
                                  <input
                                    id="name"
                                    className={`${cx("__modal__input--goal")}`}
                                  ></input>
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
                                  value={side}
                                  onChange={(e: any) => {
                                    setSide(e.target.value);
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
                                  <input
                                    id="subin"
                                    className={`${cx("__modal__input--goal")}`}
                                  ></input>
                                </div>
                                <div>
                                  <label className={`${cx("__modal__title")}`}>
                                    Substituition Off&nbsp;
                                    <div className="inline">*</div>
                                  </label>
                                  <input
                                    id="suboff"
                                    className={`${cx("__modal__input--goal")}`}
                                  ></input>
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
                                <li
                                  id="save"
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
                                </li>
                                <li
                                  id="save"
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
                                  Close
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </section>
                    </form>
                  </Modal>
                </div>

                {/* scorebox */}
                <div className={cx("__scoreboxContainer")}>
                  <div className={cx("__container")}>
                    <div className={cx("__scoreboxContainer")}>
                      <MatchResultDetailBar
                        homeBadge={matchDetail ? matchDetail.home.teamlogo : ""}
                        homeName={matchDetail ? matchDetail.home.teamname : ""}
                        homeResult={
                          matchDetail ? matchDetail.home.homeResult : ""
                        }
                        awayBadge={matchDetail ? matchDetail.away.teamlogo : ""}
                        awayName={matchDetail ? matchDetail.away.teamname : ""}
                        awayResult={
                          matchDetail ? matchDetail.away.awayResult : ""
                        }
                      ></MatchResultDetailBar>

                      <div className={cx("__matchStats")}>
                        <div className={cx("__matchStats__halfTime")}>
                          <span>Half Time</span>1 - 0
                        </div>
                      </div>
                      <div className={cx("__matchStats__kickOff")}>
                        KickOff:
                        <strong> time</strong>
                      </div>
                      <div className={cx("__matchEvents")}>
                        <div className={cx("__matchEvents__home")}>
                          {test.map((x: any) => {
                            return x.side === "home" ? (
                              <MatchEvent
                                playerName={x.playerName}
                                mins={x.mins}
                                side={x.side}
                                type={x.type}
                              ></MatchEvent>
                            ) : (
                              <></>
                            );
                          })}
                        </div>

                        <div className={cx("__matchEvents__away")}>
                          {test.map((x: any) => {
                            return x.side === "away" ? (
                              <MatchEvent
                                playerName={x.playerName}
                                mins={x.mins}
                                side={x.side}
                                type={x.type}
                              ></MatchEvent>
                            ) : (
                              <></>
                            );
                          })}
                        </div>
                      </div>

                      <div className={cx("__assists")}>
                        <div className={cx("__assists__title")}>Assists</div>
                        <div className={cx("__assistsHome")}>
                          {test.map((x: any) => {
                            return x.assistance != null && x.side === "home" ? (
                              <MatchEventAssistant
                                assistance={x.assistance}
                                side={x.side}
                                mins={x.mins}
                              ></MatchEventAssistant>
                            ) : (
                              <></>
                            );
                          })}
                        </div>

                        <div className={cx("__assistsAway")}>
                          {test.map((x: any) => {
                            return x.assistance != null && x.side === "away" ? (
                              <MatchEventAssistant
                                assistance={x.assistance}
                                side={x.side}
                                mins={x.mins}
                              ></MatchEventAssistant>
                            ) : (
                              <></>
                            );
                          })}
                        </div>
                      </div>

                      <div className={cx("__timeLine")}>
                        <a className={cx("__timeLine__team")}>
                          <span className={cx("__timeLine__badge")}>
                            <span className={cx("__timeLine__badge__block")}>
                              <img
                                src="https://logos-world.net/wp-content/uploads/2020/05/Miami-Heat-Logo-2000-Present.png"
                                className={cx("__timeLine__badge--adjust")}
                              ></img>
                            </span>
                          </span>
                          MIA
                        </a>
                        <div className={cx("__timeLine__crossbar")}>
                          <div className={cx("__timeLine__crossbar--adjust")}>
                            HT
                          </div>
                          {test.map((x: any) => {
                            return (
                              <MatchEventTimeLine
                                type={x.type}
                                mins={x.mins}
                                homeBadge={x.homeBadge}
                                homeName={x.homeName}
                                homeResult={x.homeResult}
                                awayBadge={x.awayBadge}
                                awayName={x.awayName}
                                awayResult={x.awayResult}
                                playerName={x.playerName}
                                playerImg={x.playerImg}
                                playerNumber={x.playerNumber}
                                assistance={x.assistance}
                                subOn={x.subOn}
                                subOnImg={x.subOnImg}
                                subOnNumber={x.subOnNumber}
                                subOff={x.subOff}
                                subOffImg={x.subOffImg}
                                subOffNumber={x.subOffNumber}
                                side={x.side}
                              ></MatchEventTimeLine>
                            );
                          })}
                        </div>

                        <a className={cx("__timeLine__team")}>
                          <span className={cx("__timeLine__badge")}>
                            <span className={cx("__timeLine__badge__block")}>
                              <img
                                src="https://logos-world.net/wp-content/uploads/2020/05/Miami-Heat-Logo-2000-Present.png"
                                className={cx("__timeLine__badge--adjust")}
                              ></img>
                            </span>
                          </span>
                          MIA
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
