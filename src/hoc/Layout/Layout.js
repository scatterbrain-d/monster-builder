import React from "react";
import Aux from "../Aux/Aux";

const layout = (props) => {
    return (
        <Aux>
            <nav/>
            <main>
                {this.props.children}
            </main>
        </Aux>
    );
};

export default layout;