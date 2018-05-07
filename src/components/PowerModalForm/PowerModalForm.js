import React from "react";

import Dropdown from "../UI/Dropdown/Dropdown";
import Input from "../UI/Input/Input";
import Aux from "../../hoc/Aux/Aux";

import style from "./PowerModalForm.css";
import globalStyle from "../../global.css";

const powerModalForm = (props) => {
  
  let attackRange;
  
  const rangeInput = (
    <input 
        className={style.shortInput + " " + globalStyle.minorBorder}
        type="text"
        name="range"
        value={props.power.range}
        placeholder="Range"
        onChange={(event) => props.inputChange(event)}
    />
  );
  
  const areaInput = (
    <input
        className={style.shortInput + " " + globalStyle.minorBorder}
        type="text"
        name="area"
        value={props.power.area}
        placeholder="Area"
        onChange={(event) => props.inputChange(event)}
    />
  );
  
  switch (props.attackType) {
    case 1:
        attackRange = rangeInput;
    break;
    case 2:
        attackRange = areaInput;
    break;
    case 3:
        attackRange = (
          <Aux>
              {areaInput} <span> in </span> {rangeInput}
          </Aux>
        );
    break;
    default: attackRange = null;
  }
  
  let saveTemplateButton = "";
  
  if(props.token !== null)
    saveTemplateButton = (
      <button onClick={() => props.saveTemplate(props.power)}>
      Save as template</button>
    );

  
  return (
    
    <div className={style.powerModal + " " + globalStyle.mainBorder}>
      <h3>Add Power</h3>
    
      <form 
        className={style.powerForm}
        onSubmit={(event) => props.submitForm(event, props.power)}
      >
          <Input
            className={style.inputBlock}
            label="Power Name"
            name="name"
            type="text"
            value={props.power.name}
            changed={(event) => props.inputChange(event)}
            required="true"
          />
          
          <Dropdown
            className={style.inputBlock}
            name="action"
            label="Action"
            value={props.power.action}
            changed={(event) => props.inputChange(event)}
            options={["Standard", "Move", "Minor", "Free", "No Action", 
                "Immediate Interrupt", "Immediate Reaction", "Opportunity Action"]}
          />
          
          <Dropdown
            className={style.inputBlock}
            name="use"
            label="Use"
            value={props.power.use}
            changed={(event) => props.inputChange(event)}
            options={["At-Will", "Encounter", "Recharge when bloodied", 
                "Recharge(6)", "Recharge(5,6)", "Recharge(4,5,6)", 
                "When bloodied", "When reduced to 0 hp"]}
          />
          
          <Dropdown
            className={style.inputBlock}
            name="target"
            label="Range"
            value={props.power.target}
            changed={(event) => props.inputChange(event)}
            options={["Melee", "Ranged", "Close Burst", "Close Blast", "Area Burst", 
                "Aura", "Line", "Self"]}
          >{attackRange}</Dropdown>
          
          <Dropdown
            className={style.inputBlock}
            name="defense"
            label="Defense to Target"
            value={props.power.defense}
            changed={(event) => props.inputChange(event)}
            options={["AC", "Fortitude", "Reflex", "Will"]}
          />
          
          <Input
            className={style.inputBlock}
            label="Keywords"
            name="keywords"
            value={props.power.keywords}
            changed={(event) => props.inputChange(event)}
          />
          
          <div className={style.inputBlock}>
            <label>Power Text</label>
            <p>(Avg. damage: {props.powerDamage})</p>
            <textarea
                className={globalStyle.minorBorder}
                name="text"
                value={props.power.text}
                onChange={(event) => props.inputChange(event)}
                placeholder={"put all power effects here"}
            ></textarea>
          </div>
          
          <div className={style.buttons}>
            <button
                onClick={props.modalClosed}
            >Cancel</button>
            {saveTemplateButton}
            <button>Submit</button>
          </div>
      </form>
    </div>
  );
};

export default powerModalForm;