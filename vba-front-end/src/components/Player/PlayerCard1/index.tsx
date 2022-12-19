import React from "react";
import styles from "./playerCard1.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const PlayerCard1 = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className={cx("PlayerFigure")}>
        <div className={cx("PlayerFigure__teamBlock")}>
          <img
            src="https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg"
            className={cx("PlayerFigure__teamLogo", "TeamLogo__logo")}
          ></img>
        </div>
        <a
          href="/"
          className={cx("PlayerFigure__teamLogoBackgroundWrap")}
          data-has-children="true"
        >
          <div className={cx("PlayerFigure__top")}>
            <div className={cx("PlayerFigure__teamLogoBackground")}>
              <div className={cx("TeamLogo__block")}>
                <img
                  src="https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg"
                  className={cx("TeamLogo__logo")}
                ></img>
              </div>
            </div>
            <div className="w-full h-full flex items-end">
              <div className={cx("PlayerFigure__playerTitle")}>
                <img
                  className={cx(
                    "PlayerImage__image",
                    "PlayerFigure__playerImage"
                  )}
                  src="https://cdn.nba.com/headshots/nba/latest/260x190/fallback.png"
                ></img>
              </div>
            </div>
            <div className={cx("PlayerContent")}>
              <p className={cx("PlayerContent__title")}>ShirtNumber | Title</p>
              <p className={cx("PlayerContent__playerName")}>Player Name</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default PlayerCard1;
