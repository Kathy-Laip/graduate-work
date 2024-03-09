import React from "react";
import close from '../pictures/Close.svg'

export const CreateNewProject: React.FC = () => {
    return(
        <div id="createProject">
            <div className="blockQuestions">
                <div className='closeCreate'>
                    <h1 className="h1">Создание нового проекта</h1>
                    <img src={close} id='close' onClick={() => {document.getElementById('createProject')!.style.display = 'none'}}/>
                </div>
                <span className="mrTB1">Тема проекта:</span>
                <input id='themeProject' ></input>
                <span className="mrTB1">Тип учебного заведения</span>
                <select className="shadowBlack">
                    <option value={''}>Выберите тип учебного заведения</option>
                    <option value={'univ'}>Университет</option>
                    <option value={'school'}>Школа</option>
                </select>
                <button className="btn1 btnLightGreen"><span>Создать</span></button>
            </div>
        </div>
    )
}