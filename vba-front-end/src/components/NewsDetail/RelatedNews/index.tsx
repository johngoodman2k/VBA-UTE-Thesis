import React from "react";
import styles from "./relatednews.module.scss";
import classNames from "classnames/bind";
import { ReactComponent as Arrow } from "../../../assets/svg/arrow1.svg";

const cx = classNames.bind(styles);

export const RelatedNews = () => {
  return (
    <div
      className={`w-[300px] h-[400px] relative ${cx("relatedNews")} mt-[50px]`}
    >
      <a
        href="/"
        className={`w-full h-full z-0 ${cx("relatedNews__imageBlock")}`}
      >
        <img
          className="w-full h-full object-cover"
          src="https://vinasport.com.vn/wp-content/uploads/2020/03/Logo-G2-eSports.jpg"
          alt=""
        />
      </a>
      <a href="/" className={`${cx("relatedNews__titleBlock")}`}>
        <div className={`${cx("relatedNews__titleBlock--titleText")}`}>
          creator
        </div>
        <button
          className={`p-2 mt-4 bg-cyan-500   ${cx(
            "relatedNews__titleBlock--btnMore"
          )}`}
        >
          <div className=" pr-1 pl-1 h-full inline-block ">Read More</div>
          <span className={`w-auto h-auto text-center`}>
            <Arrow className="w-[20px] h-[20px] inline-block pb-[2px]" />
          </span>
        </button>
      </a>
    </div>
  );
};
