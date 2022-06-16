import { ButtonPropsTypes } from "../typings/components";

// import React from "react";
export function Button(props: ButtonPropsTypes) {
    const { text, bonClick, type, name, bgColor, className } = props;
    return (
        <button
            className={`px-5 rounded-sm font-bold ${className}`}
            //@ts-ignore
            onClick={bonClick}
            type={type}
            name={name}
        >
            {text}
        </button>
    );
}
