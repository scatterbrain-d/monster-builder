import React from "react";




const power = (props) => {

    let attackType;
    
    switch (props.target) {
        case "Melee":
        case "Ranged":
        case "Line":
            attackType = (
                    <div>
                        {props.target} {props.range}
                    </div>
                );
        break;
        case "Close Burst":
        case "Close Blast":
        case "Aura":
            attackType = (
                    <div>
                        {props.target} {props.area}
                    </div>
                );
        break;
        case "Area Burst":
            attackType = (
                    <div>
                        {props.target} {props.area} in {props.range}
                    </div>
                );
        break;
        default:
        break;
    }
    

    return (
        <div className="powerBox">
            <div className="powerHeader">
                {props.name} * {props.use}  <span className="rightJustify">{props.action} action</span>
            </div>
                {attackType} | {props.keywords}
            <div>
                {props.text}
            </div>
        </div>
    );
}
    
export default power;