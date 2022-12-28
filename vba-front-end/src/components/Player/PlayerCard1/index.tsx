import React from "react";
import styles from "./playerCard1.module.scss";
import classNames from "classnames/bind";
import { Player } from "../../../Services/models";

const cx = classNames.bind(styles);

type PlayerCard1Props ={
  teamLogo?: string,
  player?: Player
}

const PlayerCard1 = ({player,teamLogo}:PlayerCard1Props) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className={cx("PlayerFigure")}>
        <div className={cx("PlayerFigure__teamBlock")}>
          {
            teamLogo &&
            <img
            src={teamLogo}
            className={cx("PlayerFigure__teamLogo", "TeamLogo__logo")}
            alt="teamlogo"
          ></img>
          }
          
        </div>
        <a
          href="/"
          className={cx("PlayerFigure__teamLogoBackgroundWrap")}
          data-has-children="true"
        >
          <div className={cx("PlayerFigure__top")}>
            <div className={cx("PlayerFigure__teamLogoBackground")}>
              <div className={cx("TeamLogo__block")}>
               {teamLogo  && <img
                  src={teamLogo as string}
                  className={cx("TeamLogo__logo")}
                  alt="teamlog"
                ></img>}
              </div>
            </div>
            <div className="w-full h-full flex items-end">
              <div className={cx("PlayerFigure__playerTitle")}>
               {player && player.image && <img
                  className={cx(
                    "PlayerImage__image",
                    "PlayerFigure__playerImage"
                  )}
                  src={player.image as string}
                  alt="playerimage"
                ></img>}
              </div>
            </div>
            <div className={cx("PlayerContent")}>
              <p className={cx("PlayerContent__title")}>#{player && player.shirtNumber ? player.shirtNumber:  0} | {player?.position??""} </p>
              <p className={cx("PlayerContent__playerName")}>{player?.firstName ?? ""} {player?.lastName ?? ""}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default PlayerCard1;
