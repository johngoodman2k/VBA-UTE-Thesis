import React from "react";
import styles from "./sideBarFixtures.module.scss";
import classNames from "classnames/bind";
import { UpCommingMatchBar } from "../../Bar/UpCommingMatchBar";

const cx = classNames.bind(styles);
export const SidebarFixture = () => {
  return (
    <div className={cx("wrapper")}>
      <header>
        <div className={cx("__week")}>Match Week 1</div>
        <div className={cx("__logoWrapper")}>
          <img
            className={cx("__logoWrapper--adjust")}
            src="https://www.tma.vn/Themes/TMAVN.Theme/Images/TMA-logo2.png"
            alt=""
          />
        </div>
        <div className={cx("__localTime")}>
          All times shown are your <strong>local time</strong>
        </div>
      </header>
      <div className={cx("__matchList")}>
        <time>Saturday 6 August</time>
        <div className={cx("__matchList--adjust")}>
          <UpCommingMatchBar
            homeName="MIA"
            homeBadge="https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg"
            awayName="MIA"
            awayBadge="https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg"
            time="2:00"
          ></UpCommingMatchBar>
          <UpCommingMatchBar
            homeName="MIA"
            homeBadge="https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg"
            awayName="MIA"
            awayBadge="https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg"
            time="2:00"
          ></UpCommingMatchBar>
        </div>
      </div>
    </div>
  );
};
