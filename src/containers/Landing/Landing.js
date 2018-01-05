import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../../store/actions/index";

class Landing extends Component {
    
    
    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onCreateMonster();
        this.props.history.replace("/builder");
    }
    
    render() {
        return (
            <div id="landing">
                <div>
                    <h1>D&D Monster Builder</h1>
                </div>
                <form id="creationForm" onSubmit={this.onSubmitHandler}>
                    <div className="formInput">
                        <label>Name</label>
                        <input 
                            value={this.props.name} 
                            onChange={(event) => this.props.onUpdateStat("name", event.target.value)} 
                        />
                    </div>
                    
                    <div className="formInput">
                        <label>Level</label>
                        <input 
                            type="number" 
                            value={this.props.level} 
                            onChange={(event) => this.props.onSetBaseStat("level", Number(event.target.value))} 
                            max="35" 
                            min="1"
                        />
                    </div>
                    <div className="formInput">
                        <label>Threat</label>
                        <select 
                            value={this.props.threat} 
                            onChange={(event) => this.props.onSetBaseStat("threat", event.target.value)}
                        >
                            <option>Standard</option>
                            <option>Minion</option>
                            <option>Elite</option>
                            <option>Solo</option>
                        </select>
                    </div>
                    <div className="formInput">
                        <label>Role</label>
                        <select 
                            value={this.props.role} 
                            onChange={(event) => this.props.onSetBaseStat("role", event.target.value)}
                        >
                            <option>Soldier</option>
                            <option>Skirmisher</option>
                            <option>Brute</option>
                            <option>Artillery</option>
                            <option>Lurker</option>
                            <option>Controller</option>
                        </select>
                    </div>
                    <div className="formInput">
                        <label>Size</label>
                        <select 
                            value={this.props.size} 
                            onChange={(event) => this.props.onSetBaseStat("size", event.target.value)}
                        >
                            <option>Tiny</option>
                            <option>Small</option>
                            <option>Medium</option>
                            <option>Large</option>
                            <option>Huge</option>
                            <option>Colossal</option>
                        </select>
                    </div>
                    <div className="formInput">
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        );    
    }
}

const mapStateToProps = state => {
    return {
        level: state.level,
        threat: state.threat,
        role: state.role,
        size: state.size
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateStat: (name, value) => dispatch(actions.updateStat(name, value)),
        onSetBaseStat: (name, value) => dispatch(actions.setBaseStat(name, value)),
        onCreateMonster: () => dispatch(actions.createMonster())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Landing);