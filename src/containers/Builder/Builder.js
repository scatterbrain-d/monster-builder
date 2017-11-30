import React, {Component} from "react";
import {connect} from "react-redux";
import StatBox from "../../components/StatBox";
import * as actionTypes from "../../store/actions";

class Builder extends Component {
    
    dispatchHandler = (name, value) => {
        console.log(name, value);
        switch(name) {
            case("name"): this.props.onUpdateName(value); break;
            case("keywords"): this.props.onUpdateKeywords(value); break;
            case("hp"): this.props.onUpdateHp(value); break;
            case("ac"): this.props.onUpdateAc(value); break;
            case("fort"): this.props.onUpdateFort(value); break;
            case("ref"): this.props.onUpdateRef(value); break;
            case("will"): this.props.onUpdateWill(value); break;
            case("speed"): this.props.onUpdateSpeed(value); break;
            case("initiative"): this.props.onUpdateInitiative(value); break;
            case("resist"): this.props.onUpdateResist(value); break;
            case("senses"): this.props.onUpdateSenses(value); break;
            case("skills"): this.props.onUpdateSkills(value); break;
            case("languages"): this.props.onUpdateLanguages(value); break;
            case("alignment"): this.props.onUpdateAlignment(value); break;
            case("str"): this.props.onUpdateStr(value); break;
            case("con"): this.props.onUpdateCon(value); break;
            case("dex"): this.props.onUpdateDex(value); break;
            case("int"): this.props.onUpdateInt(value); break;
            case("wis"): this.props.onUpdateWis(value); break;
            case("cha"): this.props.onUpdateCha(value); break;
            case("save"): this.props.onUpdateSave(value); break;
            case("ap"): this.props.onUpdateAp(value); break;
            default: break;
        }
    }

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
                        update={(event) => this.dispatchHandler(stat.name, event.target.value)}
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
        onUpdateName: (value) => dispatch({type: actionTypes.UPDATE_NAME, val: value}),
        onUpdateKeywords: (value) => dispatch({type: actionTypes.UPDATE_KEYWORDS, val: value}),
        onUpdateHp: (value) => dispatch({type: actionTypes.UPDATE_HP, val: value}),
        onUpdateAc: (value) => dispatch({type: actionTypes.UPDATE_AC, val: value}),
        onUpdateFort: (value) => dispatch({type: actionTypes.UPDATE_FORT, val: value}),
        onUpdateRef: (value) => dispatch({type: actionTypes.UPDATE_REF, val: value}),
        onUpdateWill: (value) => dispatch({type: actionTypes.UPDATE_WILL, val: value}),
        onUpdateSpeed: (value) => dispatch({type: actionTypes.UPDATE_SPEED, val: value}),
        onUpdateInitiative: (value) => dispatch({type: actionTypes.UPDATE_INITIATIVE, val: value}),
        onUpdateResist: (value) => dispatch({type: actionTypes.UPDATE_RESIST, val: value}),
        onUpdateSenses: (value) => dispatch({type: actionTypes.UPDATE_SENSES, val: value}),
        onUpdateSkills: (value) => dispatch({type: actionTypes.UPDATE_SKILLS, val: value}),
        onUpdateLanguages: (value) => dispatch({type: actionTypes.UPDATE_LANGUAGES, val: value}),
        onUpdateAlignment: (value) => dispatch({type: actionTypes.UPDATE_ALIGNMENT, val: value}),
        onUpdateStr: (value) => dispatch({type: actionTypes.UPDATE_STR, val: value}),
        onUpdateCon: (value) => dispatch({type: actionTypes.UPDATE_CON, val: value}),
        onUpdateDex: (value) => dispatch({type: actionTypes.UPDATE_DEX, val: value}),
        onUpdateInt: (value) => dispatch({type: actionTypes.UPDATE_INT, val: value}),
        onUpdateWis: (value) => dispatch({type: actionTypes.UPDATE_WIS, val: value}),
        onUpdateCha: (value) => dispatch({type: actionTypes.UPDATE_CHA, val: value}),
        onUpdateSave: (value) => dispatch({type: actionTypes.UPDATE_SAVE, val: value}),
        onUpdateAp: (value) => dispatch({type: actionTypes.UPDATE_AP, val: value})
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Builder);