import React from "react";

import { ReactComponent as RefereeLogo } from "../../../assets/images/referee-com.svg";
import { ReactComponent as StadiumLogo } from "../../../assets/images/stadium-com.svg";
import { ReactComponent as EyesLogo } from "../../../assets/images/eyes-com.svg";
import styles from "./matchInfoBar.module.scss";
import classNames from "classnames/bind";

type MatchInfoBarProps = {
  date: string | undefined;
  referee: string | undefined;

  stadiumName?: string;
  spectators: string | undefined;
};

const cx = classNames.bind(styles);
export const MatchInfoBar = (props: MatchInfoBarProps) => {
  return (
    <>
      <div className={cx("__matchBar")}>
        <div className={cx("__matchBar__text", "__matchBar__position")}>
          {props.date}
        </div>
        <div className={cx("__matchBar__text", "__matchBar__position")}>
          <RefereeLogo className={cx("__matchBar__referee")}></RefereeLogo>
          {props.referee}
        </div>
        <div className={cx("__matchBar__text", "__matchBar__position")}>
          <StadiumLogo className={cx("__matchBar__stadium")}></StadiumLogo>
          {props.stadiumName}
        </div>
        <div className={cx("__matchBar__text", "__matchBar__position")}>
          <EyesLogo className={cx("__matchBar__attendance")}></EyesLogo>
          {props.spectators}
        </div>
      </div>
      <div></div>
    </>
  );
};
