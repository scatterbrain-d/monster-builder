import React from "react";

const editBox = (props) => {
    
    let dataType, updateType, content;
    
    if(typeof(props.value) === "number") {
        dataType = "number";
        updateType= props.numUpdate;
    } else {
        dataType = "text";
        updateType= props.strUpdate;
    }
    
    if (props.name === "img") 
        content = <img alt="your monster" src={props.value}/>;
    else
        content = <input type={dataType} onChange={updateType} value={props.value}/>;
    
    return (
            <div id={props.name}>
                <label>{props.name}</label>
                {content}
            </div>
        );
};

export default editBox;