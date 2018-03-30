/* Special authentication inputs used in <Auth/>. */

import React from "react";

const input = (props) => {
    
    const inputClasses = ["input"];
    
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push("invalid");
    }
    
    return (
        <div className="inputdiv">
            <label className="label"></label>
            <input className={inputClasses.join(" ")} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}
            />
        </div>
    );
};
export default input;