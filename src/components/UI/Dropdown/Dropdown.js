/* Component used to create uniform <select> inputs in <Landing/> and
   <PowerModal/>.*/

import React from "react";

import globalStyle from "../../../global.css";

const dropdown = (props) => (
  <div className={props.className}>
    <label>{props.label}</label>
      <select 
          className={globalStyle.minorBorder}
          name={props.name}
          value={props.value} 
          onChange={props.changed}
      >
        {props.options.map((option) =>
          (<option key={option}>{option}</option>)
        )}
      </select>
      {props.children}
  </div>
);

export default dropdown;