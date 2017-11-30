import React, {Component} from "react";
import {connect} from "react-redux";

import * as actionTypes from "../../store/actions";

class Landing extends Component {
    
    
    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onCreateMonster();
        this.props.history.replace("/builder");
    }
    
    render() {
        return (
            <div id="landing">
                <form id="creationForm" onSubmit={this.onSubmitHandler}>
                    <div className="formInput">
                        <label>Name</label>
                        <input 
                            type="text" 
                            value={this.props.name} 
                            onChange={(event) => this.props.onSetName(event.target.value)} 
                        />
                    </div>
                    
                    <div className="formInput">
                        <label>Level</label>
                        <input 
                            type="number" 
                            value={this.props.level} 
                            onChange={(event) => this.props.onSetLevel(Number(event.target.value))} 
                            max="35" 
                            min="1"
                        />
                    </div>
                    <div className="formInput">
                        <label>Threat</label>
                        <select 
                            value={this.props.threat} 
                            onChange={(event) => this.props.onSetThreat(event.target.value)}
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
                            onChange={(event) => this.props.onSetRole(event.target.value)}
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
                        <label>Leader</label>
                        <input 
                            type="checkbox" 
                            value={this.props.leader} 
                            onChange={(event) => this.props.onSetLeader(event.target.value)}
                        />
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
        leader: state.leader
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetName: (value) => dispatch({type: actionTypes.SET_NAME, val: value}),
        onSetLevel: (value) => dispatch({type: actionTypes.SET_LEVEL, val: value}),
        onSetThreat: (value) => dispatch({type: actionTypes.SET_THREAT, val: value}),
        onSetRole: (value) => dispatch({type: actionTypes.SET_ROLE, val: value}),
        onSetLeader: (value) => dispatch({type: actionTypes.SET_LEADER, val: value}),
        onCreateMonster: () => dispatch({type: actionTypes.CREATE_MONSTER})
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Landing);