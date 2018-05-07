import React, {Component} from "react";
import {connect} from "react-redux";

import Dropdown from "../../components/UI/Dropdown/Dropdown";
import Input from "../../components/UI/Input/Input";
import * as actions from "../../store/actions/index";
import style from "./Landing.css";
import globalStyle from "../../global.css";

class Landing extends Component {
    
    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onCreateMonster();
        this.props.history.replace("/builder");
    }
    
    render() {
        
        const nameInput = (
            
            <Input
                className={style.name}
                label="Name"
                value={this.props.name}
                changed={(event) => this.props.onUpdateStat("name", event.target.value)}
                required="true"
            />
        );  
        const levelInput = (
            
            <Input
                label="Level"
                type="number"
                value={this.props.level}
                changed={(event) => this.props.onUpdateStat("level", Number(event.target.value))}
                number="true"
                required="true"
            />
        );
        const threatInput = (
            
            <Dropdown
                label="Threat"
                value={this.props.threat}
                changed={(event) => this.props.onUpdateStat("threat", event.target.value)}
                options={["Standard", "Minion", "Elite", "Solo"]}
            />
        );
        const roleInput = (
            
            <Dropdown
                label="Role"
                value={this.props.role}
                changed={(event) => this.props.onUpdateStat("role", event.target.value)}
                options={["Soldier", "Skirmisher", "Brute", "Artillery", "Lurker", "Controller"]}
            />
        );
        const sizeInput = (
            
            <Dropdown
                label="Size"
                value={this.props.size}
                changed={(event) => this.props.onUpdateStat("size", event.target.value)}
                options={["Tiny", "Small", "Medium", "Large", "Huge", "Colossal"]}
            />
        );
        
        return (
            <div className={style.landing}>
                
                <div><h1 className={globalStyle.title}>D&D Monster Builder</h1></div>
                
                <form className={style.creationForm + " " + globalStyle.mainBorder} onSubmit={this.onSubmitHandler}>
                    
                    {nameInput}
                    
                    {levelInput}
                    
                    {threatInput}
                    
                    {roleInput}
                    
                    {sizeInput}
                    
                    <div><button className={globalStyle.minorBorder}>Submit</button></div>
                
                </form>
            </div>
        );    
    }
}

const mapStateToProps = state => {
    return {
        name: state.monster.stat.name,
        level: state.monster.stat.level,
        threat: state.monster.stat.threat,
        role: state.monster.stat.role,
        size: state.monster.stat.size
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateStat: (name, value) => dispatch(actions.updateStat(name, value)),
        onCreateMonster: () => dispatch(actions.createMonster())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Landing);