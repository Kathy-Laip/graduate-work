import React from "react";
import close from '../pictures/Close.svg'

type AddType ={
    deletePlan: Function
}

export const AddOrEditPlansSchool: React.FC<AddType> = (props) => {
    return (
        <div id="blockWithCloseAddPlan">
            <div id='blockAddOrEdit'>
                <div className='closeCreate'>
                    <h1 className="h1">Добавление параллели</h1>
                    <img src={close} id='close' onClick={() => props.deletePlan()}/>
                </div>
                <select className="shadowBlack" id='selectAddPlan'
                // onChange={handleChange}
                >
                    <option value={''}>Выберите поток</option>
                    <option value={'1'}>1</option>
                    <option value={'2'}>2</option>
                    <option value={'3'}>3</option>
                    <option value={'4'}>4</option>
                    <option value={'5'}>5</option>
                    <option value={'6'}>6</option>
                    <option value={'7'}>7</option>
                    <option value={'8'}>8</option>
                    <option value={'9'}>9</option>
                    <option value={'10'}>10</option>
                    <option value={'11'}>11</option>
                </select>
                <select className="shadowBlack" id='selectAddPlan'
                // onChange={handleChange}
                >
                    <option value={''}>Выберите класс</option>
                    <option value={'А'}>А</option>
                    <option value={'Б'}>Б</option>
                    <option value={'В'}>В</option>
                    <option value={'Г'}>Г</option>
                </select>
                <form method="post" encType="multipart/form-data">
                    	<label className="input-file">
                    	   	<span className="input-file-text shadowBlack"></span>
                    	   	<input type="file" name="file" accept=".xlsx"/>        
                     	   	<span className="input-file-btn"><span>Выберите файл</span></span>
                     	</label>
                </form>
                <div className="onebtn">
                        <button className="btn1 btnYellow"><span>Добавить</span></button>
                </div>
            </div>
        </div>
    )
}