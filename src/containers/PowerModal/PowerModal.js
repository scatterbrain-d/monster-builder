import React, {Component} from "react";
import {connect} from "react-redux";

import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Dropdown from "../../components/UI/Dropdown/Dropdown";
import Aux from "../../hoc/Aux/Aux";
import Power from "../../components/Power/Power";
import * as actions from "../../store/actions/index";
import style from "./PowerModal.css";
import globalStyle from "../../global.css";

class PowerModal extends Component {
    
    state = {
        attackType: 1,
        powerDamage: this.props.damage,
        power: {}
    }
    
    componentWillMount = () => {
        this.props.onFetchTemplates();
        this.setState({power: this.props.power});
    }
    
    submitHandler = (event, object) => {
        event.preventDefault();
        this.props.onPushPower(object, this.props.index);
        this.props.modalClosed();
    }
    
    inputHandler = (event, template) => {
        let newPower;
        if (template) {
            newPower = {...this.state.power, ...template};
        } else {
            newPower = {...this.state.power, [event.target.name]: event.target.value};
        }
        let aType;
        let damage = this.props.damage;
        switch (newPower.target) {
            case "Self":
                aType = 0;
                break;
            case "Melee":
            case "Ranged":
            case "Line":
                aType = 1;
                break;
            case "Close Blast":
            case "Close Burst":
            case "Aura":
                aType = 2;
                damage *= 0.75;
                break;
            case "Area Burst":
                aType = 3;
                damage *= 0.75;
                break;
            default:
                aType = 1;
        }
        if (newPower.use !== "At-Will")
            damage *= 1.25;
        this.setState({power: newPower, attackType: aType, powerDamage: (Math.floor(damage))});
    }
    
    saveTemplateHandler = (power) => {
        this.props.onSaveTemplate(power, this.props.token);
    }
    
    loadTemplateHandler = (event) => {
        console.log(event.target);
    }
    
    render(){
        
        let attackRange;
        
        const rangeInput = (
                    <input 
                        className={style.shortInput + " " + globalStyle.minorBorder}
                        type="text"
                        name="range"
                        value={this.state.power.range}
                        placeholder="Range"
                        onChange={(event) => this.inputHandler(event)}
                    />
                );
        
        const areaInput = (
                    <input
                        className={style.shortInput + " " + globalStyle.minorBorder}
                        type="text"
                        name="area"
                        value={this.state.power.area}
                        placeholder="Area"
                        onChange={(event) => this.inputHandler(event)}
                    />
                );
        
        switch (this.state.attackType) {
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
        
        if(this.props.token !== null)
            saveTemplateButton = (
                <button onClick={() => this.saveTemplateHandler(this.state.power)}>
                Save as template</button>
            );
        
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={style.modalContainer}>
                    <div className={style.templates + " " + globalStyle.mainBorder}>
                        <h3>Templates</h3>
                            {this.props.templates.map(template => (
                                <div 
                                    className={style.templateWrapper}
                                    onClick={(event) => this.inputHandler(event, template)}
                                    key={template.name}
                                    title="Use template"
                                >
                                    <Power
                                        power={template}
                                        attack={this.props.attackNad}
                                        
                                    />
                                </div>
                            ))}
                    </div>
                    <div className={style.powerModal + " " + globalStyle.mainBorder}>
                        <h3>Add Power</h3>
                        <form 
                            className={style.powerForm}
                            onSubmit={(event) => this.submitHandler(event, this.state.power)}
                        >
                            <div className={style.inputBlock}>
                                <label>Basic Attack?</label>
                                <input
                                    type="checkbox"
                                    name="basic"
                                    value={this.state.power.basic}
                                    onChange={(event) => this.inputHandler(event)}
                                />
                            </div>
                            <div className={style.inputBlock}>
                                <label>Power Name</label>
                                <input
                                    className={globalStyle.minorBorder}
                                    type="text"
                                    name="name"
                                    value={this.state.power.name}
                                    onChange={(event) => this.inputHandler(event)}
                                />
                            </div>
                            <Dropdown
                                className={style.inputBlock}
                                name="action"
                                label="Action"
                                value={this.state.power.action}
                                change={(event) => this.inputHandler(event)}
                                options={["Standard", "Move", "Minor", "Free", "No Action", 
                                    "Immediate Interrupt", "Immediate Reaction", "Opportunity Action"]}
                            />
                            <Dropdown
                                className={style.inputBlock}
                                name="use"
                                label="Use"
                                value={this.state.power.use}
                                change={(event) => this.inputHandler(event)}
                                options={["At-Will", "Encounter", "Recharge when bloodied", 
                                    "Recharge(6)", "Recharge(5,6)", "Recharge(4,5,6)", 
                                    "When bloodied", "When reduced to 0 hp"]}
                            />
                            <Dropdown
                                className={style.inputBlock}
                                name="target"
                                label="Range"
                                value={this.state.power.target}
                                change={(event) => this.inputHandler(event)}
                                options={["Melee", "Ranged", "Close Burst", "Close Blast", "Area Burst", 
                                    "Aura", "Line", "Self"]}
                            >{attackRange}</Dropdown>
                            <Dropdown
                                className={style.inputBlock}
                                name="defense"
                                label="Defense to Target"
                                value={this.state.power.defense}
                                change={(event) => this.inputHandler(event)}
                                options={["AC", "Fortitude", "Reflex", "Will"]}
                            />
                            <div className={style.inputBlock}>
                                <label>Keywords</label>
                                <input
                                    className={globalStyle.minorBorder}
                                    type="text"
                                    name="keywords"
                                    value={this.state.power.keywords}
                                    onChange={(event) => this.inputHandler(event)}
                                    placeholder="Keywords"
                                />
                            </div>
                            <div className={style.inputBlock}>
                                <label>Power Text</label>
                                <p>Suggested damage: {this.state.powerDamage}</p>
                                <textarea
                                    className={globalStyle.minorBorder}
                                    name="text"
                                    value={this.state.power.text}
                                    onChange={(event) => this.inputHandler(event)}
                                    placeholder={"put all power effects here"}
                                ></textarea>
                            </div>
                            <div className={style.buttons}>
                                {saveTemplateButton}
                                <button>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Aux>
        );
    }
    
}

const mapStateToProps = state => {
    return {
        attackNad: state.monster.attackNad,
        damage: state.monster.damage,
        token: state.auth.token,
        templates: state.save.templates
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPushPower: (power, index) => dispatch(actions.pushPower(power, index)),
        onFetchTemplates: () => dispatch(actions.fetchTemplates()),
        onSaveTemplate: (power, token) => dispatch(actions.saveTemplate(power, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PowerModal);