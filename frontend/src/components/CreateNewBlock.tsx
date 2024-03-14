import React from "react";
import close from '../pictures/Close.svg'

export const CreateNewBlock: React.FC = () => {
    return(
        <div id="blockWithClose">
            <div id="addProject">
                <div className='closeCreate'>
                    <h1 className="h1">Создание нового проекта</h1>
                    <img src={close} id='close' onClick={() => {
                        document.getElementById('blockWithClose')!.style.display = 'none'
                        document.getElementById('addProject')!.style.display = 'none'
                        }}/>
                </div>
                <span className="mrTB1">Тема проекта:</span>
                <input id='themeProject' ></input>
                <span className="mrTB1">Тип учебного заведения</span>
                <select className="shadowBlack">
                    <option value={''}>Выберите тип учебного заведения</option>
                    <option value={'univ'}>Университет</option>
                    <option value={'school'}>Школа</option>
                </select>
                <div className="onebtn">
                    <button className="btn1 btnLightGreen"><span>Создать</span></button>
                </div>
            </div>
            <div id="editProject">
                <div className='closeCreate'>
                    <h1 className="h1">Редактирование</h1>
                    <img src={close} id='close' onClick={() => {
                        document.getElementById('blockWithClose')!.style.display = 'none'
                        document.getElementById('editProject')!.style.display = 'none'
                        }}/>
                </div>
                <span className="mrTB1">Тема проекта:</span>
                <input id='themeProject'></input>
                <span className="mrTB1">Тип учебного заведения</span>
                <select className="shadowBlack">
                    <option value={''}>Выберите тип учебного заведения</option>
                    <option value={'univ'}>Университет</option>
                    <option value={'school'}>Школа</option>
                </select>
                <div className="twobtnInBlock">
                    <button className="btn1 bdR5 btnPink"><span>Удалить проект</span></button>
                    <button className="btn1 bdR5 btnYellow"><span>Изменить</span></button>
                </div>
            </div>
        </div>
    )
}