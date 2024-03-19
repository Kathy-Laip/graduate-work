import React, { ClassType, useState } from "react";
import { Circle } from "../components/Circle";
import { circles } from "../constants/const";
import {Link, useNavigate} from 'react-router-dom';
import {User} from '../architecture/User'
import { CreateNewBlock } from "../components/CreateNewBlock";

type Exits = {
    flag: boolean,
    change: Function,
    user: User
}

export const Exit: React.FC<Exits> = (props) => {
    const flag = props.flag
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [mes, setMessage] = useState<string>('')
    const navigate = useNavigate()

    const switchBlock = (type:string) => {
        if(type === 'newMessage'){
            document.getElementById('blockWithClose')!.style.display = 'flex'
            document.getElementById('mesBloack')!.style.display = 'flex'
        }
    }

    const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.id === 'login'){
            props.user.login = event.target.value
            setLogin(event.target.value)
        }
        if(event.target.id === 'password'){
            props.user.password = event.target.value
            setPassword(event.target.value)
        }
    }


    const logIn = () => {
        if(!login || !password) {
            setMessage('Пустые логин или пароль, проверьте введенные данные!')
            switchBlock('newMessage')
            
        }
        else{
            let ans = props.user!.logIn()
            ans.then(answer => {
                    if(answer.otv === 'error_data') {
                        setMessage('Ошибка! Попробуйте войти через некоторое время!')
                        switchBlock('newMessage')
                    }
                    else if(answer.otv === 'invalid_login') {
                        setMessage('Ошибка ввода логина!')
                        switchBlock('newMessage')
                    }
                    else if(answer.otv === 'invalid_password') {
                        setMessage('Ошибка ввода пароля! Проверьте пароль на правильность!')
                        switchBlock('newMessage')
                    }
                    else if(answer.otv === 'good') {
                        navigate('/workBook')
                    }
            })
        }
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
                            <input type='login' autoComplete='new-password' id='login' placeholder="Логин" onChange={changeInput}/>
                            <input type='password' autoComplete='new-password' id='password' placeholder="Пароль" onChange={changeInput}/>
                            <div className="exitSignUnderLine"><span className="underSpan" onClick={() => props.change()}>Регистрация</span></div>
                            <button className="btn1 btnGreen bdR10" 
                            onClick={logIn}
                            ><h1 className="h1">Войти</h1></button>
            
                        </div>
            ) : (
                <div className="divExitOrSignUp bdR5 shadowGreen">
                {circles.map(el => {
                    return (
                        <Circle circle={el}/>
                    )
                })}
                <h1 className="h1">Регистрация</h1>
                <input type='login' autoComplete='new-password' id='login' placeholder="Электронная почта" onChange={changeInput}/>
                <span className="thinkPassowrd">Придумайте пароль:</span>
                <input type='password' autoComplete='new-password' placeholder="Пароль"/>
                <input type='password' autoComplete='new-password' id='password' placeholder="Повторите пароль" onChange={changeInput}/>
                <div className="exitSignUnderLine"><span className="underSpan"  onClick={() => props.change()}>Войти</span></div>
                <button className="btn1 btnGreen bdR10"><h1 className="h1">Зарегистрироваться</h1></button>
            </div>
            )}
            <CreateNewBlock mess={mes}/>
        </div>
    )
} 