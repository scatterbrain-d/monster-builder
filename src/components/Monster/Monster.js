import React from "react";

const Monster = (props) => {
    console.log(props);
    return (
        <div className="fetchedMonster">
            <h4>{props.stat.name}</h4>
            <p>Level {" " + props.level}{" " + props.threat}{" " + props.role}</p>
            <button onClick={props.load}>Load</button>
            <button onClick={props.delete}>Delete</button>
        </div >
        );
};

export default Monster;