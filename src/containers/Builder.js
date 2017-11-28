import React, {Component} from "react";
import StatBox from "../components/StatBox";

class Builder extends Component {
    
    state = {
        stat: {
            name:"",
            keywords:"",
            level:1,
            role:"",
            threat:"",
            hp:10,
            ac:10,
            fort:10,
            ref:10,
            will:10,
            speed:"",
            initiative:10,
            resist:"",
            senses:"",
            skills:"",
            languages:"",
            alignment:"",
            str:10,
            con:10,
            dex:10,
            int:10,
            wis:10,
            cha:10,
            save:"",
            ap:0
        }
    }
    
    render() {
        
        const statArray = [];
        
        for(let entry in this.state.stat) {
            statArray.push({
                name: entry,
                value: this.state.stat[entry]
            });
        }
        
        
        return (
            <div id="statBlock">
                {statArray.map(stat => (
                    <StatBox
                        key={stat.name}
                        name={stat.name}
                        value={stat.value}
                    />
                ))}
            </div>
        );    
    }
}

export default Builder;