import React, {useState} from "react";
type Dir = {
    number: number,
    arr: Array<string>
}

export const Direction: React.FC<Dir> = (props) => {
    const [curNum, setCurNum] = useState(props.number)

    return (
        <div className="datePeriod">
           <select className="shadowBlack" >
                <option value={''}>Выберите направление</option>
                {props.arr.map(el => (
                    <option value={`${el}`}>{el}</option>
                ))}
           </select>
        </div>
    )
}