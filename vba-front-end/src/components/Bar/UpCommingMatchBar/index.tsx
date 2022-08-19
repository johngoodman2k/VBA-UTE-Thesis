import React from "react";

import classNames from "classnames/bind";
import styles from "./upCommingMatchBar.module.scss";
import { Link } from "react-router-dom";
import { StringLiteral } from "typescript";

const cx = classNames.bind(styles);
type UpCommingMatchBarProps = {
  id?: string;
  homeName: string;
  homeBadge: string;
  time: string;
  awayName: string;
  awayBadge: string;
};
export const UpCommingMatchBar = (props: UpCommingMatchBarProps) => {
  return (
    <>
      {/* <Link to={`/fixtures/match/${props.id}`}> */}
      {/* <span className={cx("__wrapper")}> */}
      <a href={`${props.id}`} className={cx("__block")}>
        <span className={cx("__block__homeName")}>
          <abbr title="Miami Heat">{props.homeName}</abbr>
        </span>
        <span className={cx("__block__homeBadge")}>
          <img
            className={cx("__block__homeBadge--adjust")}
            src={props.homeBadge}
            alt=""
          />
        </span>
        <time>{props.time}</time>
        <span className={cx("__block__awayBadge")}>
          <img
            className={cx("__block__awayBadge--adjust")}
            src={props.awayBadge}
            alt=""
          />
        </span>
        <span className={cx("__block__awayName")}>
          <abbr title="Miami Heat">{props.awayName}</abbr>
        </span>

        <span className={cx("__block__icon")}>
          <img
            className={cx("__block__icon--adjust")}
            src="https://www.freeiconspng.com/uploads/right-arrow-icon-12.png"
            alt=""
          />
        </span>
      </a>
      {/* </span> */}
      {/* </Link> */}
    </>
  );
};
