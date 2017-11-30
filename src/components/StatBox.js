import React from "react";

const statBox = (props) => {
    
    let boxType, updateType;
    
    if(typeof(props.value) === "number") {
        boxType = "number";
        updateType= props.numUpdate
    } else {
        boxType = "text";
        updateType= props.strUpdate
    }
    
    return (
            <div id={props.name}>
                <label>{props.name}</label>
                <input type={boxType} onChange={updateType} value={props.value}/>
            </div>
        );
};

export default statBox;