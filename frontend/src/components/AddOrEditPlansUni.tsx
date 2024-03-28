import React from "react";
import close from '../pictures/Close.svg'

type AddType ={
    deletePlan: Function
}

export const AddOrEditPlansUni: React.FC<AddType> = (props) => {
    return (
        <div id="blockWithCloseAddPlan">
            <div id='blockAddOrEdit'>
                <div className='closeCreate'>
                    <h1 className="h1">Добавление направления</h1>
                    <img src={close} id='close' onClick={() => props.deletePlan()}/>
                </div>
                <select className="shadowBlack" id='selectAddPlan'
                // onChange={handleChange}
                >
                    <option value={''}>Выберите курс</option>
                    <option value={'1'}>1</option>
                    <option value={'2'}>2</option>
                    <option value={'3'}>3</option>
                    <option value={'4'}>4</option>
                </select>
                <select className="shadowBlack" id='selectAddPlan'
                // onChange={handleChange}
                >
                    <option value={''}>Выберите направление</option>
                    <option value={'ФИИТ'}>ФИИТ</option>
                    <option value={'ПМИ'}>ПМИ</option>
                    <option value={'ИСТ'}>ИСТ</option>
                    <option value={'БИ'}>БИ</option>
                </select>
                <form method="post" encType="multipart/form-data">
                    	<label className="input-file">
                    	   	<span className="input-file-text shadowBlack"></span>
                    	   	<input type="file" name="file" accept=".xlsx"/>        
                     	   	<span className="input-file-btn"><span>Выберите файл</span></span>
                     	</label>
                </form>
                <div className="onebtn">
                        <button className="btn1 btnYellow"><span>Сохранить</span></button>
                </div>
            </div>
        </div>
    )
}