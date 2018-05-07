import React from "react";

import Power from "../Power/Power";
import style from "./PowerTemplates.css";
import globalStyle from "../../global.css";


const powerTemplates = (props) => {
  return (
    <div className={style.templates + " " + globalStyle.mainBorder}>
        <h3>Templates</h3>
            {props.templates.map(template => (
                <div 
                    className={style.templateWrapper}
                    onClick={(event) => props.clicked(event, template)}
                    key={template.name}
                    title="Use template"
                >
                    <Power
                        power={template}
                        attack={props.attack}
                    />
                </div>
            ))}
    </div>
  );
};

export default powerTemplates;