import React from "react";

const statBox = (props) => (
        <div id={props.name}>
            <span>{props.name}:</span>{props.value}
        </div>
);

export default statBox;