import React, {useState} from 'react'
import { ScheduleUni } from '../architecture/ScheduleUni'
import close from '../pictures/Close.svg'
import { Direction } from './Direction'

type AddLess = {
    close: Function,
    info: Array<string|number>,
    sch: ScheduleUni,
    add: Function,
    mes: Function
}

export const AddLesonUni: React.FC<AddLess> = (props) => {
    const [typeLect, setTypeLect] = useState(false)
    const [typePractic, setTypePractic] = useState(false)
    const [typePracticLab, setTypePracticLab] = useState(false)
    const [typeExam, setTypeExam] = useState(false)
    const [typeMinExam, setMinExam] = useState(false)

    const [selectSub, setSelectSub] = useState('')

    const [sub, setSub] = useState<Array<string>>([])
    const [get, setGet] = useState(true)


    const [count, setCount] = useState<number>(1)
    const [dir, setdir] = useState<number[]>([]);
    const [dirs, setdirs] = useState<string[]>([`${props.info[0]} ${props.info[1]}`])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        if(event.target.id === 'count'){
            setCount(Number(event.target.value))
            const newdir = Array.from({length: Number(event.target.value)}, () => '');
            const dirses = Array.from({length: Number(event.target.value) - 1}, () => 0)
            newdir[0] = `${props.info[0]} ${props.info[1]}`
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
        }else if(event.target.id === 'selectSubLesson'){
            setSelectSub(event.target.value)
        }
    }

    const getSubj = () => {
        let ans = props.sch.getSubject({'course': props.info[0], 'napr': props.info[1]})
        ans.then(answer => {
            if(answer.otv == 'OK'){
                setSub(answer.data)
            } else setSub([])
        })
    }

    (async () => {
        if(get){
            getSubj()
            setGet(false)
        }
    })()

    const addNapr = (num: number, data:string) => {
        setdirs(prev => {
            const ds = [...prev]
            ds[num+1] = data
            return ds
        })
    }

    // console.log(dirs)

    const addLesson = () => {
        if(typeLect){
            if(selectSub === ''){
                props.mes('Выберите предмет!', false)
            }else{
                if(dirs.length != count){
                    props.mes('Пожалуйста, выберите направления для добавления занятия!', false)
                }
                else{
                    let empty = dirs.filter(el => el === '')
                    if(empty.length > 0) props.mes('Пожалуйста, выберите направления для добавления занятия!', false)
                    else{
                        let sets = new Set(dirs)
                        if(sets.size !== count) props.mes('Пожалуйста, выберите разные направления для добавления занятия!', false)
                        else{
                            props.add({type: 'lect', napr: dirs, subj: selectSub})
                        }
                    }
                }
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
                        <option value={'lect'}>Лекция</option>
                        <option value={'practic'}>Практика</option>
                        <option value={'lab'}>Лабораторная практика</option>
                        <option value={'exam'}>Экзамен</option>
                        <option value={'min_exam'}>Зачет</option>
                    </select>
                    <span style={{fontSize: '0.8rem'}}>Периодичность занятий определяется автоматически, на основе информации об академическом часe, а также в зависимости от учебного плана</span>
                    {typeLect && (
                        <>
                            <select className="shadowBlack" id='selectSubLesson'
                            onChange={handleChange}
                            >
                                <option value={''}>Выберите предмет</option>
                                {sub.map(el => (<option value={`${el}`}>{el}</option>))}
                            </select>
                            <div className="datePeriod">
                                <span>Кол-во направлений на занятии</span>
                                <input type='number' min={1} id='count' value={count} onChange={handleChange}></input>
                            </div>
                            <div className="datePeriod">
                                <select className="shadowBlack" >
                                     <option value={`${props.info[0]} ${props.info[1]}`}>{props.info[0]} курс, {props.info[1]}</option>
                                </select>
                            </div>
                            {dir.map((el, ind ) => (
                                <>
                                    <Direction number={ind} arr={Object.values(props.sch.settings!.arr_courses).map(el => Object.values(el))} add={addNapr}/>
                                </>
                            ))}
                            <div className="onebtn">
                                <button className="btn1 btnYellow" onClick={addLesson}><span>Добавить</span></button>
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