import React, {useState} from 'react'
import { ScheduleSchool } from '../architecture/ScheduleSchool'
import close from '../pictures/Close.svg'
import { Direction } from './Direction'

type AddLess = {
    close: Function,
    info: Array<string|number>,
    sch: ScheduleSchool,
    add: Function,
    mes: Function
}

export const AddLesonSchool: React.FC<AddLess> = (props) => {
    const [count, setCount] = useState<number>()
    const [dir, setdir] = useState<number[]>([]);
    const [dirs, setdirs] = useState<any[]>([])

    const [sub, setSub] = useState<Array<string>>([])
    const [curSub, setCurSub] = useState<Array<string>>([])
    const [get, setGet] = useState(true)

    const [classSelect, setClassSelect] = useState('')
    const [subj, setSubj] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        if(event.target.id === 'selectClass'){
            setClassSelect(event.target.value)
            setCurSub(sub.filter(el => el[0] == event.target.value.split(' ')[1]))
        }
        else if(event.target.id === 'selectSubject'){
            setSubj(event.target.value)
        }
    }


    const getSubj = () => {
        let ans = props.sch.getSubject({'course': props.info})
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

    // console.log(props.info)

    const addLesson = () => {
        if(classSelect === ''){
            props.mes('Выберите класс!', false)
        }else{
            if(subj === ''){
                props.mes('Выберите предмет!', false)
            }else{
                props.add({napr: classSelect, subj: subj})
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
                    <select className="shadowBlack" id='selectClass'
                    onChange={handleChange}
                    >
                        <option value={''}>Выберите класс</option>
                        {Object.values(props.sch.settings!.arr_courses).map(el => Object.values(el)).filter(el => el[0][0] == String(props.info!))[0].map(el => (<option value={`${el[0]} ${el[1]}`}>{el[0]} {el[1]}</option>))}
                    </select>
                    <select className="shadowBlack" id='selectSubject'
                    onChange={handleChange}
                    >
                        <option value={''}>Выберите предмет</option>
                        {curSub.map(el => (<option value={el[1]}>{el[1]}</option>))}
                    </select>
                    <div className="onebtn">
                            <button className="btn1 btnYellow" onClick={addLesson}><span>Добавить</span></button>
                    </div>
                </div>

            </div>
        </div>
    )
}