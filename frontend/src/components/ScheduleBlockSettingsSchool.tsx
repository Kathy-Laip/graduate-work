import React, {useState} from "react";
import close from '../pictures/Close.svg'

type SchSetts = {
    onSettingsFalse: Function
}

export const ScheduleBlockSettingsSchool: React.FC<SchSetts> = (props) => {
    const [count, setCount] = useState<number>(1)
    const [courseBlocks, setCourseBlocks] = useState<JSX.Element[]>([]);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.id === 'count'){
            setCount(Number(event.target.value))
            // courseBlocks = []
            const newCourseBlocks = [];
            for(let i = 1; i <= Number(count); i++){
                newCourseBlocks.push(
                    <div key={i} className="datePeriod">
                        <span>{i}</span>
                        <form method="post" encType="multipart/form-data">
                            <label className="input-file">
                                <input type="file" name={`file-${i}`}/>		
                                <span>Выберите файл</span>
                            </label>
                        </form>
                    </div>
                );
            }
            setCourseBlocks(newCourseBlocks);
        }
    }

    return (
        <div id="blockWithCloseSett">
            <div id='settings'>
                <div className='closeCreate'>
                    <h1 className="h1">Настройки расписания</h1>
                    <img src={close} id='close' onClick={() => props.onSettingsFalse()}/>
                </div>
                <div className="scrolls">
                    <select className="shadowBlack" id='selectPeriod'
                    >
                        <option value={''}>Выберите семестр</option>
                        <option value={'1'}>1</option>
                        <option value={'2'}>2</option>
                    </select>
                    <span className="mrTB1">Академический час:</span>
                    <select className="shadowBlack" id='selectTypeEdit'
                    >
                        <option value={'40'}>40</option>
                        <option value={'45'}>45</option>
                        <option value={'50'}>50</option>
                        <option value={'55'}>55</option>
                        <option value={'60'}>60</option>
                        <option value={'65'}>65</option>
                        <option value={'70'}>70</option>
                        <option value={'75'}>75</option>
                        <option value={'80'}>80</option>
                    </select>
                    <span className="mrTB1">График работы заведения:</span>
                    {/* <input type="file"  id="avatar"  accept=".xlsx"/> */}
                    <form method="post" encType="multipart/form-data">
                    	<label className="input-file">
                    	   	<span className="input-file-text shadowBlack"></span>
                    	   	<input type="file" name="file" accept=".xlsx"/>        
                     	   	<span className="input-file-btn">Выберите файл</span>
                     	</label>
                    </form>
                    <span className="mrTB1">График работы аудиторий:</span>
                    {/* <input type="file"  id="avatar"  accept=".xlsx"/> */}
                    <form method="post" encType="multipart/form-data">
                    	<label className="input-file">
                    	   	<span className="input-file-text shadowBlack"></span>
                    	   	<input type="file" name="file" accept=".xlsx"/>        
                     	   	<span className="input-file-btn">Выберите файл</span>
                     	</label>
                    </form>
                    <div className="datePeriod">
                        <span>Начало периода</span>
                        <input type='date'/>
                    </div>
                    <div className="datePeriod">
                        <span>Конец периода</span>
                        <input type='date'/>
                    </div>
                    <div className="datePeriod">
                        <span>Кол-во курсов</span>
                        <input type='number' min={1} id='count' value={count} onChange={handleChange}></input>
                    </div>
                    <div id='courses'>
                        {courseBlocks}
                    </div>
                    <div className="onebtn">
                        <button className="btn1 btnYellow"><span>Сохранить</span></button>
                    </div>
                </div>
            </div>
        </div>
    )
}