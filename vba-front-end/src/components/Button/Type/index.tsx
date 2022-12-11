import classNames from "classnames/bind";
import React, { useState } from "react";
import { Tournament } from "../../../Services/models";
import styles from "./type.module.scss";

const cx = classNames.bind(styles);

type TypeProps = {
    type: TypeOption[];
    getValue?: React.Dispatch<React.SetStateAction<string>>;
};

interface TypeOption {
    name: string;
    value: string;
    image: string;
}

export const Type = ({ type, getValue }: TypeProps) => {
    const [clickedId, setClickedId] = useState(-1);
    const handleClick = (e: any, i: number) => {
        setClickedId(i);
        if (getValue) getValue(e.currentTarget.getAttribute("data-value"));
    };
    return (
        <>
            {type.map((x: TypeOption, i: number) => {
                return (
                    <div
                        className={`${cx("tournament_type-adjust")}`}
                        data-value={x.value}
                        onClick={(e) => handleClick(e, i)}
                    >
                        <label
                            key={i}
                            className={
                                i === clickedId
                                    ? `${cx("tournament_type-label", "tournament_type-label--active")}`
                                    : `${cx("tournament_type-label")}`
                            }
                        >
                            <img className={`${cx("tournament_type-image")} `} src={x.image} alt={x.name}></img>
                            <div className={`${cx("tournament_type-text")}`}>{x.name}</div>
                        </label>
                    </div>
                );
            })}
        </>
    );
};
