import * as actionTypes from "./actions";

const initialState = {
        level:1,
        threat:"",
        role:"",
        leader:false,
        damage:9,
        attackAc:6,
        attackNad:4,
        powerCount:0,
        powers: {},
        stat: {
            name:"",
            keywords:"",
            hp:25,
            ac:16,
            fort:13,
            ref:13,
            will:13,
            speed:6,
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
            save:"",
            ap:0
        }
    };
    
const create = (state) => {
    let newAttackAc = state.level + 5;
    let newAttackNad = state.level + 3;
    let newDamage = state.level + 8;
    let newHp = 16 + (state.level * 9);
    let newAc = 15 + state.level;
    let newFort = 12 + state.level;
    let newRef = 12 + state.level;
    let newWill = 12 + state.level;
    let newInit = Math.floor(state.level * 0.8);
    let newSpeed = 6;
    let newSave = "";
    let newAp = 0;
    
    switch(state.role) {
        case("Soldier"): 
                newAttackAc += 2;
                newAttackNad += 2;
                newDamage = 1 + Math.floor(newDamage *0.75);
                newAc += 3;
                newRef += 1;
            break;
        case("Skirmisher"): 
                newAc += 1;
                newFort -= 1;
                newRef += 3;
                newSpeed += 1 + Math.floor(state.level/10);
                newInit = 1 + Math.floor(newInit*1.5);
            break;
        case("Brute"):
                newAttackAc -= 1;
                newAttackNad -= 1;
                newDamage = 1 + Math.floor(newDamage * 1.25);
                newHp = 1 + Math.floor(newHp * 1.25);
                newAc -= 2;
                newFort += 4;
                newRef -= 2;
                newWill -= 1;
                newInit = 1 + Math.floor(newInit * 0.75);
            break;
        case("Artillery"):
                newHp = 1 + Math.floor(newHp * 0.75);
                newFort -= 1;
                newRef += 2;
                newWill += 1;
            break;
        case("Lurker"):
                newDamage = 1 + Math.floor(newDamage * 1.25);
                newHp = 1 + Math.floor(newHp * 0.75);
                newFort -= 2;
                newRef += 2;
                newSpeed += 1 + Math.floor(state.level/10);
                newInit = 1 + Math.floor(newInit*1.5);
            break;
        case("Controller"):
                newFort -= 2;
                newRef += 1;
                newWill+= 2;
            break;
        default: 
                newAttackAc += 2;
                newAttackNad += 2;
                newDamage = 1 + Math.floor(newDamage *0.75);
                newAc += 3;
                newRef += 1;
            break;
    }
    switch (state.threat) {
        case("Minion"):
                newHp = 1;
            break;
        case("Standard"): break;
            
        case("Elite"):
                newHp *= 2;
                newAc += 1;
                newFort += 1;
                newRef += 1;
                newWill += 1;
                newSave = "+2 saves";
                newAp = 1;
            break;
        case("Solo"):
                newHp *= 5;
                newAc += 1;
                newFort += 1;
                newRef += 1;
                newWill += 1;
                newSave = "+5 saves";
                newAp = 2;
            break;
        default: break;
    }
    
    return {
        ...state,
        damage: newDamage,
        attackAc: newAttackAc,
        attackNad: newAttackNad,
        stat: {
            ...state.stat,
            hp: newHp,
            ac: newAc,
            fort: newFort,
            ref: newRef,
            will: newWill,
            initiative: newInit,
            speed: newSpeed,
            save: newSave,
            ap: newAp
        }
        
    };
};
    

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case (actionTypes.SET_NAME): {return {...state, stat: {...state.stat, name: action.val}}}
        
        case (actionTypes.SET_LEVEL): {return {...state, level: action.val}}
        
        case (actionTypes.SET_THREAT): {return {...state, threat: action.val}}
        
        case (actionTypes.SET_ROLE): {return {...state, role: action.val}}
        
        case (actionTypes.SET_LEADER): {return {...state, leader: action.val}}
        
        case (actionTypes.CREATE_MONSTER): {return create(state)}
        
        case (actionTypes.UPDATE_STAT): {return {...state, stat: {...state.stat, [action.name]: action.val}}}
        
        case (actionTypes.ADD_POWER): {console.log(state); return {...state,  powers: {...state.powers}}}
        
        case (actionTypes.PUSH_POWER): {
            const newState = {...state, powerCount: state.powerCount + 1, powers: {...state.powers}}
            newState.powers[state.powerCount] = {...action.object};
            console.log(newState.powers);
            console.log(newState);
            // newState.powers.push(...action.object);
            // console.log(newState);
            return newState;
        }
        
        // case (actionTypes.SET_POWER_NAME): {console.log(action.idx, action.val);
        //     const newState = {...state, powers: [...state.powers]};
        //     newState.powers[action.idx].name = action.val;
        //     return newState;
        // }
        default:
             return state;
    }
};

export default reducer;