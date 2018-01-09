import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import Monster from "../../components/Monster/Monster";

class Monsters extends Component {
    
    componentDidMount() {
        this.props.onFetchMonsters(this.props.token, this.props.userId);
    }
    
    render(){
        let monsters = <Spinner/>;
        
        if(!this.props.loading)
            monsters = (
                <div>
                    {this.props.monsters.map(entry => (
                        <Monster
                            key={entry.id}
                            stat={entry.monster.stat}
                            level={entry.monster.level}
                            role={entry.monster.role}
                            threat={entry.monster.threat}
                        />
                    ))}
                </div>    
            );
        return monsters;
    }
}

const mapStateToProps = state => {
    return {
        monsters: state.save.monsters,
        loading: state.save.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchMonsters: (token, userId) => dispatch(actions.fetchMonsters(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Monsters);