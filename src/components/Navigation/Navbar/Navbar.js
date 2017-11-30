import React from "react";
import {NavLink} from "react-router-dom";

const navbar = () => {
    return (
        <header className="navbar">
            <ul>
                <li>
                    <NavLink to="/" exact>Landing</NavLink>
                </li>
                <li>
                    <NavLink to="/builder">Builder</NavLink>
                </li>
            </ul>
        </header>
    );
};

export default navbar;