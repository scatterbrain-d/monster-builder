import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import StatBox from "../../components/StatBox/StatBox";
import Power from "../../components/Power/Power";
import PowerModal from "../PowerModal/PowerModal";
import * as actions from "../../store/actions/index";
import style from "./Builder.css";
import globalStyle from "../../global.css";

class Builder extends Component {
    
    state = {
        showPowerModal: false,
        editMode: true,
        powerTemplate: {},
        powerIndex: 0
    }
    
    powerEntryHandler = () => {
        this.setState({
            showPowerModal: !this.state.showPowerModal,
            powerIndex: this.props.powers.length,
            powerTemplate: {
                name: "",
                action: "Standard",
                use: "At-Will",
                basic: false,
                target: "Melee",
                range: "",
                area: "",
                defense: "AC",
                keywords: "",
                text: ""
            }
        });
    }
    
    saveMonsterHandler = () => {
        const monster = {
            monster: this.props.monster,
            userId: this.props.userId
        };
        console.log(this.props.monsterId);
        if(this.props.monsterId === null)
            this.props.onSaveMonster(monster, this.props.token);
        else
            this.props.onUpdateMonster(monster, this.props.token, this.props.monsterId);
        this.props.history.push("/monsters");
    }
    
    modeToggleHandler = () => {
        this.setState((prevState) => {
            return {editMode: !prevState.editMode};
        });
    }
    
    powerUpdateHandler = (power, index) => {
        this.setState({
            showPowerModal: true,
            powerIndex: index,
            powerTemplate: power
        });
    }
    
    render() {
        
        const statArray = [];
        
        for(let entry in this.props.stat) {
            statArray.push({
                name: entry,
                value: this.props.stat[entry]
            });
        }
        
        const powerArray = [];
        
        for (let key of Object.keys(this.props.powers)) {
        powerArray.push(this.props.powers[key]);
        }
        
        let powerModal = null;
        
        if(this.state.showPowerModal)
            powerModal = (
                    <PowerModal
                        show={this.state.showPowerModal}
                        modalClosed={this.powerEntryHandler}
                        index={this.state.powerIndex}
                        damage={this.props.damage}
                        power={this.state.powerTemplate}
                    />
                );
        
        let powerButton = this.state.editMode ? <button className={style.addPower} onClick={this.powerEntryHandler}>Add Power</button> 
            : null;
        
        let saveButton = <button className={style.button} onClick={this.saveMonsterHandler}>Save</button>;
        
        if (this.props.token === null)
            saveButton = <button className={style.button} onClick={() => this.props.history.push("/auth")}>Log in to Save</button>;
        
        return (
            <div className={style.builder}>
                <div className={style.container}>
                    <h2>{this.state.editMode ? "Edit" : "View"} Monster</h2>
                    <button className={style.button} onClick={this.modeToggleHandler}>
                        {this.state.editMode ? "Display" : "Edit"}
                    </button>
                    <div className={
                        style.block
                        +" "+
                        (this.state.editMode ? style.editBlock : style.displayBlock) 
                        +" "+ 
                        globalStyle.mainBorder}
                    >
                        <div className={style.blockHeader + " " + globalStyle.minorBorder}/>
                        <div className={style.blockFooter + " " + globalStyle.minorBorder}/>
                        {statArray.map(stat => (
                            <StatBox
                                key={stat.name}
                                name={stat.name}
                                value={stat.value}
                                edit={this.state.editMode}
                                strUpdate={(event) => this.props.onUpdateStat(stat.name, event.target.value)}
                                numUpdate={(event) => this.props.onUpdateStat(stat.name, Number(event.target.value))}
                            />
                        ))}
                    </div>
                    
                    {powerModal}

                    {powerArray.map((power, index) => {
                    return (
                            <Power
                                key={power.name}
                                power={power}
                                attack={this.props.attackNad}
                                update={() => this.powerUpdateHandler(power, index)}
                                delete={() => this.props.onPowerDelete(index)}
                            />
                    )})}
                    
                    {powerButton}
                    <br/>
                    {saveButton}
                </div>
            </div>
        );    
    }
}

const mapStateToProps = state => {
    return {
        monster: state.monster,
        damage: state.monster.damage,
        attackAc: state.monster.attackAc,
        attackNad: state.monster.attackNad,
        powerCount: state.monster.powerCount,
        powers: state.monster.powers,
        stat: state.monster.stat,
        userId: state.auth.userId,
        token: state.auth.token,
        monsterId: state.save.monsterId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateStat: (name, value) => dispatch(actions.updateStat(name, value)),
        onPowerDelete: (index) => dispatch(actions.deletePower(index)),
        onSaveMonster: (monster, token) => dispatch(actions.saveMonster(monster, token)),
        onUpdateMonster: (monster, token, id) => dispatch(actions.updateMonster(monster, token, id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Builder));