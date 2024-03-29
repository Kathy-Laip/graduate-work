import React from "react";
import {User} from "../architecture/User"

type MenuPlan = {
    user: User,
    addPlan: Function,
    editPlan: Function 
}

export const MenuPlanSchool: React.FC<MenuPlan> = (props) => {
    return (
        <div className="planMenu">
            <button className="btn1 btnBlue" onClick={() => props.addPlan()}><span>Добавить параллель</span></button>
            <button className="btn1 btnOrange" onClick={() => props.editPlan()}><span>Изменить или удалить параллель</span></button>
        </div>
    )
}