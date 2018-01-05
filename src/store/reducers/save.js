import * as actionTypes from "../actions/actionTypes";

const initialState = {
    monsters: [],
    loading: false,
    saved: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case (actionTypes.SAVE_START): {return {...state, loading: true}}
        
        case (actionTypes.SAVE_SUCCESS): {
            const newMonster = {...action.monster, id: action.id};
            return {...state, monsters: state.monsters.concat(newMonster), loading: false, saved: true};
        }
        
        case (actionTypes.SAVE_FAIL): {return {...state, loading: false}}
        
        default: return {...state};
    }
};

export default reducer;