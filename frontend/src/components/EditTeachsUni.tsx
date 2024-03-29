import React from "react";
import close from '../pictures/Close.svg'

type AddType ={
    deleteTeachs: Function
}

export const EdiTeachsUni: React.FC<AddType> = (props) => {
    return (
        <div id="blockWithCloseAddTeachs">
            <div id='blockAddOrEdit'>
                <div className='closeCreate'>
                    <h1 className="h1">Изменение</h1>
                    <img src={close} id='close' onClick={() => props.deleteTeachs()}/>
                </div>
                <select className="shadowBlack" id='selectAddPlan'
                // onChange={handleChange}
                >
                    <option value={''}>Выберите кафедру</option>
                    <option value={'КСАИТ'}>КСАИТ</option>
                </select>
                <span id='h1'>Название:</span>
                <input type="text" placeholder="Введите название кафедры"/>
                <form method="post" encType="multipart/form-data">
                    	<label className="input-file">
                    	   	<span className="input-file-text shadowBlack"></span>
                    	   	<input type="file" name="file" accept=".xlsx"/>        
                     	   	<span className="input-file-btn"><span>Выберите файл</span></span>
                     	</label>
                </form>
                <div className="twobtnInBlock">
                    <button className="btn1 bdR5 btnPink"><span>Удалить кафедру</span></button>
                    <button className="btn1 bdR5 btnYellow"><span>Изменить</span></button>
                </div>
            </div>
        </div>
    )
}