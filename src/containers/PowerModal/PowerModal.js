import React, {Component} from "react";
import {connect} from "react-redux";

import * as actionTypes from "../../store/actions";

let power = {
    name: "",
    action: "Standard",
    use: "At-Will",
    basic: false,
    target: "Melee",
    range: "",
    area: null,
    keywords: "",
    text: "",
    config: ""
};

class PowerModal extends Component {
    
    submitHandler = (event, object) => {
        event.preventDefault();
        this.props.onPushPower(object, this.props.index);
        this.props.modalClosed();
        
    }
    
    inputHandler = (event) => {
        power[event.target.name] = event.target.value;
    }
    
    render(){
        return (
            <div>
                <form onSubmit={(event) => this.submitHandler(event, power)}>
                    <input 
                        type="text"
                        name="name"
                        onChange={(event) => this.inputHandler(event)}
                        placeholder="Power Name"
                    />
                    <select name="action" defaultValue="Standard"
                        onChange={(event) => this.inputHandler(event)}>
                        <option>Standard</option>
                        <option>Move</option>
                        <option>Minor</option>
                        <option>Free</option>
                        <option>No Action</option>
                        <option>Immediate Interrupt</option>
                        <option>Immediate Reaction</option>
                        <option>Opportunity Action</option>
                    </select>
                    <select name="use" defaultValue="At-Will"
                        onChange={(event) => this.inputHandler(event)}>
                        <option>At-Will</option>
                        <option>Encounter</option>
                        <option>Recharge when bloodied</option>
                        <option>Recharge(6)</option>
                        <option>Recharge(5,6)</option>
                        <option>Recharge(4,5,6)</option>
                        <option>When bloodied</option>
                        <option>When reduced to 0 hp</option>
                    </select>
                    <input 
                        type="checkbox"
                        name="basic"
                        onChange={(event) => this.inputHandler(event)}
                    />
                    <input 
                        type="text"
                        name="target"
                        onChange={(event) => this.inputHandler(event)}
                        placeholder="Target"
                    />
                    <select name="range" defaultValue="Melee"
                        onChange={(event) => this.inputHandler(event)}>
                        <option>Melee</option>
                        <option>Ranged</option>
                        <option>Close Burst</option>
                        <option>Close Blast</option>
                        <option>Aura</option>
                        <option>Line</option>
                    </select>
                    <input
                        type="number"
                        name="area"
                        onChange={(event) => this.inputHandler(event)}
                        initialvalue="1"
                    />
                    <input 
                        type="text"
                        name="keywords"
                        onChange={(event) => this.inputHandler(event)}
                        placeholder="Keywords"
                    />
                    <input 
                        type="text"
                        name="text"
                        onChange={(event) => this.inputHandler(event)}
                        placeholder={"suggested damage:" + this.props.damage}
                    />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPushPower: (power, index) => dispatch({type: actionTypes.PUSH_POWER, object: power, index: index})
    };
};

export default connect(null, mapDispatchToProps)(PowerModal);