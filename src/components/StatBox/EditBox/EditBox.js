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
    
    
    // dropdowns to be implemented in future build
    // if (props.name === "keywords") {
    //     content = (
    //         <select onChange={props.strUpdate} value={props.value} multiple>
    //             <option>aberrant</option>    
    //             <option>aquatic</option>    
    //             <option>elemental</option>    
    //             <option>fey</option>    
    //             <option>beast</option>    
    //             <option>construct</option>    
    //             <option>demon</option>    
    //             <option>devil</option>    
    //             <option>dragon</option>    
    //         </select>
    //     );
    // }
        
        
    if (props.name === "img") label =  <label>{props.name} URL</label>;
        
    else label = <label>{props.name}</label>;
    
    return (
            <div className={style.box} id={style[props.name]}>
                {label}
                <input type={dataType} onChange={updateType} value={props.value}/>
            </div>
        );
};

export default editBox;