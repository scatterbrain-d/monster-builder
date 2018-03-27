import React, {Component} from "react";
import {connect} from "react-redux";

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
        return (
            <div className={style.landing}>
                <div>
                    <h1>D&D Monster Builder</h1>
                </div>
                <form className={style.creationForm + " " + globalStyle.mainBorder} onSubmit={this.onSubmitHandler}>
                    <div>
                        <label>Name</label>
                        <input 
                            className={globalStyle.minorBorder}
                            value={this.props.name} 
                            onChange={(event) => this.props.onUpdateStat("name", event.target.value)}
                            required
                        />
                    </div>
                    
                    <div>
                        <label>Level</label>
                        <input 
                            className={globalStyle.minorBorder}
                            type="number" 
                            value={this.props.level} 
                            onChange={(event) => this.props.onUpdateStat("level", Number(event.target.value))} 
                            max="35" 
                            min="1"
                        />
                    </div>
                    <div>
                        <label>Threat</label>
                        <select 
                            className={globalStyle.minorBorder}
                            value={this.props.threat} 
                            onChange={(event) => this.props.onUpdateStat("threat", event.target.value)}
                        >
                            <option>Standard</option>
                            <option>Minion</option>
                            <option>Elite</option>
                            <option>Solo</option>
                        </select>
                    </div>
                    <div>
                        <label>Role</label>
                        <select 
                            className={globalStyle.minorBorder}
                            value={this.props.role} 
                            onChange={(event) => this.props.onUpdateStat("role", event.target.value)}
                        >
                            <option>Soldier</option>
                            <option>Skirmisher</option>
                            <option>Brute</option>
                            <option>Artillery</option>
                            <option>Lurker</option>
                            <option>Controller</option>
                        </select>
                    </div>
                    <div>
                        <label>Size</label>
                        <select
                            className={globalStyle.minorBorder}
                            value={this.props.size} 
                            onChange={(event) => this.props.onUpdateStat("size", event.target.value)}
                        >
                            <option>Tiny</option>
                            <option>Small</option>
                            <option>Medium</option>
                            <option>Large</option>
                            <option>Huge</option>
                            <option>Colossal</option>
                        </select>
                    </div>
                    <div>
                        <button className={globalStyle.minorBorder}>Submit</button>
                    </div>
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