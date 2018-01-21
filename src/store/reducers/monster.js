import * as actionTypes from "../actions/actionTypes";

import {create} from "./formulas/createMonster.js";

//img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR40uexBQH3kdPstpwjgj1dzVDQOwzmt82-VJD7qQWPTQb1X42L5A",

const initialState = {
        stat: {
            level:1,
            threat:"Standard",
            role:"Soldier",
            size:"Medium",
            name:"",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR40uexBQH3kdPstpwjgj1dzVDQOwzmt82-VJD7qQWPTQb1X42L5A",
            keywords:"",
            hp:25,
            ac:16,
            fort:13,
            ref:13,
            will:13,
            speed:"walk 6",
            initiative:1,
            resist:"",
            senses:"none",
            skills:"",
            languages:"",
            alignment:"neutral",
            str:10,
            con:10,
            dex:10,
            int:10,
            wis:10,
            cha:10,
            save:"+0",
            ap:0
        },
        damage:9,
        attackAc:6,
        attackNad:4,
        powers: []
    };
    
const reducer = (state = initialState, action) => {
    switch(action.type) {
        
        case (actionTypes.UPDATE_STAT): {return {...state, stat: {...state.stat, [action.name]: action.val}}}
        
        case (actionTypes.CREATE_MONSTER): {return create(state)}
        
        case (actionTypes.LOAD_MONSTER): {
            return {...state, ...action.monster}}
        
        case (actionTypes.PUSH_POWER): {
            const newState = {...state, powers: [...state.powers]};
            if (state.powers.length === action.index)
                newState.powers.push(action.object);
            else
                newState.powers.splice(action.index, 1, action.object);
            return newState;
        }
        
        case (actionTypes.DELETE_POWER): {
            const newState = {...state, powers: [...state.powers]};
            newState.powers.splice(action.index, 1);
            return newState;
        }
        
        default:
             return state;
    }
};

export default reducer;