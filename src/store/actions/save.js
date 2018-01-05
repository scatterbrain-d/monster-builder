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

export const saveMonster = (monster) => {
    return dispatch => {
        dispatch(saveStart());
        axios.post("/monsters.json", monster)
            .then(response => {
               dispatch(saveSuccess(response.data.name, monster));
            })
            .catch(error => {
                dispatch(saveFail(error));
        });
    };    
};