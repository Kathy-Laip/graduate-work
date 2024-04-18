import React, {useState} from 'react'
import close from '../pictures/Close.svg'
import { Direction } from './Direction'

type AddLess = {
    close: Function
}

export const AddLesonSchool: React.FC<AddLess> = (props) => {
    const [count, setCount] = useState<number>()
    const [dir, setdir] = useState<number[]>([]);
    const [dirs, setdirs] = useState<any[]>([])

    const [classSelect, setClassSelect] = useState('')
    const [subj, setSubj] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        if(event.target.id === 'selectClass'){
            setClassSelect(event.target.value)
        }
        else if(event.target.id === 'selectSubject'){
            setSubj(event.target.value)
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
                        <option value={''}>8 В</option>
                    </select>
                    <select className="shadowBlack" id='selectSubject'
                    onChange={handleChange}
                    >
                        <option value={''}>Выберите предмет</option>
                        <option value={''}>Математика</option>
                    </select>
                    <div className="onebtn">
                            <button className="btn1 btnYellow"><span>Добавить</span></button>
                    </div>
                </div>

            </div>
        </div>
    )
}