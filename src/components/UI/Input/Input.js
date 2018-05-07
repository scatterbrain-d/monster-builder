/* Special authentication inputs used in <Auth/>. */

import React from "react";

import style from "./Input.css";
import globalStyle from "../../../global.css";

const input = (props) => {
    
    const inputClasses = [globalStyle.minorBorder];
    let extraProps;
    
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(style.invalid);
        console.log("invalid!");
    }
    if (props.number) {
        inputClasses.push(style.number);
        extraProps = {min: "1", max: "35"};
    }
    
    if (props.required)
        extraProps = {...extraProps, required: "true"};
    
    if(!props.value)
        extraProps = {...extraProps, placeholder: props.placeholder};
    
    return (
        <div className={props.className}>
            <label className="label">{props.label}</label>
            <input className={inputClasses.join(" ")} 
                {...extraProps}
                name={props.name}
                value={props.value}
                type={props.type}
                onChange={props.changed}
            />
        </div>
    );
};
export default input;