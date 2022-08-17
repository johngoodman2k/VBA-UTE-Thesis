import React from "react";
import classNames from "classnames/bind";
import styles from "./matchEvent.module.scss";
import { ReactComponent as SoccerLogo } from "../../../assets/images/soccer-com.svg";

import { ReactComponent as RedCardLogo } from "../../../assets/images/redcard-com.svg";
import { ReactComponent as YellowCardLogo } from "../../../assets/images/yellowcard-com.svg";

type MatchEventProps = {
  type: "Score" | "Red Card" | "Yellow Card" | "Substitution";
  side: "home" | "away";
  playerName: string;
  mins: number;
};

const cx = classNames.bind(styles);

export const MatchEvent = (props: MatchEventProps) => {
  const checkMatchEventBlock = cx(
    "matchEvent__block",
    props.side === "home" ? "home__block" : "away__block"
  );
  const checkMatchEventIcon = cx(
    "matchEvent__block__icon",
    props.side === "home" ? "home__block__icon" : "away__block__icon"
  );

  return (
    <>
      {props.type !== "Substitution" ? (
        <div className={checkMatchEventBlock}>
          <a>{props.playerName} </a>
          {props.mins}'
          <div className={checkMatchEventIcon}>
            {props.type === "Score" ? (
              <SoccerLogo
                className={cx("matchEvent__block__icon--adjust")}
              ></SoccerLogo>
            ) : props.type === "Red Card" ? (
              <RedCardLogo
                className={cx("matchEvent__block__icon--adjust")}
              ></RedCardLogo>
            ) : (
              <YellowCardLogo
                className={cx("matchEvent__block__icon--adjust")}
              ></YellowCardLogo>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
