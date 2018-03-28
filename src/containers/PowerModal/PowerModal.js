import React, {Component} from "react";
import {connect} from "react-redux";

import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Aux from "../../hoc/Aux/Aux";
import Power from "../../components/Power/Power";
import * as actions from "../../store/actions/index";
import style from "./PowerModal.css";
import globalStyle from "../../global.css";

class PowerModal extends Component {
    
    state = {
        attackType: 1,
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
        console.log(newPower);
        } else {
            newPower = {...this.state.power, [event.target.name]: event.target.value};
        }
        let aType;
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
                break;
            case "Area Burst":
                aType = 3;
                break;
            default:
                aType = 1;
        }
        this.setState({power: newPower, attackType: aType});
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
                        className={style.shortInput}
                        type="text"
                        name="range"
                        value={this.state.power.range}
                        onChange={(event) => this.inputHandler(event)}
                    />
                );
        
        const areaInput = (
                    <input
                        className={style.shortInput}
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
                                <label>Basic Attack</label>
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
                                    type="text"
                                    name="name"
                                    value={this.state.power.name}
                                    onChange={(event) => this.inputHandler(event)}
                                />
                            </div>
                            <div className={style.inputBlock}>
                                <label>Action</label>
                                <select name="action" value={this.state.power.action}
                                    onChange={(event) => this.inputHandler(event)}>
                                    <option>Standard</option>
                                    <option>Move</option>
                                    <option>Minor</option>
                                    <option>Free</option>
                                    <option>No Action</option>
                                    <option>Immediate Interrupt</option>
                                    <option>Immediate Reaction</option>
                                    <option>Opportunity Action</option>
                                </select>
                            </div>
                            <div className={style.inputBlock}>
                                <label>Use</label>
                                <select name="use" value={this.state.power.use}
                                    onChange={(event) => this.inputHandler(event)}>
                                    <option>At-Will</option>
                                    <option>Encounter</option>
                                    <option>Recharge when bloodied</option>
                                    <option>Recharge(6)</option>
                                    <option>Recharge(5,6)</option>
                                    <option>Recharge(4,5,6)</option>
                                    <option>When bloodied</option>
                                    <option>When reduced to 0 hp</option>
                                </select>
                            </div>
                            <div className={style.inputBlock}>
                                <label>Range</label>
                                <select name="target" value={this.state.power.target}
                                    onChange={(event) => this.inputHandler(event)}>
                                    <option>Melee</option>
                                    <option>Ranged</option>
                                    <option>Close Burst</option>
                                    <option>Close Blast</option>
                                    <option>Area Burst</option>
                                    <option>Aura</option>
                                    <option>Line</option>
                                    <option>Self</option>
                                </select>
                                {attackRange}
                            </div>
                            <div className={style.inputBlock}>
                                <label>Defense to Hit</label>
                                <select name="defense" value={this.state.power.defense}
                                    onChange={(event) => this.inputHandler(event)}>
                                    <option>AC</option>
                                    <option>Fortitude</option>
                                    <option>Reflex</option>
                                    <option>Will</option>
                                </select>
                            </div>
                            <div className={style.inputBlock}>
                                <label>Keywords</label>
                                <input 
                                    type="text"
                                    name="keywords"
                                    value={this.state.power.keywords}
                                    onChange={(event) => this.inputHandler(event)}
                                    placeholder="Keywords"
                                />
                            </div>
                            <div className={style.inputBlock}>
                                <label>Power Text</label>
                                <textarea
                                    name="text"
                                    value={this.state.power.text}
                                    onChange={(event) => this.inputHandler(event)}
                                    placeholder={"suggested damage:" + this.props.damage}
                                ></textarea>
                            </div>
                            <button
                                onClick={() => this.saveTemplateHandler(this.state.power)}
                            >
                                Save as template
                            </button>
                            <button>Submit</button>
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