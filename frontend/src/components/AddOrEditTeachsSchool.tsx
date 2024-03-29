import React from "react";
import close from '../pictures/Close.svg'

type AddType ={
    deleteTeachs: Function
}

export const AddOrEditTeachsSchool: React.FC<AddType> = (props) => {
    return (
        <div id="blockWithCloseAddTeachs">
            <div id='blockAddOrEdit'>
                <div className='closeCreate'>
                    <h1 className="h1">Добавление</h1>
                    <img src={close} id='close' onClick={() => props.deleteTeachs()}/>
                </div>
                <span id='h1'>Название:</span>
                <input type="text" placeholder="Введите название раздела"/>

                <form method="post" encType="multipart/form-data">
                    	<label className="input-file">
                    	   	<span className="input-file-text shadowBlack"></span>
                    	   	<input type="file" name="file" accept=".xlsx"/>        
                     	   	<span className="input-file-btn"><span>Выберите файл</span></span>
                     	</label>
                </form>
                <div className="onebtn">
                        <button className="btn1 btnYellow"><span>Создать</span></button>
                </div>
            </div>
        </div>
    )
}