import classNames from "classnames/bind";
import React, { useState } from "react";
import styles from "./buttonGroup.module.scss";

type TournamentButtonGroupProps = {

    buttons: ButtonOptions[];
    getValue: React.Dispatch<React.SetStateAction<string>>;
    defaultValue?:string;

};
interface ButtonOptions {
    name: string;
    value: string;
}

const cx = classNames.bind(styles);

export const ButtonGroup = ({defaultValue, buttons, getValue} : TournamentButtonGroupProps) => {
    const initState = defaultValue?? ""
    const [clickedId, setClickedId] = useState(initState);
    const handleClick = (e: React.BaseSyntheticEvent<MouseEvent, EventTarget & Element, EventTarget>, i: number) => {
        setClickedId(e.currentTarget.getAttribute("data-value") as string);
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
                    
                    className={x.value === clickedId ? `${cx("_customButton", "_active")}` : `${cx("_customButton")}`}
                >
                    {x.name}
                </button>
            ))}
        </>
    );
};
