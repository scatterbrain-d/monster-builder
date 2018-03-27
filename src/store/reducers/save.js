import * as actionTypes from "../actions/actionTypes";

const initialState = {
    monsters: [],
    loading: false,
    saved: false,
    monsterId: null,
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case (actionTypes.ASYNC_START): {return {...state, loading: true}}
        
        case (actionTypes.ASYNC_FAIL): {return {...state, loading: false}}
        
        case (actionTypes.SAVE_SUCCESS): {
            const newMonster = {...action.monster, id: action.id};
            return {...state, monsters: state.monsters.concat(newMonster), loading: false, saved: true};
        }
        
        case (actionTypes.LOAD_MONSTER_ID): {return {...state, monsterId: action.monsterId}}
        
        case (actionTypes.FETCH_MONSTERS_SUCCESS): {
            return {...state, monsters: action.monsters, loading: false}}
            
        case (actionTypes.DELETE_SUCCESS): {return{...state, loading:false}}
        
        default: return {...state};
    }
};

export default reducer;