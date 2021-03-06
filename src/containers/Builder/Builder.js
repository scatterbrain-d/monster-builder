/* This component allows review and edit of monster stats, many of which are
   calculated automatically from <Landing/> info. "Edit" mode provides input
   fields for all stats and provides access to <PowerModal/> which creates and
   edits powers. "Display" mode presents the monster and its powers in a user-
   friendly format for gameplay. */

import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import BuilderButtons from "../../components/BuilderButtons/BuilderButtons";
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
                text: "",
                category: ""
            }
        });
    }
    
    saveMonsterHandler = () => {
        const monster = {
            monster: this.props.monster,
            userId: this.props.userId
        };
        if(this.props.monsterId === null)
            this.props.onSaveMonster(monster, this.props.token, this.props.userId);
        else
            this.props.onUpdateMonster(monster, this.props.token, this.props.monsterId, this.props.userId);
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
        
        let powerModal = null;
        
        if(this.state.showPowerModal)
            powerModal = (
                    <PowerModal
                        show={this.state.showPowerModal}
                        modalClosed={this.powerEntryHandler}
                        index={this.state.powerIndex}
                        power={this.state.powerTemplate}
                    />
                );
        
        return (
            <div className={style.builder}>
                <div className={style.container}>
                    <h1 className={globalStyle.title}>{this.state.editMode ? "Edit" : "View"} Monster</h1>
                    
                    <BuilderButtons
                        editMode={this.state.editMode}
                        token={this.props.token}
                        powerClick={this.powerEntryHandler}
                        saveClick={this.saveMonsterHandler}
                        loginClick={() => this.props.history.push("/auth")}
                    />
                    
                    <div className={style.flexDisplay}>
                        
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
                        
                        <div className={style.powerBlock}>
                            
                            {this.props.powers.map((power, index) => {
                            return (
                                    <Power
                                        key={power.name}
                                        power={power}
                                        attack={this.props.attackNad}
                                        update={() => this.powerUpdateHandler(power, index)}
                                        delete={() => this.props.onPowerDelete(index)}
                                    />
                            )})}
                        </div>
                    
                    </div>
                    {powerModal}
                </div>
            </div>
        );    
    }
}

const mapStateToProps = state => {
    return {
        monster: state.monster,
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
        onSaveMonster: (monster, token, userId) => dispatch(actions.saveMonster(monster, token, userId)),
        onUpdateMonster: (monster, token, id, userId) => dispatch(actions.updateMonster(monster, token, id, userId))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Builder));