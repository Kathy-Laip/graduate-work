import React, {useState} from "react";
type Dir = {
    number: number,
    arr: Array<Array<Array<string>>>,
    add: Function
}

export const Direction: React.FC<Dir> = (props) => {
    const [curNum, setCurNum] = useState(props.number)

    const change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.add(props.number, event.target.value)
    }


    return (
        <div className="datePeriod">
           <select className="shadowBlack" onChange={change}>
                <option value={''}>Выберите направление</option>
                {props.arr.map((el, ind) => {
                    let set = [...new Set(el.map(el => el[0]))]
                    return set.map(el => (<option value={`${ind + 1} ${el}`}>{ind + 1} курс, {el}</option>))
                    }
                )}
           </select>
        </div>
    )
}