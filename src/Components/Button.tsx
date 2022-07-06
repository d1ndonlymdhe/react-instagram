import { ButtonPropsTypes } from "../typings/components";

// import React from "react";
export function Button(props: ButtonPropsTypes) {
    const { text, bonClick, type, name, bgColor, className ,child} = props;
    return (
        <button
            className={`px-5 border-[1px] rounded-md border-black font-bold ${className}`}
            //@ts-ignore
            onClick={bonClick}
            type={type}
            name={name}
        >
            {child || text}
        </button>
    );
}
