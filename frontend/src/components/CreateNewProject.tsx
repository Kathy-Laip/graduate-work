import React from "react";

export const CreateNewProject: React.FC = () => {
    return(
        <div className="createProject">
            <div className="blockQuestions">
                <h1 className="h1">Создание нового проекта</h1>
                <span className="mrTB1">Тема проекта:</span>
                <input id='themeProject' className="shadowBlack"></input>
                <span className="mrTB1">Тип учебного заведения</span>
                <select>
                    <option value={''}>Выберите тип учебного завдения</option>
                    <option value={'univ'}>Университет</option>
                    <option value={'school'}>Школа</option>
                </select>
                <button className="btn1 btnLightGreen">Создать</button>
            </div>
        </div>
    )
}