import React from "react";
import styles from "./modal.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type ModalProps = {
  children: React.ReactNode;
};

export const ModalBlock = (props: ModalProps) => {
  return (
    <div className={`${cx("wrapper")}`}>
      <div className={`${cx("content")} container`}>{props.children}</div>
    </div>
  );
};
