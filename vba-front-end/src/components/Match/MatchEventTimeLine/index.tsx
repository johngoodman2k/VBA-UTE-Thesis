import React from "react";

import classNames from "classnames/bind";
import styles from "./matchEventTimeLine.module.scss";
import { ReactComponent as SoccerLogo } from "../../../assets/images/soccer-com.svg";

import { ReactComponent as SubstitutionLogo } from "../../../assets/images/substitution-com.svg";
import { ReactComponent as RedCardLogo } from "../../../assets/images/redcard-com.svg";
import { ReactComponent as YellowCardLogo } from "../../../assets/images/yellowcard-com.svg";
import { ReactComponent as SubOff } from "../../../assets/images/suboff-com.svg";
import { ReactComponent as SubOn } from "../../../assets/images/subon-com.svg";

type TournamentEventProps = {
  type: "Score" | "Substitution" | "Red Card" | "Yellow Card";
  mins: number;
  homeBadge: string;
  homeName: string;
  homeResult: number;
  awayBadge: string;
  awayName: string;
  awayResult: number;
  playerName?: string;
  playerImg?: string;
  playerNumber?: number;
  assistance?: string;
  subOn?: string;
  subOnImg?: string;
  subOnNumber?: number;
  subOff?: string;
  subOffImg?: string;
  subOffNumber?: number;
  side: "home" | "away";
};

const cx = classNames.bind(styles);
const test = { mins: 27 };

export const MatchEventTimeLine = (props: TournamentEventProps) => {
  const iconClasses = cx(
    "tournamentEvent__icon",
    "tournamentEvent__icon--adjust",
    props.side === "home" ? "tournamentEvent__home" : "tournamentEvent__away"
  );

  const headerIcon = cx("tournamentEvent__inforContainer__icon--adjust");

  const checkIcon: any = (value: string, type: string) => {
    type === "Substitution" ? (
      <SubstitutionLogo className={value}></SubstitutionLogo>
    ) : type === "Score" ? (
      <SoccerLogo className={value}></SoccerLogo>
    ) : type === "Red Card" ? (
      <RedCardLogo className={value}></RedCardLogo>
    ) : (
      <YellowCardLogo className={value}></YellowCardLogo>
    );
  };
  return (
    <div
      className={cx("tournamentEvent__block")}
      style={{ left: `${props.mins}%` }}
    >
      <span>
        {props.type === "Substitution" ? (
          <SubstitutionLogo className={iconClasses}></SubstitutionLogo>
        ) : props.type === "Score" ? (
          <SoccerLogo className={iconClasses}></SoccerLogo>
        ) : props.type === "Red Card" ? (
          <RedCardLogo className={iconClasses}></RedCardLogo>
        ) : (
          <YellowCardLogo className={iconClasses}></YellowCardLogo>
        )}
      </span>
      {props.mins}
      <span></span>

      <div className={cx("tournamentEvent__inforContainer")}>
        <div className={cx("__wrapper")}>
          <div className={`${cx("tournamentEvent__inforContainer__header")}`}>
            <div className={cx("tournamentEvent__inforContainer__icon")}>
              {props.type === "Substitution" ? (
                <SubstitutionLogo className={headerIcon}></SubstitutionLogo>
              ) : props.type === "Score" ? (
                <SoccerLogo className={headerIcon}></SoccerLogo>
              ) : props.type === "Red Card" ? (
                <RedCardLogo className={headerIcon}></RedCardLogo>
              ) : (
                <YellowCardLogo className={headerIcon}></YellowCardLogo>
              )}
            </div>

            <time className={cx("tournamentEvent__inforContainer__time")}>
              {props.mins}
            </time>
            {props.type}
            <div className={cx("tournamentEvent__inforContainer__teamScore")}>
              <a className={cx("tournamentEvent__inforContainer__team")}>
                <span
                  className={cx(
                    "tournamentEvent__inforContainer__teamBadge",
                    "tournamentEvent__inforContainer__homeTeamBadge"
                  )}
                >
                  <span
                    className={cx(
                      "tournamentEvent__inforContainer__teamBadge__icon"
                    )}
                  >
                    <img
                      src={props.homeBadge}
                      className={cx(
                        "tournamentEvent__inforContainer__teamBadge__icon--adjust"
                      )}
                    ></img>
                  </span>
                </span>
                <span
                  className={cx(
                    "tournamentEvent__inforContainer__homeTeamName"
                  )}
                >
                  {props.homeName}
                </span>
              </a>
              <span className={cx("tournamentEvent__inforContainer__team")}>
                {props.homeResult}
              </span>
              {"-"}
              <span className={cx("tournamentEvent__inforContainer__team")}>
                {props.awayResult}
              </span>

              <a className={cx("tournamentEvent__inforContainer__team")}>
                <span
                  className={cx(
                    "tournamentEvent__inforContainer__awayTeamName"
                  )}
                >
                  {props.awayName}
                </span>
                <span
                  className={cx(
                    "tournamentEvent__inforContainer__teamBadge",
                    "tournamentEvent__inforContainer__awayTeamBadge"
                  )}
                >
                  <span
                    className={cx(
                      "tournamentEvent__inforContainer__teamBadge__icon"
                    )}
                  >
                    <img
                      src={props.awayBadge}
                      className={cx(
                        "tournamentEvent__inforContainer__teamBadge__icon--adjust"
                      )}
                    ></img>
                  </span>
                </span>
              </a>
            </div>
          </div>

          {props.type === "Score" ? (
            <div className={cx("tournamentEvent__inforContent")}>
              <img
                src={props.playerImg}
                className={cx("tournamentEvent__inforContent__scorerImage")}
              ></img>
              <div className={cx("tournamentEvent__inforContent__scorerInfor")}>
                <a
                  className={cx(
                    "tournamentEvent__inforContent__scorerInfor__name"
                  )}
                >
                  {props.playerNumber} {"."} {props.playerName}
                </a>
                <div
                  className={cx("tournamentEvent__inforContent__assistInfor")}
                >
                  {"Ast. "}
                  <a
                    className={cx(
                      "tournamentEvent__inforContent__assistInfor--name"
                    )}
                  >
                    {props.assistance}
                  </a>
                </div>
              </div>
            </div>
          ) : props.type === "Substitution" ? (
            <>
              {" "}
              <div
                className={cx(
                  "tournamentEvent__inforContent",
                  "tournamentEvent__inforContent__substitution",
                  "tournamentEvent__inforContent__substitution--subOut"
                )}
              >
                <img
                  className={cx(
                    "tournamentEvent__inforContent__substitution__image",
                    "tournamentEvent__inforContent__substitution__image--subOut"
                  )}
                  src={props.subOffImg}
                ></img>
                <div
                  className={cx(
                    "tournamentEvent__inforContent__substitution__playerInfor"
                  )}
                >
                  <a
                    className={cx(
                      "tournamentEvent__inforContent__substitution__playerInfor--name"
                    )}
                  >
                    {props.subOffNumber} {props.subOff}
                    <div
                      className={cx(
                        "tournamentEvent__inforContent__substitution__icon"
                      )}
                    >
                      <SubOff
                        className={cx(
                          "tournamentEvent__inforContent__substitution__icon--adjust"
                        )}
                      ></SubOff>
                    </div>
                  </a>
                </div>
              </div>
              <div
                className={cx(
                  "tournamentEvent__inforContent",
                  "tournamentEvent__inforContent__substitution",
                  "tournamentEvent__inforContent__substitution--subOn"
                )}
              >
                <img
                  className={cx(
                    "tournamentEvent__inforContent__substitution__image",
                    "tournamentEvent__inforContent__substitution__image--subOn"
                  )}
                  src={props.subOnImg}
                ></img>
                <div
                  className={cx(
                    "tournamentEvent__inforContent__substitution__playerInfor--subOn"
                  )}
                >
                  <a
                    className={cx(
                      "tournamentEvent__inforContent__substitution__playerInfor--name",
                      "tournamentEvent__inforContent__substitution__playerInfor--name--subOn"
                    )}
                  >
                    {props.subOnNumber} {props.subOn}
                    <div
                      className={cx(
                        "tournamentEvent__inforContent__substitution__icon"
                      )}
                    >
                      <SubOn
                        className={cx(
                          "tournamentEvent__inforContent__substitution__icon--adjust",
                          "tournamentEvent__inforContent__substitution__icon--subOn"
                        )}
                      ></SubOn>
                    </div>
                  </a>
                </div>
              </div>
            </>
          ) : props.type === "Red Card" ? (
            <>
              <div className={cx("tournamentEvent__inforContent")}>
                <img
                  src={props.playerImg}
                  className={cx("tournamentEvent__inforContent__scorerImage")}
                ></img>
                <div
                  className={cx("tournamentEvent__inforContent__scorerInfor")}
                >
                  <a
                    className={cx(
                      "tournamentEvent__inforContent__scorerInfor__name"
                    )}
                  >
                    {props.playerNumber} {"."} {props.playerName}
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={cx("tournamentEvent__inforContent")}>
                <img
                  src={props.playerImg}
                  className={cx("tournamentEvent__inforContent__scorerImage")}
                ></img>
                <div
                  className={cx("tournamentEvent__inforContent__scorerInfor")}
                >
                  <a
                    className={cx(
                      "tournamentEvent__inforContent__scorerInfor__name"
                    )}
                  >
                    {props.playerNumber} {"."} {props.playerName}
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>

    /* <div className={cx("tournamentEvent__block")} style={{ left: `35%` }}>
        <span>
          <SoccerLogo
            className={cx(
              "tournamentEvent__icon",
              "tournamentEvent__icon--adjust",
              "tournamentEvent__away"
            )}
          ></SoccerLogo>
        </span>
        27
        <span></span>
        <div className={cx("tournamentEvent__inforContainer")}>
          <div>
            <header className={cx("tournamentEvent__inforContainer__header")}>
              <SoccerLogo
                className={cx(
                  "tournamentEvent__inforContainer__icon",
                  "tournamentEvent__inforContainer__icon--adjust"
                )}
              ></SoccerLogo>
              <time className={cx("tournamentEvent__inforContainer__time")}>
                '27'
              </time>
              Goal
              <div className={cx("tournamentEvent__inforContainer__teamScore")}>
                <a className={cx("tournamentEvent__inforContainer__team")}>
                  <span
                    className={clsx(
                      cx(
                        "tournamentEvent__inforContainer__teamBadge",
                        "tournamentEvent__inforContainer__homeTeamBadge"
                      )
                    )}
                  >
                    <span
                      className={cx(
                        "tournamentEvent__inforContainer__teamBadge__icon"
                      )}
                    >
                      <img
                        src="https://logos-world.net/wp-content/uploads/2020/05/Miami-Heat-Logo-2000-Present.png"
                        className={cx(
                          "tournamentEvent__inforContainer__teamBadge__icon--adjust"
                        )}
                      ></img>
                    </span>
                  </span>
                  <span
                    className={cx(
                      "tournamentEvent__inforContainer__homeTeamName"
                    )}
                  >
                    MIA
                  </span>
                </a>
                <span className={cx("tournamentEvent__inforContainer__team")}>
                  1
                </span>
                {"-"}
                <span className={cx("tournamentEvent__inforContainer__team")}>
                  0
                </span>

                <a className={cx("tournamentEvent__inforContainer__team")}>
                  <span
                    className={cx(
                      "tournamentEvent__inforContainer__awayTeamName"
                    )}
                  >
                    BOS
                  </span>
                  <span
                    className={clsx(
                      cx(
                        "tournamentEvent__inforContainer__teamBadge",
                        "tournamentEvent__inforContainer__awayTeamBadge"
                      )
                    )}
                  >
                    <span
                      className={cx(
                        "tournamentEvent__inforContainer__teamBadge__icon"
                      )}
                    >
                      <img
                        src="https://1000logos.net/wp-content/uploads/2016/10/Boston-Celtics-Logo-500x313.png"
                        className={cx(
                          "tournamentEvent__inforContainer__teamBadge__icon--adjust"
                        )}
                      ></img>
                    </span>
                  </span>
                </a>
              </div>
            </header>
            <div className={cx("tournamentEvent__inforContent")}>
              <img
                src="https://cdn.nba.com/headshots/nba/latest/1040x760/202710.png"
                className={cx("tournamentEvent__inforContent__scorerImage")}
              ></img>
              <div className={cx("tournamentEvent__inforContent__scorerInfor")}>
                <a
                  className={cx(
                    "tournamentEvent__inforContent__scorerInfor__name"
                  )}
                >
                  22 {"."} Jimmy Butler
                </a>
                <div
                  className={cx("tournamentEvent__inforContent__assistInfor")}
                >
                  {"Ast. "}
                  <a
                    className={cx(
                      "tournamentEvent__inforContent__assistInfor--name"
                    )}
                  >
                    {"Kevin Durant"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */
  );
};
