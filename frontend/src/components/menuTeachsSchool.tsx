import React from "react";
import {User} from "../architecture/User"

type MenuTeachs = {
    user: User,
    addTeachs: Function,
    editTeachs: Function
}

export const MenuTeachsSchool: React.FC<MenuTeachs> = (props) => {
    return (
        <div className="planMenu">
            <button className="btn1 btnBlue" onClick={() => props.addTeachs()}><span>Добавить</span></button>
            <button className="btn1 btnOrange" onClick={() => props.editTeachs()}><span>Изменить или удалить</span></button>
        </div>
    )
}