import * as actionTypes from "../actions/actionTypes";

export const setBaseStat = (name,value) => {
    return {
        type: actionTypes.SET_BASE_STAT,
        name: name,
        val: value
    };
};

export const updateStat = (name, value) => {
    return {
        type: actionTypes.UPDATE_STAT,
        name: name,
        val: value
    };
};

export const createMonster = () => {
    return {
        type: actionTypes.CREATE_MONSTER
    };
};

export const addPower = () => {
    return {
        type: actionTypes.ADD_POWER
    };
};

export const pushPower = (power) => {
    console.log(power);
    return {
        type: actionTypes.PUSH_POWER,
        object: power
    };
};

export const updatePower = (power, index) => {
    return {
        type: actionTypes.UPDATE_POWER,
        object: power
    };
};

export const loadMonster = (monster) => {
    return {
        type: actionTypes.LOAD_MONSTER,
        monster: monster
    };
};

