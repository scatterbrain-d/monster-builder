/* This component outputs all neccessary power information into a 
   card format. Used in <Builder/> to show powers of currently loaded
   monster, and in <Powermodal/> to show available power templates from
   the database.*/

import React from "react";
import Aux from "../../hoc/Aux/Aux";
import style from "./Power.css";
import globalStyle from "../../global.css";


const power = (props) => {

    // Attack line output changes based on attack type
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
    
    // attack value changes based on defense targeted
    let attack = props.attack;
    if(props.power.defense === "AC") attack += 2;
    
    // buttons are hidden for <PowerModal/> templates
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