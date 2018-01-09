import React from "react";

const Monster = (props) => {
    console.log(props);
    return (
        <div className="fetchedMonster" onClick={props.clicked}>
            <h4>{props.stat.name}</h4>
            <p>Level {" " + props.level}{" " + props.threat}{" " + props.role}</p>
        </div>
        );
};

export default Monster;