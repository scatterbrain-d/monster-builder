import React, {Component} from "react";
import {connect} from "react-redux";

import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Aux from "../../hoc/Aux/Aux";
import * as actions from "../../store/actions/index";

class PowerModal extends Component {
    
    state = {
        attackType: 1,
        power: {}
    }
    
    componentWillMount = () => {
        console.log(this.props.power);    
        this.setState({power: this.props.power});
    }
    
    submitHandler = (event, object) => {
        event.preventDefault();
        this.props.onPushPower(object, this.props.index);
        this.props.modalClosed();
    }
    
    inputHandler = (event) => {
        const newPower = {...this.state.power, [event.target.name]: event.target.value};
        this.setState({power: newPower});
        if (event.target.name === "target") {
            switch (event.target.value) {
                case "Self":
                    return this.setState({attackType: 0});
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
                    return this.setState({attackType: 1});
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
                        value={this.state.power.range}
                        onChange={(event) => this.inputHandler(event)}
                    />
                );
        
        const areaInput = (
                    <input
                        className="shortInput"
                        type="text"
                        name="area"
                        value={this.state.power.area}
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
            default: attackRange = null;
        }
        
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className="powerModal">
                    <h2>Add Power</h2>
                    <form onSubmit={(event) => this.submitHandler(event, this.state.power)}>
                        <div>
                            <label>Basic Attack</label>
                            <input 
                                type="checkbox"
                                name="basic"
                                value={this.state.power.basic}
                                onChange={(event) => this.inputHandler(event)}
                            />
                        </div>
                        <div>
                            <label>Power Name</label>
                            <input
                                type="text"
                                name="name"
                                value={this.state.power.name}
                                onChange={(event) => this.inputHandler(event)}
                            />
                        </div>
                        <div>
                            <label>Action</label>
                            <select name="action" value={this.state.power.action}
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
                            <select name="use" value={this.state.power.use}
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
                            <select name="target" value={this.state.power.target}
                                onChange={(event) => this.inputHandler(event)}>
                                <option>Melee</option>
                                <option>Ranged</option>
                                <option>Close Burst</option>
                                <option>Close Blast</option>
                                <option>Area Burst</option>
                                <option>Aura</option>
                                <option>Line</option>
                                <option>Self</option>
                            </select>
                            {attackRange}
                        </div>
                        <div>
                            <label>Keywords</label>
                            <input 
                                type="text"
                                name="keywords"
                                value={this.state.power.keywords}
                                onChange={(event) => this.inputHandler(event)}
                                placeholder="Keywords"
                            />
                        </div>
                        <div>
                            <label>Power Text</label>
                            <textarea
                                name="text"
                                value={this.state.power.text}
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