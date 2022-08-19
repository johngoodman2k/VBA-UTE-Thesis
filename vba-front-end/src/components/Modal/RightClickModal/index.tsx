import React from "react";
import styles from "./rightClickModal.module.scss";
import classNames from "classnames/bind";
const text = [{ name: "Update" }, { name: "Delete" }, { name: "Comment" }];
type RightClickModalProps = {
  x: any;
  y: any;
};
const cx = classNames.bind(styles);

export const RightClickModal = (props: RightClickModalProps) => {
  return (
    <div
      style={{
        transform: `translate(${props.x - 460}px, ${props.y}px)`,
      }}
      className={`${cx("__wrapper")}`}
    >
      <div id="">
        <ul className={`${cx("__optionsBlock")}`}>
          {text.map((x: any) => {
            return (
              <li className={`${cx("__list")}`}>
                <button className={`${cx("__button")}`}>
                  <span className={`${cx("__text")}`}>{x.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
