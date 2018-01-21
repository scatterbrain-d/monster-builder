import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import Monster from "../../components/Monster/Monster";
import style from "./Monsters.css";

class Monsters extends Component {
    
    componentDidMount() {
        this.props.onFetchMonsters(this.props.token, this.props.userId);
    }
    
    selectMonsterHandler = (monster, id) => {
        this.props.onLoadMonster(monster);
        this.props.onLoadMonsterId(id);
        this.props.history.push("/builder");
    }
    
    deleteMonsterHandler = (id) => {
        this.props.onDeleteMonster(this.props.token, id);
        // UPDATE MONSTER LIST SOMEHOW
    }
    
    render(){
        let monsters = <Spinner/>;
        
        if(!this.props.loading)
            monsters = (
                <div className={style.container}>
                    <h2>My Monsters</h2>
                    {this.props.monsters.map(entry => (
                        <Monster
                            key={entry.id}
                            stat={entry.monster.stat}
                            load={() => this.selectMonsterHandler(entry.monster, entry.id)}
                            delete={() => this.deleteMonsterHandler(entry.id)}
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
        onFetchMonsters: (token, userId) => dispatch(actions.fetchMonsters(token, userId)),
        onLoadMonster: (monster) => dispatch(actions.loadMonster(monster)),
        onLoadMonsterId: (id) => dispatch(actions.loadMonsterId(id)),
        onDeleteMonster: (token, id) => dispatch(actions.deleteMonster(token, id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Monsters));