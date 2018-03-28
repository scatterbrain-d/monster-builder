import React from "react";

import Aux from "../../hoc/Aux/Aux";

import style from "./Power.css";import globalStyle from "../../global.css";


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
    
    let attack = props.attack;
    if(props.power.defense === "AC") attack += 2;
    
    let buttons = "";
    if (props.update) buttons = (
            <Aux>
                <button onClick={props.update}>Edit</button>
                <button onClick={props.delete}>Delete</button>
            </Aux>
        );

    return (
        <div className={style.powerBox + " " + globalStyle.mainBorder}>
            <div className={style.powerHeader}>
                <span>{props.power.name} * {props.power.use}</span>  <span>{props.power.action} action</span>
            </div>
            <p>{props.power.target} {attackType}, +{attack} vs. {props.power.defense} | {props.power.keywords}</p>
            <hr/>
            <p>{props.power.text}</p>
            {buttons}
        </div>
    );
};
    
export default power;