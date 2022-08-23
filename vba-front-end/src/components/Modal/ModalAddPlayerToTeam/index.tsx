import React from "react";
import styles from "./modalAddTeam.module.scss";
import classNames from "classnames/bind";
import { ModalBlock } from "../ModalBlock";

const cx = classNames.bind(styles);
const ModalAddTeam = () => {
  return (
    <ModalBlock>
      <div className={cx("Modal__ModalTitle")}>Add Player</div>
      <div className={"grid grid-cols-4 gap-4"}>
        <div className={cx("Modal__ModalField")}>Name</div>
        <div className={cx("Modal__ModalField")}>DoB</div>
        <div className={cx("Modal__ModalField")}>Image</div>
        <div className={cx("Modal__ModalField")}>Shirt Number</div>
      </div>
    </ModalBlock>
  );
};

export default ModalAddTeam;
