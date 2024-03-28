import React from "react";
import {User} from '../architecture/User'

type MenuPlan = {
    user: User,
    addPlan: Function,
    editPlan: Function 
}

export const MenuPlanUni: React.FC<MenuPlan> = (props) => {
    return (
        <div className="planMenu">
            <button className="btn1 btnBlue" onClick={() => props.addPlan()}><span>Добавить направление</span></button>
            <button className="btn1 btnOrange" onClick={() => props.editPlan()}><span>Изменить или удалить направление</span></button>
        </div>
    )
}