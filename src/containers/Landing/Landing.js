import React, {Component} from "react";
import {connect} from "react-redux";

class Landing extends Component {
    
    render() {
        
        return (
            <div id="landing">
                // inputs
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

export default connect(mapStateToProps, mapDispatchToProps)(Landing);