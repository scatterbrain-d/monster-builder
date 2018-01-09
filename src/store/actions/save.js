import axios from "../../axios-monsters";
import * as actionTypes from "../actions/actionTypes";

export const saveStart = () => {
    return {
        type: actionTypes.SAVE_START
    };
};

export const saveSuccess = (id, monster) => {
    return {
        type: actionTypes.SAVE_SUCCESS,
        id: id,
        monster: monster
    };
};

export const saveFail = (error) => {
    return {
        type: actionTypes.SAVE_FAIL,
        error: error
    };
};

export const saveMonster = (monster, token) => {
    return dispatch => {
        dispatch(saveStart());
        axios.post("/monsters.json?auth=" + token, monster)
            .then(response => {
               dispatch(saveSuccess(response.data.name, monster));
            })
            .catch(error => {
                dispatch(saveFail(error));
        });
    };    
};

export const fetchMonstersSuccess = (monsters) => {
    return {
        type: actionTypes.FETCH_MONSTERS_SUCCESS,
        monsters: monsters
    };
};

export const fetchMonstersFail = (error) => {
    return {
        type: actionTypes.FETCH_MONSTERS_FAIL,
        error: error
    };
};

export const fetchMonstersStart = () => {
    return {
        type: actionTypes.FETCH_MONSTERS_START    
    };
};

export const fetchMonsters = (token, userId) => {
    return dispatch => {
        dispatch(fetchMonstersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/monsters.json' + queryParams)
            .then(res => {
                const fetchedMonsters =[];
                for(let key in res.data) {
                    fetchedMonsters.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchMonstersSuccess(fetchedMonsters));
            })
            .catch(error => {
                dispatch(fetchMonstersFail(error));
        });
    };
};




