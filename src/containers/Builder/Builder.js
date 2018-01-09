import React, {Component} from "react";
import {connect} from "react-redux";

// import Aux from "../../hoc/Aux/Aux";
import StatBox from "../../components/StatBox/StatBox";
import Power from "../../components/Power/Power";
import PowerModal from "../PowerModal/PowerModal";
import * as actions from "../../store/actions/index";

class Builder extends Component {
    
    state = {
        powerModal: false,
        editMode: true
    }
    
    powerEntryHandler = () => this.setState({showPowerModal: !this.state.showPowerModal});
    
    saveMonsterHandler = () => {
        
        const monster = {
            monster: this.props.monster,
            userId: this.props.userId
        };
        
        if(this.props.monsterId === null)
            this.props.onSaveMonster(monster, this.props.token);
        else
            this.props.onUpdateMonster(monster, this.props.token, this.props.monsterId);
    }
    
    modeToggleHandler = () => {
        this.setState((prevState) => {
            return {editMode: !prevState.editMode};
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
        
        return (
            <div className="builder">
                <div className="container">

                    <div id="editBlock">  
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
                    <div id="statFooter">
                    
                    </div>
                </div>
                    
                    
                    {powerArray.map(power => (
                            <Power
                                key={power.name}
                                name={power.name}
                                action={power.action}
                                use={power.use}
                                basic={power.basic}
                                target={power.target}
                                area={power.area}
                                range={power.range}
                                keywords={power.keywords}
                                text={power.text}
                            />
                    ))}
                    
                    <button id="addPower" onClick={this.powerEntryHandler}>Add Power</button>
                    <PowerModal
                        show={this.state.showPowerModal}
                        modalClosed={this.powerEntryHandler}
                        index={this.props.powerCount}
                        damage={this.props.damage}
                    />
                    <button onClick={this.modeToggleHandler}>
                        {this.state.editMode ? "DISPLAY" : "EDIT"}
                    </button>
                    <button onClick={this.saveMonsterHandler}>
                        SAVE
                    </button>
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
        onAddPower: () => dispatch(actions.addPower()),
        onSaveMonster: (monster, token) => dispatch(actions.saveMonster(monster, token)),
        onUpdateMonster: (monster, token, id) => dispatch(actions.updateMonster(monster, token, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Builder);