import React from "react";

import style from "./EditBox.css";
// import globalStyle from "../../../global.css";

const editBox = (props) => {
    
    let dataType, updateType, label;
    
    if(typeof(props.value) === "number") {
        dataType = "number";
        updateType= props.numUpdate;
    } else {
        dataType = "text";
        updateType= props.strUpdate;
    }
        
    if (props.name === "img") label =  <label>Image URL</label>;
        
    else label = <label>{props.name}</label>;
    
    return (
            <div className={style.box} id={style[props.name]}>
                {label}
                <input type={dataType} onChange={updateType} value={props.value}/>
            </div>
        );
};

export default editBox;