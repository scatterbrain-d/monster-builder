import React from "react";

const statBox = (props) => {
    
    let boxType, updateType, content;
    
    if(typeof(props.value) === "number") {
        boxType = "number";
        updateType= props.numUpdate;
    } else {
        boxType = "text";
        updateType= props.strUpdate;
    }
    
    if (props.name === "img") 
        content = <img alt="your monster" src={props.value}/>;
    else
        content = <input type={boxType} onChange={updateType} value={props.value}/>;
    
    return (
            <div id={props.name}>
                <label>{props.name}</label>
                {content}
            </div>
        );
};

export default statBox;