import React, {Component} from "react";
import {connect} from "react-redux";

import Aux from "../../hoc/Aux/Aux";
import StatBox from "../../components/StatBox";
import Power from "../../components/Power/Power";
import PowerModal from "../PowerModal/PowerModal";
import * as actionTypes from "../../store/actions";

class Builder extends Component {
    
    state = {
        powerModal: false
    }
    
    powerEntryHandler = () => this.setState({showPowerModal: !this.state.showPowerModal});

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
        console.log("power array", powerArray);
        }
        
        return (
            <Aux>
                <div id="statBlock">
                    {statArray.map(stat => (
                        <StatBox
                            key={stat.name}
                            name={stat.name}
                            value={stat.value}
                            strUpdate={(event) => this.props.onUpdateStat(stat.name, event.target.value)}
                            numUpdate={(event) => this.props.onUpdateStat(stat.name, Number(event.target.value))}
                        />
                    ))}
                    
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
                            config={power.config}
                        />
                ))}
                <button onClick={this.powerEntryHandler}>Add Power</button>
                <PowerModal
                    show={this.state.showPowerModal}
                    modalClosed={this.powerEntryHandler}
                    index={this.props.powerCount}
                    damage={this.props.damage}
                />
            </Aux>
        );    
    }
}

const mapStateToProps = state => {
    return {
        damage: state.damage,
        attackAc: state.attackAc,
        attackNad: state.attackNad,
        powerCount: state.powerCount,
        powers: state.powers,
        stat: {
            name: state.stat.name,
            keywords: state.stat.keywords,
            hp: state.stat.hp,
            ac: state.stat.ac,
            fort: state.stat.fort,
            ref: state.stat.ref,
            will: state.stat.will,
            speed: state.stat.speed,
            initiative: state.stat.initiative,
            resist: state.stat.resist,
            senses: state.stat.senses,
            skills: state.stat.skills,
            languages: state.stat.languages,
            alignment: state.stat.alignment,
            str: state.stat.str,
            con: state.stat.con,
            dex: state.stat.dex,
            int: state.stat.int,
            wis: state.stat.wis,
            cha: state.stat.cha,
            save: state.stat.save,
            ap: state.stat.ap
        }
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateStat: (name, value) => dispatch({type: actionTypes.UPDATE_STAT, name: name, val: value}),
        onAddPower: () => dispatch({type: actionTypes.ADD_POWER})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Builder);