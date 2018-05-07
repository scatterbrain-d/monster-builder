import React, {Component} from "react";
import {connect} from "react-redux";

import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Aux from "../../hoc/Aux/Aux";
import PowerTemplates from "../../components/PowerTemplates/PowerTemplates";
import PowerModalForm from "../../components/PowerModalForm/PowerModalForm";

import * as actions from "../../store/actions/index";
import style from "./PowerModal.css";

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
    
    render(){
        
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                
                <div className={style.modalContainer}>
                    
                    <PowerTemplates
                        templates={this.props.templates}
                        attack={this.props.attackNad}
                        clicked={(event, template) => this.inputHandler(event, template)}
                    />
                        
                    <PowerModalForm
                        attackType={this.state.attackType}
                        powerDamage={this.state.powerDamage}
                        power={this.state.power}
                        token={this.props.token}
                        submitForm={(event, power) => this.submitHandler(event, power)}
                        inputChange={(event) => this.inputHandler(event)}
                        saveTemplate={(power) => this.saveTemplateHandler(power)}
                        modalClosed={this.props.modalClosed}
                    />

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