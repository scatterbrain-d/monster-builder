import React, {Component} from "react";
import {connect} from "react-redux";

// import Aux from "../../hoc/Aux/Aux";
import StatBox from "../../components/StatBox";
import Power from "../../components/Power/Power";
import PowerModal from "../PowerModal/PowerModal";
import * as actions from "../../store/actions/index";

class Builder extends Component {
    
    state = {
        powerModal: false
    }
    
    powerEntryHandler = () => this.setState({showPowerModal: !this.state.showPowerModal});
    
    saveMonsterHandler = () => {
        this.props.onSaveMonster(this.props.monster);
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
                    <button onClick={this.saveMonsterHandler}>
                        Save
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
        stat: {
            name: state.monster.stat.name,
            img: state.monster.stat.img,
            keywords: state.monster.stat.keywords,
            hp: state.monster.stat.hp,
            ac: state.monster.stat.ac,
            fort: state.monster.stat.fort,
            ref: state.monster.stat.ref,
            will: state.monster.stat.will,
            speed: state.monster.stat.speed,
            initiative: state.monster.stat.initiative,
            resist: state.monster.stat.resist,
            senses: state.monster.stat.senses,
            skills: state.monster.stat.skills,
            languages: state.monster.stat.languages,
            alignment: state.monster.stat.alignment,
            str: state.monster.stat.str,
            con: state.monster.stat.con,
            dex: state.monster.stat.dex,
            int: state.monster.stat.int,
            wis: state.monster.stat.wis,
            cha: state.monster.stat.cha,
            save: state.monster.stat.save,
            ap: state.monster.stat.ap
        }
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateStat: (name, value) => dispatch(actions.updateStat(name, value)),
        onAddPower: () => dispatch(actions.addPower()),
        onSaveMonster: (monster) => dispatch(actions.saveMonster(monster))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Builder);