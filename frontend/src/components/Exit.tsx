import React from "react";

export const Exit: React.FC = () => {
    return (
        <div className="mainScreen">
            <div className="divExitOrSignUp bdR5 shadowGreen">
                <h1 className="h1">Вход</h1>
                <input type='login' placeholder="Логин"/>
                <input type='password' placeholder="Пароль"/>
                <span className="underSpan">Регистрация</span>
                <button className="btn1 bdR10"><h1 className="h1">Войти</h1></button>
            </div>
        </div>
    )
} 