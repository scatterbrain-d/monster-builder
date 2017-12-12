import React, {Component} from "react";
import {connect} from "react-redux";

import * as actionTypes from "../../store/actions";

let powerIndex = 0;

class Power extends Component {
    
    
    handler = (event, index) => {
        console.log("handler:", event, index);
        this.props.onSetPowerName(event, index);
    }
    
    render(){
        powerIndex = this.props.index;
        console.log("pre-render:", powerIndex);
        
        return (
            <div>
                {this.props.name}{this.props.action}
            </div>
        );
    }
}

console.log("post-render:", powerIndex);

const mapStateToProps = state => {
    console.log(state.powers[powerIndex].name)
    return {
        name: state.powers[powerIndex].name,
        damage: state.damage,
        attackAc: state.attackAc,
        attackNad: state.attackNad,
        powerCount: state.powerCount,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetPowerName: (value, index) => dispatch({type: actionTypes.SET_POWER_NAME, val: value, idx: index })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Power);