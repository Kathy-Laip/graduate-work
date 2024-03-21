import React, { ClassType, useState } from "react";
import { Circle } from "../components/Circle";
import { circles, reEmail, rePas , switchBlock} from "../constants/const";
import {Link, useNavigate} from 'react-router-dom';
import {User} from '../architecture/User'
import { Message } from "../components/Message";

type Exits = {
    flag: boolean,
    change: Function,
    user: User
}

export const Exit: React.FC<Exits> = (props) => {
    const flag = props.flag

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [oldPassword, setOldPassword] = useState<string>('')

    const [mes, setMessage] = useState<string>('')
    const navigate = useNavigate()

    const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.id === 'login'){
            props.user.login = event.target.value
            setLogin(event.target.value)
        }
        if(event.target.id === 'password'){
            props.user.password = event.target.value
            setPassword(event.target.value)
        }
        if(event.target.id === 'oldPassword'){
            setOldPassword(event.target.value)
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
                        props.user.getListOfSchedules()
                        navigate('/workBook')
                    }
            })
        }
    }

    const newUser = () => {
        if(!reEmail.test(login)) {
            setMessage('Некорректный email, проверьте правильность написания!')
            switchBlock('newMessage')
        } 
        else if(!rePas.test(oldPassword)){
            setMessage('Некорректный пароль, пароль должен быть не меньше 8 символов, содержать хотя бы одну заглавную букву, специальный символ (!@#$&*) и цифру!')
            switchBlock('newMessage')
        } else if(oldPassword !== password){
            setMessage('Пароли не совпадают! Проверьте еще раз и введите праивльный пароль!')
            switchBlock('newMessage')
        } else {
            let ans = props.user.signIn()
            console.log(ans)
            ans.then(answer => {
                if(!answer.otv){
                    setMessage('Что-то пошло не так! Попробуйте снова позднее')
                    switchBlock('newMessage')
                }
                else if(answer.otv === 'error_data'){
                    setMessage('Ошибка! Попробуйте войти через некоторое время!')
                    switchBlock('newMessage')
                } else if(answer.otv === 'has_login'){
                    setMessage('Такой пользователь уже существует!')
                    switchBlock('newMessage')
                } else if(answer.otv === 'OK'){
                    setMessage('Вы успешно зарегестрировались!')
                    switchBlock('newMessage')
                    setLogin('')
                    setPassword('')
                    props.change()
                }
            })
            ans.catch(() => {
                setMessage('Что-то пошло не так! Попробуйте снова позднее')
                switchBlock('newMessage')
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
                <input type='password' autoComplete='new-password' id='oldPassword' placeholder="Пароль" onChange={changeInput}/>
                <input type='password' autoComplete='new-password' id='password' placeholder="Повторите пароль" onChange={changeInput}/>
                <div className="exitSignUnderLine"><span className="underSpan"  onClick={() => props.change()}>Войти</span></div>
                <button className="btn1 btnGreen bdR10"
                onClick={newUser}
                ><h1 className="h1">Зарегистрироваться</h1></button>
            </div>
            )}
            <Message mess={mes}/>
        </div>
    )
} 