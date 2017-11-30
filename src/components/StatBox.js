import React from "react";

const statBox = (props) => {
    
    let boxType;
    
    if(typeof(props.value) === "number") {
        boxType = "number";
    } else {
        boxType = "text";
    }
    
    return (
            <div id={props.name}>
                <p>{props.name}</p>
                <input type={boxType} onChange={props.update} value={props.value}/>
            </div>
        );
};

export default statBox;