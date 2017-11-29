const initialState = {
        level:1,
        threat:"",
        role:"",
        damage:0,
        stat: {
            name:"",
            keywords:"",
            hp:10,
            ac:10,
            fort:10,
            ref:10,
            will:10,
            speed:"6",
            initiative:10,
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

const reducer = (state = initialState, action) => {
    switch(action.type) {
        default:
             return state;
    }
};

export default reducer;