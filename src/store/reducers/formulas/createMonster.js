export const create = (state) => {
    let newAttackAc = state.stat.level + 5;
    let newAttackNad = state.stat.level + 3;
    let newDamage = state.stat.level + 8;
    let newHp = 16 + (state.stat.level * 9);
    let newAc = 15 + state.stat.level;
    let newFort = 12 + state.stat.level;
    let newRef = 12 + state.stat.level;
    let newWill = 12 + state.stat.level;
    let newInit = Math.floor(state.stat.level * 0.8);
    let newSave = "";
    let newAp = 0;
    let newStr = 10 + (1 + Math.floor(state.stat.level/10));
    let newCon = 10 + (1 + Math.floor(state.stat.level/10));
    let newDex = 10 + (1 + Math.floor(state.stat.level/10));
    let newInt = 10 + (1 + Math.floor(state.stat.level/10));
    let newWis = 10 + (1 + Math.floor(state.stat.level/10));
    let newCha = 10 + (1 + Math.floor(state.stat.level/10));
    
    switch(state.stat.role) {
        case("Soldier"): 
                newAttackAc += 2;
                newAttackNad += 2;
                newDamage = 1 + Math.floor(newDamage *0.75);
                newAc += 3;
                newRef += 1;
                newStr += (2 + Math.floor(state.stat.level/4));
                newCon += 2;
                newDex += 2;
                newCha += (2 + Math.floor(state.stat.level/4));
            break;
        case("Skirmisher"): 
                newAc += 1;
                newFort -= 1;
                newRef += 3;
                newInit = 1 + Math.floor(newInit*1.5);
                newStr += 2;
                newDex += (4 + Math.floor(state.stat.level/4));
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
                newStr += (4 + Math.floor(state.stat.level/4));
                newCon += (4 + Math.floor(state.stat.level/4));
                newDex -= 4;
                newInt -= 4;
            break;
        case("Artillery"):
                newHp = 1 + Math.floor(newHp * 0.75);
                newFort -= 1;
                newRef += 2;
                newWill += 1;
                newStr -= 2;
                newDex += (4 + Math.floor(state.stat.level/4));
                newInt += 2;
                newWis += 2;
                newCha += 2;
            break;
        case("Lurker"):
                newDamage = 1 + Math.floor(newDamage * 1.25);
                newHp = 1 + Math.floor(newHp * 0.75);
                newFort -= 2;
                newRef += 2;
                newInit = 1 + Math.floor(newInit*1.5);
                newStr += 2;
                newCon -=2;
                newDex += (4 + Math.floor(state.stat.level/4));
                newInt += (2 + Math.floor(state.stat.level/4));
            break;
        case("Controller"):
                newFort -= 2;
                newRef += 1;
                newWill+= 2;
                newCon -= 2;
                newInt += (4 + Math.floor(state.stat.level/4));
                newWis += (2 + Math.floor(state.stat.level/4));
                newCha += (2 + Math.floor(state.stat.level/4));
            break;
        default: 
                newAttackAc += 2;
                newAttackNad += 2;
                newDamage = 1 + Math.floor(newDamage *0.75);
                newAc += 3;
                newRef += 1;
            break;
    }
    switch (state.stat.threat) {
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
                newSave = "+2";
                newAp = 1;
            break;
        case("Solo"):
                newHp *= 5;
                newAc += 1;
                newFort += 1;
                newRef += 1;
                newWill += 1;
                newSave = "+5";
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