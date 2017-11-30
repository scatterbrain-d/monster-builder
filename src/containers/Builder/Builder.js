import React, {Component} from "react";
import {connect} from "react-redux";
import StatBox from "../../components/StatBox";
import * as actionTypes from "../../store/actions";

class Builder extends Component {

    render() {
        
        const statArray = [];
        
        for(let entry in this.props.stat) {
            statArray.push({
                name: entry,
                value: this.props.stat[entry]
            });
        }
        
        
        return (
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
        );    
    }
}

const mapStateToProps = state => {
    return {
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Builder);