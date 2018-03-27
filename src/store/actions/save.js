import axios from "../../axios-monsters";
import * as actionTypes from "../actions/actionTypes";

export const asyncStart = () => {
    return {
        type: actionTypes.ASYNC_START
    };
};

export const asyncFail = (error) => {
    return {
        type: actionTypes.ASYNC_FAIL,
        error: error
    };
};

export const fetchMonstersSuccess = (monsters) => {
    return {
        type: actionTypes.FETCH_MONSTERS_SUCCESS,
        monsters: monsters
    };
};

export const fetchMonsters = (token, userId) => {
    return dispatch => {
        dispatch(asyncStart());
        console.log(token, userId);
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
                dispatch(asyncFail(error));
        });
    };
};

export const saveSuccess = (id, monster) => {
    return {
        type: actionTypes.SAVE_SUCCESS,
        id: id,
        monster: monster
    };
};

export const saveMonster = (monster, token, userId) => {
    return dispatch => {
        dispatch(asyncStart());
        axios.post("/monsters.json?auth=" + token, monster)
            .then(response => {
               dispatch(saveSuccess(response.data.name, monster));
               dispatch(fetchMonsters(token, userId));
            })
            .catch(error => {
                dispatch(asyncFail(error));
        });
    };    
};

export const loadMonsterId = (id) => {
    return {
        type: actionTypes.LOAD_MONSTER_ID,
        monsterId: id
    };
};

export const updateMonster = (monster, token, id, userId) => {
    return dispatch => {
        dispatch(asyncStart());
        axios.patch("/monsters/" + id + ".json?auth=" +token, monster)
            .then(response => {
                dispatch(saveSuccess(response.data.name, monster));
                dispatch(fetchMonsters(token, userId));
            })
            .catch(error => {
                dispatch(asyncFail(error));
            });
    };
};

export const deleteMonster = (token, id, userId) => {
    return dispatch => {
        dispatch(asyncStart());
        axios.delete("/monsters/" + id + ".json?auth=" +token)
            .then(response => {
                dispatch(deleteSuccess());
                dispatch(fetchMonsters(token, userId));
            })
            .catch(error => {
                dispatch(asyncFail(error));
            });
        
    };
};

export const deleteSuccess = () => {
    return {
        type: actionTypes.DELETE_SUCCESS
    };
};
