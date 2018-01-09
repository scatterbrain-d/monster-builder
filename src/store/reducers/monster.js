import * as actionTypes from "../actions/actionTypes";

//img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR40uexBQH3kdPstpwjgj1dzVDQOwzmt82-VJD7qQWPTQb1X42L5A",

const initialState = {
        level:1,
        threat:"Standard",
        role:"Soldier",
        size:"Medium",
        damage:9,
        attackAc:6,
        attackNad:4,
        powerCount:0,
        powers: {},
        stat: {
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
    let newStr = 10 + (1 + Math.floor(state.level/10));
    let newCon = 10 + (1 + Math.floor(state.level/10));
    let newDex = 10 + (1 + Math.floor(state.level/10));
    let newInt = 10 + (1 + Math.floor(state.level/10));
    let newWis = 10 + (1 + Math.floor(state.level/10));
    let newCha = 10 + (1 + Math.floor(state.level/10));
    
    switch(state.role) {
        case("Soldier"): 
                newAttackAc += 2;
                newAttackNad += 2;
                newDamage = 1 + Math.floor(newDamage *0.75);
                newAc += 3;
                newRef += 1;
                newStr += (2 + Math.floor(state.level/4));
                newCon += 2;
                newDex += 2;
                newCha += (2 + Math.floor(state.level/4));
            break;
        case("Skirmisher"): 
                newAc += 1;
                newFort -= 1;
                newRef += 3;
                newSpeed += 1 + Math.floor(state.level/10);
                newInit = 1 + Math.floor(newInit*1.5);
                newStr += 2;
                newDex += (4 + Math.floor(state.level/4));
                newInt += 2;
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
                newStr += (4 + Math.floor(state.level/4));
                newCon += (4 + Math.floor(state.level/4));
                newDex -= 4;
                newInt -= 4;
            break;
        case("Artillery"):
                newHp = 1 + Math.floor(newHp * 0.75);
                newFort -= 1;
                newRef += 2;
                newWill += 1;
                newStr -= 2;
                newDex += (4 + Math.floor(state.level/4));
                newInt += 2;
                newWis += 2;
                newCha += 2;
            break;
        case("Lurker"):
                newDamage = 1 + Math.floor(newDamage * 1.25);
                newHp = 1 + Math.floor(newHp * 0.75);
                newFort -= 2;
                newRef += 2;
                newSpeed += 1 + Math.floor(state.level/10);
                newInit = 1 + Math.floor(newInit*1.5);
                newStr += 2;
                newCon -=2;
                newDex += (4 + Math.floor(state.level/4));
                newInt += (2 + Math.floor(state.level/4));
            break;
        case("Controller"):
                newFort -= 2;
                newRef += 1;
                newWill+= 2;
                newCon -= 2;
                newInt += (4 + Math.floor(state.level/4));
                newWis += (2 + Math.floor(state.level/4));
                newCha += (2 + Math.floor(state.level/4));
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
            ap: newAp,
            str: newStr,
            con: newCon,
            dex: newDex,
            int: newInt,
            wis: newWis,
            cha: newCha
        }
        
    };
};
    

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case (actionTypes.SET_NAME): {return {...state, stat: {...state.stat, name: action.val}}}
        
        case (actionTypes.SET_LEVEL): {return {...state, level: action.val}}
        
        case (actionTypes.SET_THREAT): {return {...state, threat: action.val}}
        
        case (actionTypes.SET_ROLE): {return {...state, role: action.val}}
        
        case (actionTypes.SET_SIZE): {return {...state, size: action.val}}
        
        case (actionTypes.SET_BASE_STAT): {return {...state, [action.name]: action.val}}
        
        case (actionTypes.CREATE_MONSTER): {return create(state)}
        
        case (actionTypes.UPDATE_STAT): {return {...state, stat: {...state.stat, [action.name]: action.val}}}
        
        case (actionTypes.ADD_POWER): {console.log(state); return {...state,  powers: {...state.powers}}}
        
        case (actionTypes.PUSH_POWER): {
            const newState = {...state, powerCount: state.powerCount + 1, powers: {...state.powers}};
            newState.powers[state.powerCount] = {...action.object};
            return newState;
        }
        
        case (actionTypes.LOAD_MONSTER): {
            return {...state, ...action.monster}}
        
        default:
             return state;
    }
};

export default reducer;