import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import Monster from "../../components/Monster/Monster";
import style from "./Monsters.css";
import globalStyle from "../../global.css";

class Monsters extends Component {
    
    selectMonsterHandler = (monster, id) => {
        this.props.onLoadMonster(monster);
        this.props.onLoadMonsterId(id);
        this.props.history.push("/builder");
    }
    
    deleteMonsterHandler = (id) => {
        this.props.onDeleteMonster(this.props.token, id, this.props.userId);
    }
    
    render(){
        let monsters = <Spinner/>;
        
        if(!this.props.loading)
            monsters = (
                <div>
                    <h1 className={globalStyle.title}>My Monsters</h1>
                    <div className={style.container}>
                        {this.props.monsters.map(entry => (
                            <Monster
                                key={entry.id}
                                stat={entry.monster.stat}
                                load={() => this.selectMonsterHandler(entry.monster, entry.id)}
                                delete={() => this.deleteMonsterHandler(entry.id)}
                            />
                        ))}
                    </div>
                </div>    
            );
        return (
            <div className={style.monsters}>
                {monsters}
            </div>
        );
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
        onDeleteMonster: (token, id, userId) => dispatch(actions.deleteMonster(token, id, userId))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Monsters));