import React, {Component} from "react";
import {connect} from "react-redux";

import Backdrop from "../../components/Backdrop/Backdrop";
import Aux from "../../hoc/Aux/Aux";
import * as actions from "../../store/actions/index";

let power = {
    name: "",
    action: "Standard",
    use: "At-Will",
    basic: false,
    target: "Melee",
    range: "",
    area: "",
    keywords: "",
    text: ""
};

class PowerModal extends Component {
    
    state = {
        attackType: 1
    }
    
    submitHandler = (event, object) => {
        event.preventDefault();
        this.props.onPushPower(object, this.props.index);
        this.props.modalClosed();
    }
    
    inputHandler = (event) => {
        power[event.target.name] = event.target.value;
        if (event.target.name === "target") {
            switch (event.target.value) {
                case "Melee":
                case "Ranged":
                case "Line":
                    return this.setState({attackType: 1});
                case "Close Blast":
                case "Close Burst":
                case "Aura":
                    return this.setState({attackType: 2});
                case "Area Burst":
                    return this.setState({attackType: 3});
                default:
                    return this.setState({attackType: 0});
            }
        }
    }
    
    render(){
        
        let attackRange;
        
        const rangeInput = (
                    <input 
                        className="shortInput"
                        type="text"
                        name="range"
                        placeholder="Range"
                        onChange={(event) => this.inputHandler(event)}
                    />
                );
        
        const areaInput = (
                    <input
                        className="shortInput"
                        type="text"
                        name="area"
                        placeholder="Area"
                        onChange={(event) => this.inputHandler(event)}
                    />
                );
        
        switch (this.state.attackType) {
            case 1:
                attackRange = rangeInput;
            break;
            case 2:
                attackRange = areaInput;
            break;
            case 3:
                attackRange = (
                    <Aux>
                        {areaInput} <span> in </span> {rangeInput}
                    </Aux>
                );
            break;
            default: attackRange = "";
        }
        
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div
                    className="powerModal"
                    style={{
                        transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
                        opacity: this.props.show ? "1" : "0"
                    }}
                >
                    <h2>Add Power</h2>
                    <form onSubmit={(event) => this.submitHandler(event, power)}>
                        <div>
                            <label>Basic Attack</label>
                            <input 
                                type="checkbox"
                                name="basic"
                                onChange={(event) => this.inputHandler(event)}
                            />
                        </div>
                        <div>
                            <label>Power Name</label>
                            <input
                                type="text"
                                name="name"
                                onChange={(event) => this.inputHandler(event)}
                                placeholder="Name"
                            />
                        </div>
                        <div>
                            <label>Action</label>
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
                        </div>
                        <div>
                            <label>Use</label>
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
                        </div>
                        <div>
                            <label>Range</label>
                            <select name="target" defaultValue="Melee"
                                onChange={(event) => this.inputHandler(event)}>
                                <option>Melee</option>
                                <option>Ranged</option>
                                <option>Close Burst</option>
                                <option>Close Blast</option>
                                <option>Area Burst</option>
                                <option>Aura</option>
                                <option>Line</option>
                            </select>
                            {attackRange}
                        </div>
                        <div>
                            <label>Keywords</label>
                            <input 
                                type="text"
                                name="keywords"
                                onChange={(event) => this.inputHandler(event)}
                                placeholder="Keywords"
                            />
                        </div>
                        <div>
                            <label>Power Text</label>
                            <textarea
                                name="text"
                                onChange={(event) => this.inputHandler(event)}
                                placeholder={"suggested damage:" + this.props.damage}
                            ></textarea>
                        </div>
                        <button>Submit</button>
                    </form>
                </div>
            </Aux>
        );
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPushPower: (power, index) => dispatch(actions.pushPower(power, index))
    };
};

export default connect(null, mapDispatchToProps)(PowerModal);