import React from "react";
import classNames from "classnames/bind";
import styles from "./heroBlock.module.scss";
import { MatchResultBar } from "../MatchResultBar";

const cx = classNames.bind(styles);

export const HeroBlock = () => {
  return (
    <div className="bg-black text-third-color mt-[-174px] ">
      <div className="h-[680px] z-0 relative overflow-hidden mx-auto max-w-xxl">
        <img
          src="https://cdn.nba.com/manage/2022/08/bill-russell-1934-2022.jpg?w=1012&h=568"
          className={` xl:w-[70%] md:h-4/5 w-3/5 ${cx("__image")} `}
        ></img>
        <div className="relative h-full xl:bg-shadow-layer "></div>
        <div
          className={`xl:w-5/12 pr-10 pl-10   md:w-7/12 md:pt-20 ${cx(
            "__ContentBlock"
          )}`}
        >
          <div className="pt-8 pb-8"></div>
          <div className="pb-5">
            <MatchResultBar
              homeBadge="https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Chicago_Bulls_logo.svg/1200px-Chicago_Bulls_logo.svg.png"
              homeName="Chicago Bulls"
              homeResult="1"
              awayBadge="https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Minnesota_Timberwolves_logo.svg/1200px-Minnesota_Timberwolves_logo.svg.png"
              awayName="Minesota TimberWolves"
              awayResult="0"
            ></MatchResultBar>
          </div>

          <div>
            <a>
              <h2 className="text-3xl font-bold md:h8 mb-4">
                <span className="font-bold leading-6">
                  Boston Celtics Confirmed a massive package trade for Kevin
                  Durant{" "}
                </span>
              </h2>
            </a>
            <p className={`mb-5 md:mb-7 md:block ${cx("__description")}`}>
              <span>
                Relive some of the best plays and moments from back-to-back Kia
                MVP winner Nikola Jokic's 2021-22 season.
              </span>
            </p>
            <div className="mb-4 md:mb-7">
              <a className="uppercase px-8 py-3 m-0 border-2 rounded-full border-white">
                Details
              </a>
            </div>
            <div>further stuffs</div>
          </div>
        </div>
      </div>
    </div>
  );
};
