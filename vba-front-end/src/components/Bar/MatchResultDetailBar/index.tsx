import React from "react";
import classNames from "classnames/bind";
import styles from "./matchResultDetailBar.module.scss";

type MatchResultDetailBarProps = {
  homeBadge?: string;
  homeName: string;
  homeResult: string;
  awayBadge: string;
  awayName: string;
  awayResult: string;
};

const cx = classNames.bind(styles);
export const MatchResultDetailBar = (props: MatchResultDetailBarProps) => {
  return (
    <div className={cx("__container")}>
      <div className={cx("__team", "home")}>
        <a className={cx("home__badgeContainer")}>
          <span className={cx("home__badgeContainer__image")}>
            <img
              className={cx("home__badgeContainer__image--adjust")}
              src={props.homeBadge}
            ></img>
          </span>
        </a>
        <a href="" className={cx("teamName", "teamName__home")}>
          <span className={cx("teamName--adjust")}>{props.homeName}</span>
        </a>
      </div>

      <div className={cx("__scoreContainer")}>
        <div className={cx("__scoreContainer__score")}>
          {props.homeResult} - {props.awayResult}
        </div>
      </div>

      <div className={cx("__team", "away")}>
        <a href="" className={cx("teamName", "teamName__away")}>
          <span className={cx("teamName--adjust")}>{props.awayName}</span>
        </a>
        <a className={cx("away__badgeContainer")}>
          <span className={cx("away__badgeContainer__image")}>
            <img
              className={cx("away__badgeContainer__image--adjust")}
              src={props.awayBadge}
            ></img>
          </span>
        </a>
      </div>
    </div>
  );
};
