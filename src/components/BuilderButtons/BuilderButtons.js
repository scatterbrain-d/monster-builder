import React from 'react';

import style from "./BuilderButtons.css";

const builderButtons = (props) => {
  
  const powerButton = props.editMode ? 
    <button 
      className={style.button} 
      onClick={props.powerClick}
    >Add Power</button> 
    : null;
        
  const saveButton = props.token ?
    <button 
      className={style.button} 
      onClick={props.saveClick}
    >Save</button>
    : 
    <button 
        className={style.button} 
        onClick={props.loginClick}
    >Log in to Save</button>;
  
  const modeButton = 
    <button className={style.button} /*onClick={this.modeToggleHandler}*/> 
            {props.editMode ? "Display (coming soon)" : "Edit"}
        </button>;
        
  return (
    <div className={style.buttons}>
        {modeButton}
        {powerButton}
        {saveButton}
    </div>
  );
};

export default builderButtons;