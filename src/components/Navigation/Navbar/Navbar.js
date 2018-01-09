import React from "react";
import {NavLink} from "react-router-dom";

const navbar = (props) => {
    
    let auth = <NavLink to="/auth">Log in</NavLink>;
    
    let myMonsters = null;
    
    if (props.isAuth) {
        auth = <NavLink to="/logout">Log out</NavLink>;
        myMonsters = (
                <li>
                    <NavLink to="/monsters">My Monsters</NavLink>
                </li>
            );
    }
    return (
        <header className="navbar">
            <ul>
                <li>
                    <NavLink to="/" exact>Landing</NavLink>
                </li>
                <li>
                    <NavLink to="/builder">Builder</NavLink>
                </li>
                    {myMonsters}
                <li>
                    {auth}
                </li>
            </ul>
        </header>
    );
};

export default navbar;