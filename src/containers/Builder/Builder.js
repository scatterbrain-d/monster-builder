import React, {Component} from "react";
import {connect} from "react-redux";
import StatBox from "../../components/StatBox";

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
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Builder);