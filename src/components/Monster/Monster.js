import React from "react";

import style from "./Monster.css";
import globalStyle from "../../global.css";

const Monster = (props) => {
    return (
        <div className={globalStyle.mainBorder + " " + style.container}>
            <div className={style.fetchedMonster}>
                <div className={globalStyle.minorBorder}>
                    <img 
                        src={props.stat.img} 
                        alt="Your monster"
                    />
                </div>
                <div className={style.monsterDesc}>
                    <h3>{props.stat.name}</h3>
                    <p>Level {" " + props.stat.level}{" " + props.stat.threat}{" " + props.stat.role}</p>
                    <div className={style.buttons}>
                        <button onClick={props.load}>Load</button>
                        <button onClick={props.delete}>Delete</button>
                    </div>
                </div>
            </div>
        </div >
        );
};

export default Monster;