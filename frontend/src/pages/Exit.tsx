import React, { useState } from "react";
import { Circle } from "../components/Circle";
import { circles } from "../constants/const";
import {Link, useNavigate} from 'react-router-dom';
import {User} from '../architecture/User'

type Exits = {
    flag: boolean,
    change: Function
}

export const Exit: React.FC<Exits> = (props) => {
    const flag = props.flag
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()
    // history.push('/otherpage');

    const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.id === 'login'){
            setLogin(event.target.value)
        }
        if(event.target.id === 'password'){
            setPassword(event.target.value)
        }
    }

    const user = new User(login, password)

    const logIn = () => {
        let ans = user.logIn()
        console.log(ans)
        // console.log(answer)
        //         if(answer.otv === 'error_data') return 'error_data'
        //         else if(answer.otv === 'invalid_login') return 'invalid_login'
        //         else if(answer.otv === 'invalid_password') return 'invalid_password'
        //         else if(answer.otv === 'good') return 'good'
    }
    
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
                            <input type='login' id='login' placeholder="Логин" onChange={changeInput}/>
                            <input type='password' id='password' placeholder="Пароль" onChange={changeInput}/>
                            <div className="exitSignUnderLine"><span className="underSpan" onClick={() => props.change()}>Регистрация</span></div>
                            <button className="btn1 btnGreen bdR10" onClick={logIn}><h1 className="h1">Войти</h1></button>
            
                        </div>
            ) : (
                <div className="divExitOrSignUp bdR5 shadowGreen">
                {circles.map(el => {
                    return (
                        <Circle circle={el}/>
                    )
                })}
                <h1 className="h1">Регистрация</h1>
                <input type='login' id='login' placeholder="Электронная почта" onChange={changeInput}/>
                <span className="thinkPassowrd">Придумайте пароль:</span>
                <input type='password' placeholder="Пароль"/>
                <input type='password' id='password' placeholder="Повторите пароль" onChange={changeInput}/>
                <div className="exitSignUnderLine"><span className="underSpan"  onClick={() => props.change()}>Войти</span></div>
                <button className="btn1 btnGreen bdR10"><h1 className="h1">Зарегистрироваться</h1></button>
            </div>
            )}
        </div>
    )
} 