import React, {useState} from "react";
type Gr = {
    number: number,
    arr: Array<string>,
    add: Function
}

export const Groups: React.FC<Gr> = (props) => {
    const [curNum, setCurNum] = useState(props.number)

    const change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.add(props.number, event.target.value)
    }


    return (
        <div className="datePeriod">
           <select className="shadowBlack" onChange={change}>
                <option value={''}>Выберите группу</option>
                {props.arr.map(el => (<option value={el[1]}>{el[1]}</option>))}
           </select>
        </div>
    )
}