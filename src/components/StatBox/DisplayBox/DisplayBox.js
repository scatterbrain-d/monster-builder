import React from "react";

const DisplayBox = (props) => {
    
    let content = <p>{props.value}</p>
    
    if (props.name === "img") 
        content = <img alt="your monster" src={props.value}/>;
    
    return (
            <div id={props.name}>
                <label>{props.name}</label>
                {content}
            </div>
        );
};

export default DisplayBox;