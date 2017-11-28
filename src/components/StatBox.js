import React from "react";

const statBox = (props) => (
        <div id={props.name}>
            {props.name}:{props.value}
        </div>
);

export default statBox;