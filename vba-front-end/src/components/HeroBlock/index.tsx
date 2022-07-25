import React from "react";
import classNames from "classnames/bind";
import styles from "./heroBlock.module.scss";

const cx = classNames.bind(styles);

export const HeroBlock = () => {
  return (
    <div className="bg-primary-color text-third-color ">
      <div className="h-[680px] z-0 relative overflow-hidden mx-auto max-w-xxl">
        <img
          src="https://fadeawayworld.net/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTgwMTMyNzc0Njk1OTM3MTQ2/kevin-durant-boston-celtics-nba.png"
          className={` xl:w-[70%] md:h-4/5 w-3/5 ${cx("__image")} `}
        ></img>
      </div>
    </div>
  );
};
