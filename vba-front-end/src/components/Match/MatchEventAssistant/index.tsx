import React from "react";
import classNames from "classnames/bind";
import styles from "./matchEventAssistant.module.scss";

type MatchEventAssistantProps = {
  // type?: "Score" | "Red Card" | "Yellow Card" | "Substitution";
  side: "home" | "away";
  assistance?: string;
  mins?: number;
};

const cx = classNames.bind(styles);

export const MatchEventAssistant = (props: MatchEventAssistantProps) => {
  // const checkMatchEventSide = cx(
  //   props.side === "home"
  //     ? "matchEventAssistant__home"
  //     : "matchEventAssistant__away"
  // );

  return (
    <>
      {/* <div className={checkMatchEventSide}> */}
      <div className={cx("matchEventAssistant__event")}>
        <a href="">{props.assistance} </a>
        {props.mins}'
      </div>
      {/* </div> */}
    </>
  );
};
