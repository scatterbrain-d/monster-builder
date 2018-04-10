/* This component outputs the monster stat boxes in "Display" mode. Used
   in <StatBox/>, which toggles between this and <EditBox/>. */

import React from "react";

import Aux from "../../../hoc/Aux/Aux";
import style from "./DisplayBox.css";

const DisplayBox = (props) => {
    
    let content; 
    
    switch(props.name) {
        case "img":
            content = <img src={props.value} alt="your monster"/>;
        break;
        case "name":
        case "threat":
        case "role":
        case "size":
        case "keywords": 
        case "resist":
            content = <p>{props.value}</p>;
        break;
        case("hp"):
            content = (
                <Aux>
                    <label>{props.name}</label>
                    <p>{props.value}({Math.floor(props.value/2)})</p>
                </Aux>
            );
        break;
        case("level"):
            content = <p>{props.name} {props.value}</p>;
        break;
        case "str":
        case "con":
        case "dex":
        case "int":
        case "wis": 
        case "cha":
            content = (
                <Aux>
                    <label>{props.name}</label>
                    <p>{props.value}(+{Math.floor((props.value-10)/2)})</p>
                </Aux>
            );
        break;
        default: 
            content = (
                <Aux>
                    <label>{props.name}</label>
                    <p>{props.value}</p>
                </Aux>
            );
    }
    
    return (
            <div id={style[props.name]}>
                {content}
            </div>
        );
};

export default DisplayBox;