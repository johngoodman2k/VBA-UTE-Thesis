import React from "react";
import styles from "./news.module.scss";
import classNames from "classnames/bind";
import { ReactComponent as Arrow } from "../../../assets/svg/arrow.svg";

const cx = classNames.bind(styles);

interface NewsProps {
  title: string;
  image: string;
}
// "https://teamnigma.com/wp-content/uploads/2020/11/Team-Nigma-Dota-Pot-650x650.jpg?x15147"

export const NewsBlock = (props: NewsProps) => {
  return (
    <div className={cx("blockWarp")}>
      <div className={cx("blockWarp__imageBlock")}>
        <img alt="" className={cx("blockWarp__image")} src={props.image}></img>
      </div>
      <div className={cx("blockWarp__textBlock")}>
        <a href="/" className={cx("blockWarp__titleBlock")}>
          {props.title}
        </a>
        <a href="/" className={cx("blockWarp__detailtBlock")}>
          <div className={cx("blockWarp__arrow")}>
            <Arrow></Arrow>
          </div>
          <span className={cx("blockWarp__detailtBtn")}>read more</span>
        </a>
      </div>
      <a href="/" className={cx("blockWarp__block")}></a>
    </div>
  );
};
