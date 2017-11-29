import React from "react";
import Aux from "../Aux/Aux";

const layout = (props) => {
    return (
        <Aux>
            <nav></nav>
            
                {props.children}
        </Aux>
    );
};

export default layout;