import React from "react";
import { User } from "../architecture/User";
import acc from '../pictures/Vector.svg'

type SideType = {
    login: string,
    user: User
}

export const SideBar: React.FC<SideType> = (props) => {
    console.log(props.user.openSchedules)
    return(
        <div className="sideBar">
            <img src={acc}/>
            <span>{props.login}</span>
            <div className="openWorks bdR5">
                <h3 className="h3">Рабочие вкладки:</h3>
                <div className="openWorksBlock">
                    {props.user.openSchedules ? (
                        props.user.openSchedules.map(el => (<div className="theme"><span>{el.name}</span></div>))
                    ): (<></>)}
                </div>
            </div>
        </div>
    )
}