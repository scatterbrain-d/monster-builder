/* This component creates a monster card from an entry in the user's monster database.
   Used in a loop over all user saved monsters in <Monsters/> component. Users can load
   monster for further editing or delete it from the database. */

import React from "react";
import style from "./Monster.css";
import globalStyle from "../../global.css";

const Monster = (props) => {
    return (
        <div className={style.fetchedMonster + " " + globalStyle.mainBorder}>
            <div className={globalStyle.minorBorder}>
                <img 
                    src={props.stat.img} 
                    alt="Your monster"
                />
            </div>
            <h3>{props.stat.name}</h3>
            <p>Level {" " + props.stat.level}{" " + props.stat.threat}{" " + props.stat.role}</p>
            <div className={style.buttons}>
                <button onClick={props.load}>Load</button>
                <button onClick={props.delete}>Delete</button>
            </div>
        </div>
        );
};

export default Monster;