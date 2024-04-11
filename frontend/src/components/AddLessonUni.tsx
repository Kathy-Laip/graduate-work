import React, {useState} from 'react'
import close from '../pictures/Close.svg'
import { Direction } from './Direction'

type AddLess = {
    close: Function
}

export const AddLesonUni: React.FC<AddLess> = (props) => {
    const [typeLect, setTypeLect] = useState(false)
    const [typePractic, setTypePractic] = useState(false)
    const [typePracticLab, setTypePracticLab] = useState(false)
    const [typeExam, setTypeExam] = useState(false)
    const [typeMinExam, setMinExam] = useState(false)


    const [count, setCount] = useState<number>()
    const [dir, setdir] = useState<number[]>([]);
    const [dirs, setdirs] = useState<any[]>([])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        if(event.target.id === 'count'){
            setCount(Number(event.target.value))
            const newdir = Array.from({length: Number(event.target.value)}, (_, ind) => ind);
            const dirses = Array.from({length: Number(event.target.value)}, () => 0)
            setdirs(newdir)
            setdir(dirses);
        }
        else if(event.target.id === 'selectAddLesson'){
            if(event.target.value === 'lect'){
                setTypeLect(true)
                setTypePractic(false)
                setTypePracticLab(false)
                setTypeExam(false)
                setMinExam(false)
            }else if(event.target.value === 'practic'){
                setTypeLect(false)
                setTypePractic(true)
                setTypePracticLab(false)
                setTypeExam(false)
                setMinExam(false)
            }else if(event.target.value === 'lab'){
                setTypeLect(false)
                setTypePractic(false)
                setTypePracticLab(true)
                setTypeExam(false)
                setMinExam(false)
            }else if(event.target.value === 'exam'){
                setTypeLect(false)
                setTypePractic(false)
                setTypePracticLab(false)
                setTypeExam(true)
                setMinExam(false)
            }else if(event.target.value === 'min_exam'){
                setTypeLect(false)
                setTypePractic(false)
                setTypePracticLab(false)
                setTypeExam(false)
                setMinExam(true)
            }else{
                setTypeLect(false)
                setTypePractic(false)
                setTypePracticLab(false)
                setTypeExam(false)
                setMinExam(false)
            }
        }
    }

    return (
        <div id='blockWithCloseAddLessonUni'>
            <div id='blockAddLessUni'>
                <div className='closeCreate'>
                            <h1 className="h1">Добавление занятия</h1>
                            <img src={close} id='close' onClick={() => props.close()}/>
                </div>
                <div className="scrolls">
                    <select className="shadowBlack" id='selectAddLesson'
                    onChange={handleChange}
                    >
                        <option value={''}>Выберите тип занятия</option>
                        <option value={'lect'}>лекция</option>
                        <option value={'practic'}>практика</option>
                        <option value={'lab'}>лабораторная практика</option>
                        <option value={'exam'}>экзамен</option>
                        <option value={'min_exam'}>зачет</option>
                    </select>
                    {typeLect && (
                        <>
                            <div className="datePeriod">
                                <span>Кол-во направлений на занятии</span>
                                <input type='number' min={0} id='count' value={count} onChange={handleChange}></input>
                            </div>
                            {dir.map(el => (
                                <>
                                <Direction number={el} arr={['ПИ', 'ФИИТ', 'ИБ']}/>
                                </>
                            ))}
                            <select className="shadowBlack" id='selectPeriodLesson'
                            onChange={handleChange}
                            >
                                <option value={''}>Выберите периодичность</option>
                                <option value={''}>2 раза в неделю</option>
                                <option value={''}>каждую неделю</option>
                                <option value={''}>через 2 недели</option>
                                <option value={''}>подобрать автоматически</option>
                            </select>
                            <select className="shadowBlack" id='selectSubLesson'
                            onChange={handleChange}
                            >
                                <option value={''}>Выберите предмет</option>
                                <option value={''}>Алгебра и геометрия</option>
                            </select>
                            <div className="onebtn">
                                <button className="btn1 btnYellow"><span>Добавить</span></button>
                            </div>
                        </>
                    )}
                    {typePractic && (
                        <>
                            <select className="shadowBlack" id='selectClassLesson'
                            onChange={handleChange}
                            >
                                <option value={''}>Выберите группу</option>
                                <option value={''}>09-032</option>
                            </select>
                            <select className="shadowBlack" id='selectPeriodLesson'
                            onChange={handleChange}
                            >
                                <option value={''}>Выберите периодичность</option>
                                <option value={''}>2 раза в неделю</option>
                                <option value={''}>каждую неделю</option>
                                <option value={''}>через 2 недели</option>
                                <option value={''}>подобрать автоматически</option>
                            </select>
                            <select className="shadowBlack" id='selectSubLesson'
                            onChange={handleChange}
                            >
                                <option value={''}>Выберите предмет</option>
                                <option value={''}>Алгебра и геометрия</option>
                            </select>
                            <div className="onebtn">
                                <button className="btn1 btnYellow"><span>Добавить</span></button>
                            </div>
                        </>
                    )}
                    {typePracticLab && (
                        <>
                            <select className="shadowBlack" id='selectClassLesson'
                            onChange={handleChange}
                            >
                                <option value={''}>Выберите группу</option>
                                <option value={''}>09-032</option>
                            </select>
                            <select className="shadowBlack" id='selectSubLesson'
                            onChange={handleChange}
                            >
                                <option value={''}>Выберите предмет</option>
                                <option value={''}>Алгебра и геометрия</option>
                            </select>
                            <div className="onebtn">
                                <button className="btn1 btnYellow"><span>Добавить</span></button>
                            </div>
                        </>
                    )}
                    {typeExam && (
                        <>
                            <select className="shadowBlack" id='selectClassLesson'
                            onChange={handleChange}
                            >
                                <option value={''}>Выберите группу</option>
                                <option value={''}>09-032</option>
                            </select>
                            <select className="shadowBlack" id='selectSubLesson'
                            onChange={handleChange}
                            >
                                <option value={''}>Выберите предмет</option>
                                <option value={''}>Алгебра и геометрия</option>
                            </select>
                            <div className="onebtn">
                                <button className="btn1 btnYellow"><span>Добавить</span></button>
                            </div>
                        </>
                    )}
                    {typeMinExam && (
                        <>
                            <select className="shadowBlack" id='selectClassLesson'
                            onChange={handleChange}
                            >
                                <option value={''}>Выберите группу</option>
                                <option value={''}>09-032</option>
                            </select>
                            <select className="shadowBlack" id='selectSubLesson'
                            onChange={handleChange}
                            >
                                <option value={''}>Выберите предмет</option>
                                <option value={''}>Алгебра и геометрия</option>
                            </select>
                            <div className="onebtn">
                                <button className="btn1 btnYellow"><span>Добавить</span></button>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}