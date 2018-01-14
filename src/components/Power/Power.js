import React from "react";




const power = (props) => {

    let attackType;
    
    switch (props.power.target) {
        case "Melee":
        case "Ranged":
        case "Line":
            attackType = (
                    <span>
                        {props.power.range}
                    </span>
                );
        break;
        case "Close Burst":
        case "Close Blast":
        case "Aura":
            attackType = (
                    <span>
                        {props.power.area}
                    </span>
                );
        break;
        case "Area Burst":
            attackType = (
                    <span>
                        {props.power.area} in {props.power.range}
                    </span>
                );
        break;
        default:
        break;
    }
    

    return (
        <div className="powerBox">
            <div className="powerHeader">
                {props.power.name} * {props.power.use}  <span className="rightJustify">{props.power.action} action</span>
            </div>
                <p>{props.power.target} {attackType} | {props.power.keywords}</p>
            <div>
                {props.power.text}
            </div>
            <button onClick={props.update}>Edit</button>
            <button onClick={props.delete}>Delete</button>
        </div>
    );
};
    
export default power;