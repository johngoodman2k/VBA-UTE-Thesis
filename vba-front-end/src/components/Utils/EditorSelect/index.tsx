import React from "react";
import styles from "./editorSelect.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

type EditorSelectProps = {
  title: string;
  value: string;
  onChange: (e: any) => void;
  options: { name: string; value: string }[];
};

export const EditorSelect = (props: EditorSelectProps) => {
  return (
    <>
      <label className={`${cx("__modal__title")}`}>
        {props.title}&nbsp;
        <div className="inline">*</div>
      </label>
      <div className={`relative block ${cx("__dropdown")}`}>
        <select
          className={`${cx("__modal__title--select")}`}
          value={props.value}
          onChange={props.onChange}
        >
          {props.options.map((x: any) => {
            return <option value={x.value}>{x.name}</option>;
          })}
        </select>
      </div>
    </>
  );
};
