import classNames from "classnames/bind";
import React, { useState } from "react";
import styles from "./buttonGroup.module.scss";

type TournamentButtonGroupProps = {
    buttons: ButtonOptions[];
    getValue: React.Dispatch<React.SetStateAction<string>>;
};
interface ButtonOptions {
    name: string;
    value: string;
}

const cx = classNames.bind(styles);

export const ButtonGroup = ({ buttons, getValue }: TournamentButtonGroupProps) => {
    const [clickedId, setClickedId] = useState(-1);
    const handleClick = (e: React.BaseSyntheticEvent<MouseEvent, EventTarget & Element, EventTarget>, i: number) => {
        setClickedId(i);
        getValue(e.currentTarget.getAttribute("data-value") as string);
    };
    return (
        <>
            {buttons.map((x: ButtonOptions, i: number) => (
                <button
                    data-value={x.value}
                    key={i}
                    type="button"
                    onClick={(e) => handleClick(e, i)}
                    className={i === clickedId ? `${cx("_customButton", "_active")}` : `${cx("_customButton")}`}
                >
                    {x.name}
                </button>
            ))}
        </>
    );
};
