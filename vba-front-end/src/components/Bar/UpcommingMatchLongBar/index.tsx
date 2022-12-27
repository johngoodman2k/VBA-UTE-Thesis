import React from "react";
import { ReactComponent as StadiumLogo } from "../../../assets/images/stadium.svg";
import  LogoTeam from "../../../assets/images/utah-jazz-note-logo.png";


import classNames from "classnames/bind";
import styles from "./upCommingMatchLongBar.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
type UpcommingMatchLongBarProps = {
  id?: string;
  team1Name: string;
  team1Image: string;
  time: string;
  team2Name: string;
  team2Image: string;
  stadium: string;
  endmatch?: boolean;
  team1Point?:string;
  team2Point?:string;
};

export const UpcommingMatchLongBar = (props: UpcommingMatchLongBarProps) => {
  return (
    <>
      <Link to={`/fixtures/match/${props.id}`}>
        <li className={cx("__wrapper")}>
          <a className={cx("__block")}>
            <span className={cx("__block__matchdetails")}>
              <span className={cx("__block__homeName")}>
                <abbr title="Miami Heat">{props.team1Name}</abbr>
              </span>
              <span className={cx("__block__homeBadge")}>
                <img
                  className={cx("__block__homeBadge--adjust")}
                  src={props.team1Image !== "" ? props.team1Image : LogoTeam}
                  alt=""
                />
              </span>
              <time>{props.endmatch === true ?props.team1Point + " - " + props.team2Point : props.time}</time>
              <span className={cx("__block__awayBadge")}>
                <img
                  className={cx("__block__awayBadge--adjust")}
                  src={props.team2Image !== "" ? props.team2Image : LogoTeam}
                  alt=""
                />
              </span>
              <span className={cx("__block__awayName")}>
                <abbr title="Miami Heat">{props.team2Name}</abbr>
              </span>
            </span>

            <span className={cx("__block__stadium")}>
              <span className={cx("__block__stadium__icon")}>
                <StadiumLogo></StadiumLogo>
              </span>
              {props.stadium}
            </span>

            <span className={cx("__block__icon")}>
              <img
                className={cx("__block__icon--adjust")}
                src="https://www.freeiconspng.com/uploads/right-arrow-icon-12.png"
                alt=""
              />
            </span>
          </a>
        </li>
      </Link>
    </>
  );
};
