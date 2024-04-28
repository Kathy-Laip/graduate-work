import React, {useState} from "react";
import { ScheduleSchool } from "../architecture/ScheduleSchool";
import close from '../pictures/Close.svg'
import trash from '../pictures/Trash.svg'

type Les = {
    sch: ScheduleSchool,
    mes: Function
    color: string,
    top: string,
    left: string,
    height: string,
    text: any,
    width?: string
    leftInt: number,
    id: number,
    infoDop: any
}

export const LessonSchool: React.FC<Les> = (props) => {
    const [info, setInfo] = useState(false)

    const visibleInfo = () => {
        setInfo(true)
    }
    
    const noneVisible = () => {
        setInfo(false)
    }

    const deleteLesson = () => {
        let ans = props.sch.deleteLesson(props.id)
        ans.then(answer => {
            if(answer.otv === 'OK'){
                props.mes('Занятие успешно удалено!', true)
            }else{
                props.mes('Что-то пошло не так, пожалуйста, попробуйте позже...', false)
            }
        })
    }

    
    return (
        <div className="infoLessonCurrent"
        
        >
            <div className="lesson bdR5" id='lesson'
            style={{backgroundColor: props.color, top: props.top, left: props.left, height: props.height, width: props.width}}
            onClick={() => visibleInfo()}
            >
                <span>{props.text.name}</span>
                <span>Кабинет: {props.text.place}</span>
                <span>{props.text.teach}</span>
                <span>{props.text.period}</span>
            </div>
            {info && (
                <div className='infoLesson bdR5' id='top'
                style={{top: props.top, left: props.leftInt + 190 + 'px'}}
                >
                    <div className="closeCreate">
                        <img src={trash} id='close' onClick={() => deleteLesson()}/>
                        <img src={close} id='close' onClick={() => noneVisible()}/>
                    </div>
                
                    <span>{props.text.name}</span>
                    <span>Кабинет: {props.text.place}</span>
                    <span>{props.text.teach}</span>
                    <span>{props.text.period}</span>
                    <span>{props.infoDop[0]} - {props.infoDop[1]}</span>
                </div>
            )}
        </div>
    )
}