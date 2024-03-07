import React, { useState } from "react";
import { Circle } from "../components/Circle";
import { circles } from "../constants/const";
import {Link} from 'react-router-dom';

type Exits = {
    flag: boolean,
    change: Function
}

export const Exit: React.FC<Exits> = (props) => {
    const flag = props.flag
    return (
        <div className="mainScreen">
            {props.flag ? (
                            <div className="divExitOrSignUp bdR5 shadowGreen">
                            {circles.map(el => {
                                return (
                                    <Circle circle={el}/>
                                )
                            })}
                            <h1 className="h1">Вход</h1>
                            <input type='login' placeholder="Логин"/>
                            <input type='password' placeholder="Пароль"/>
                            <span className="underSpan" onClick={() => props.change()}>Регистрация</span>
                            <button className="btn1 btnGreen bdR10"><Link to='/workBook'><h1 className="h1">Войти</h1></Link></button>
            
                        </div>
            ) : (
                <div className="divExitOrSignUp bdR5 shadowGreen">
                {circles.map(el => {
                    return (
                        <Circle circle={el}/>
                    )
                })}
                <h1 className="h1">Регистрация</h1>
                <input type='login' placeholder="Электронная почта"/>
                <span className="thinkPassowrd">Придумайте пароль:</span>
                <input type='password' placeholder="Пароль"/>
                <input type='password' placeholder="Повторите пароль"/>
                <span className="underSpan"  onClick={() => props.change()}>Войти</span>
                <button className="btn1 btnGreen bdR10"><h1 className="h1">Зарегистрироваться</h1></button>
            </div>
            )}
        </div>
    )
} 