import React from "react";
import EditBox from "./EditBox/EditBox";
import DisplayBox from "./DisplayBox/DisplayBox";

const statBox = (props) => {
    
    let box = <EditBox {...props}/>;
    
    if (!props.edit)
        box = <DisplayBox {...props}/>;
    
    return box;
};

export default statBox;