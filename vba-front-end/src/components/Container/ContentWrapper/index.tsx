import React from "react";
import styles from "./contentWrapper.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
type contentWrapperProps = {
  children: React.ReactNode;
};

export const ContentWrapper = (props: contentWrapperProps) => {
  return <div className={`${cx("__wrapper")}`}>{props.children}</div>;
};
