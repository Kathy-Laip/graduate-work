import React, {useEffect, useState} from "react";
import close from '../pictures/Close.svg'
import {ScheduleUni} from '../architecture/ScheduleUni'
import { ScheduleFabrica } from "../architecture/ScheduleFabrica";
import {handleUpload} from '../constants/const'
import { NewCouse } from "./NewCourse";
import question from '../pictures/question.svg'
import { User } from "../architecture/User";
import { MessageConfirmYN } from "./MessageConfirmTrueFalse";

type SchSetts = {
    user: User,
    onSettingsFalse: Function,
    sch: ScheduleUni,
    mes: Function 
}

type MyType = {
    courseNumber: number,
    st: any[];
  };

export const ScheduleBlockSettingsUni: React.FC<SchSetts> = (props) => {
    const [count, setCount] = useState<number>(0)
    const [courseBlocks, setCourseBlocks] = useState<number[]>([]);
    const [courses, setCourses] = useState<any[]>([])
    const [presCourses, setPresCourses] = useState<any>();

    const [confirm, setConfirm] = useState(false)
    const [mes, setMes] = useState('')


    const [semestr, setSemester] = useState<number>()
    const [accHour, setAccHour] = useState<number>()

    const [nameGrafic, setNameGrafic] = useState('')
    const [selectedGraficFile, setSelectedGraficFile] = useState<File | null>(null);
    const [presGrafic, setPresGrafic] = useState<any|undefined>([]);

    const [nameAudit, setNameAudit] = useState('')
    const [selectedAuditFile, setSelectedAuditFile] = useState<File | null>(null);
    const [presAudit, setPresAudit] = useState<any|undefined>([]);

    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')



    const handleChange = (event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        if(event.target.id === 'count'){
            console.log(event.target.id)
            setCount(Number(event.target.value))
            const newCourseBlocks = Array.from({length: Number(event.target.value)}, (_, ind) => ind+1);
            const coursess = Array.from({length: Number(event.target.value)+1}, () => 0)
            setCourses(coursess)
            setCourseBlocks(newCourseBlocks);
        }else if(event.target.id === 'selectPeriod'){
            setSemester(Number(event.target.value))
        }else if(event.target.id === 'selectTypeEdit'){
            setAccHour(Number(event.target.value))
        }else if(event.target.id === 'startDate'){
            setStartDate(event.target.value)
        }else if(event.target.id === 'endDate'){
            setEndDate(event.target.value)
        }
    }

    
    const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.id === 'graficFile'){
            const file = event.target.files && event.target.files[0]; 
            console.log(file)
            if(file){
                setSelectedGraficFile(file)
                setNameGrafic(file!.name)
            }
        }else if(event.target.id === 'auditFile'){
            const file = event.target.files && event.target.files[0]
            if(file){
                setSelectedAuditFile(file)
                setNameAudit(file!.name)
            }
        }
    }

    const changeFilesCourse = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileIndex = Number(event.target.name.split('-')[1]);
        const file = event.target.files && event.target.files[0]; 

        if(file){
            setCourses(prevNames => {
                const updatedNames = [...prevNames];
                updatedNames[fileIndex] = file;
                return updatedNames;
            });
        }
    }

    const closeConfirm = () => {
        setConfirm(false)
    }


    const save = () => {
        if(!props.sch.settings){
            if(!semestr) props.mes('Заполните пожалуйста поле с семестром!', false)
            else{
                if(!accHour) props.mes('Заполните пожалуйста поле с академическим часом!', false)
                else{
                    if(selectedGraficFile === null) props.mes('Выберите файл с графиком!', false)
                    else{
                        let ans = handleUpload(selectedGraficFile!)
                        ans.then(ans => {
                            setPresGrafic(ans)
                            let presGr: any[] = ans as any
                            let keysGr = presGr[0]
                            if(keysGr[0] !== 'начало' || keysGr[1] !== 'конец') props.mes('Файл с графиком не соответсвует требованиям!', false)
                            else {
                                if(selectedAuditFile === null) props.mes('Выберите файл с аудиториями!', false)
                                else{
                                    let ans = handleUpload(selectedAuditFile!)
                                    ans.then(ans => {
                                        setPresAudit(ans)
                                        let presAu: any[] = ans as any
                                        let keysAu = presAu[0]
                                        if(keysAu[0] !== 'номер аудитории' || keysAu[1] !== 'вместимость' || keysAu[2] !== 'начало работы' || keysAu[3] !== 'конец работы' || keysAu[4] !== 'тип аудитории' || keysAu[5] !== 'день недели') props.mes('Файл с аудиториями не соответсвует требованиям!', false)
                                        else {
                                            if(!startDate || !endDate) props.mes('Заполните начало и конец периода!', false)
                                            else{
                                                let presCs:any[] = []
                                                if(courses.length === 0) props.mes(`Пожалуйста, заполните информации с курсами!`, false)
                                                else{
                                                    for(let i = 1; i < courses.length; i++){
                                                        let obj: MyType = {courseNumber: i, st: []}
                                                        if(courses[i] === 0 || courses[i] === undefined){
                                                            props.mes(`Выберите файл для курса ${i}`, false)
                                                            setCount(0)
                                                            setCourseBlocks([])
                                                            i = courses.length;
                                                            presCs = []
                                                        } 
                                                        else{
                                                            let ans = handleUpload(courses[i]!)
                                                            ans.then(ans => {
                                                                let datCs: any = ans as any
                                                                // console.log(datCs)
                                                                obj.st = datCs
                                                                let keysCs = datCs[0]
                                                                if(keysCs[0] !== 'наименование' || keysCs[1] !== 'номер группы/инициалы' || keysCs[2] !== 'количество'){
                                                                    props.mes(`Файл с курсом ${count} не соответствует требованиям!`, false)
                                                                    setCount(0)
                                                                    setCourseBlocks([])
                                                                    i = courses.length;
                                                                    presCs = []
                                                                } else{
                                                                    presCs.push(obj)
                                                                } 

                                                                if(i === courses.length - 1){
                                                                    setPresCourses(presCs)
                                                                    if(presCs.length === courses.length - 1){
                                                                        let ans = props.sch.saveSettingsSchedule('first', semestr, accHour, presGr, presAu, startDate, endDate, presCs)
                                                                        ans?.then(answer => {
                                                                            if(answer.otv === 'ok'){
                                                                                localStorage.setItem('user', JSON.stringify(props.user))
                                                                                props.mes('Информация добавлена!', true)
                                                                            }else if(answer.otv === 'error add set'){
                                                                                props.mes('Что-то не так с выбором семестра, академического часа или с датами об окончании и начале семестра! Перепроверьте данные!', false)
                                                                            }else if(answer.otv === 'error grafic'){
                                                                                props.mes('Что-то не так с графиком! Перепроверьте данные!', false)
                                                                            }else if(answer.otv === 'error audit'){
                                                                                props.mes('Что-то не так с данными об аудиториях! Перепроверьте данные!', false)
                                                                            } else if(answer.otv === 'courses number' || answer.otv === 'error courses name' || answer.otv === 'error courses initial'){
                                                                                props.mes('Что-то не так с добавлением курсов! Перепроверьте данные!', false)
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                            })
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    })
                                }
                            }
                        
                        })
                    }
                }
        }
        }else{
            setMes('Внимание! Для того, чтобы изменить настройки необходимо удалить данные о расписании! Вы точно хотите изменить параметры расписания?')
            setConfirm(true)
        }
    }

    const saveSecond = () => {
        closeConfirm()
        if(!semestr) props.mes('При повторной настройке заполните все поля! Заполните пожалуйста поле с семестром!', false)
        else{
            if(!accHour) props.mes('При повторной настройке заполните все поля! Заполните пожалуйста поле с академическим часом!', false)
            else{
                if(selectedGraficFile === null) props.mes('Выберите файл с графиком!', false)
                else{
                    let ans = handleUpload(selectedGraficFile!)
                    ans.then(ans => {
                        setPresGrafic(ans)
                        let presGr: any[] = ans as any
                        let keysGr = presGr[0]
                        if(keysGr[0] !== 'начало' || keysGr[1] !== 'конец') props.mes('Файл с графиком не соответсвует требованиям!', false)
                        else {
                            if(selectedAuditFile === null) props.mes('Выберите файл с аудиториями!', false)
                            else{
                                let ans = handleUpload(selectedAuditFile!)
                                ans.then(ans => {
                                    setPresAudit(ans)
                                    let presAu: any[] = ans as any
                                    let keysAu = presAu[0]
                                    if(keysAu[0] !== 'номер аудитории' || keysAu[1] !== 'вместимость' || keysAu[2] !== 'начало работы' || keysAu[3] !== 'конец работы' || keysAu[4] !== 'тип аудитории' || keysAu[5] !== 'день недели') props.mes('Файл с аудиториями не соответсвует требованиям!', false)
                                    else {
                                        if(!startDate || !endDate) props.mes('При повторной настройке заполните все поля! Заполните начало и конец периода!', false)
                                        else{
                                            let presCs:any[] = []
                                            if(courses.length === 0) props.mes(`При повторной настройке заполните все поля! Пожалуйста, заполните информации с курсами!`, false)
                                            else{
                                                for(let i = 1; i < courses.length; i++){
                                                    let obj: MyType = {courseNumber: i, st: []}
                                                    if(courses[i] === 0 || courses[i] === undefined){
                                                        props.mes(`Выберите файл для курса ${i}`, false)
                                                        setCount(0)
                                                        setCourseBlocks([])
                                                        i = courses.length;
                                                        presCs = []
                                                    } 
                                                    else{
                                                        let ans = handleUpload(courses[i]!)
                                                        ans.then(ans => {
                                                            let datCs: any = ans as any
                                                            // console.log(datCs)
                                                            obj.st = datCs
                                                            let keysCs = datCs[0]
                                                            if(keysCs[0] !== 'наименование' || keysCs[1] !== 'номер группы/инициалы' || keysCs[2] !== 'количество'){
                                                                props.mes(`Файл с курсом ${count} не соответствует требованиям!`, false)
                                                                setCount(0)
                                                                setCourseBlocks([])
                                                                i = courses.length;
                                                                presCs = []
                                                            } else{
                                                                presCs.push(obj)
                                                            } 

                                                            if(i === courses.length - 1){
                                                                setPresCourses(presCs)
                                                                if(presCs.length === courses.length - 1){
                                                                    let ans = props.sch.saveSettingsSchedule('second', semestr, accHour, presGr, presAu, startDate, endDate, presCs)
                                                                    ans?.then(answer => {
                                                                        if(answer.otv === 'ok'){
                                                                            localStorage.setItem('user', JSON.stringify(props.user))
                                                                            props.mes('Информация добавлена!', true)
                                                                        }else if(answer.otv === 'error sch'){
                                                                            props.mes('Не получилось очистить расписание! Попробуйте позже!', false)
                                                                        }else if(answer.otv === 'error add set'){
                                                                            props.mes('Что-то не так с выбором семестра, академического часа или с датами об окончании и начале семестра! Перепроверьте данные!', false)
                                                                        }else if(answer.otv === 'error grafic del'){
                                                                            props.mes('Не получилось удалить график учебного заведения! Попробуйте позже!', false)
                                                                        }else if(answer.otv === 'error grafic'){
                                                                            props.mes('Что-то не так с графиком! Перепроверьте данные!', false)
                                                                        }else if(answer.otv === 'error place'){
                                                                            props.mes('Не получилось удалить записи об аудиториях! Попробуйте позже!', false)
                                                                        }else if(answer.otv === 'error audit'){
                                                                            props.mes('Что-то не так с данными об аудиториях! Перепроверьте данные!', false)
                                                                        }else if(answer.otv === 'error courses'){
                                                                            props.mes('Не получилось очистить записи о курсах! Попробуйте позже!', false)
                                                                        } else if(answer.otv === 'error courses name' || answer.otv === 'error courses initial'){
                                                                            props.mes('Не получилось очистить записи о направлениях! Попробуйте позже!', false)
                                                                        }else if(answer.otv === 'courses number' || answer.otv === 'error courses name' || answer.otv === 'error courses initial'){
                                                                            props.mes('Что-то не так с добавлением курсов! Перепроверьте данные!', false)
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                        })
                                                    }
                                                }
                                            }
                                        }
                                    }
                                })
                            }
                        }
                    
                    })
                }
            }
    }
    }

    return (
        <>
        <div id="blockWithCloseSett">
            <div id='settings'>
                <div className='closeCreate'>
                    <h1 className="h1">Настройки расписания</h1>
                    <img src={close} id='close' onClick={() => props.onSettingsFalse()}/>
                </div>
                <div className="scrolls">
                    <select className="shadowBlack" id='selectPeriod'
                    onChange={handleChange}
                    >
                        <option value={''}>Выберите семестр</option>
                        <option value={'1'}>1</option>
                        <option value={'2'}>2</option>
                    </select>
                    <span className="mrTB1">Академический час:</span>
                    <select className="shadowBlack" id='selectTypeEdit'
                    onChange={handleChange}
                    >
                        <option value={''}>Выберите час</option>
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
                    <div className="dis_sp">
                        <span className="mrTB1">График работы заведения:</span>
                        <div className="que" id='queT'><img src={question}/><span className="tool-text" id='bottom'>Скачайте документы для настройки, рядом с кнопкой настроить расписание!</span></div>
                    </div>
                    {/* <input type="file"  id="avatar"  accept=".xlsx"/> */}
                    <form method="post" encType="multipart/form-data">
                    	<label className="input-file">
                    	   	<span className="input-file-text shadowBlack"><span>{nameGrafic}</span></span>
                    	   	<input type="file" name="file" accept=".xlsx" id='graficFile' onChange={fileChange}/>        
                     	   	<span className="input-file-btn"><span>Выберите файл!</span></span>
                     	</label>
                    </form>
                    <span className="mrTB1">График работы аудиторий:</span>
                    {/* <input type="file"  id="avatar"  accept=".xlsx"/> */}
                    <form method="post" encType="multipart/form-data">
                    	<label className="input-file">
                    	   	<span className="input-file-text shadowBlack"><span>{nameAudit}</span></span>
                    	   	<input type="file" name="file" accept=".xlsx" id='auditFile' onChange={fileChange}/>        
                     	   	<span className="input-file-btn"><span>Выберите файл!</span></span>
                     	</label>
                    </form>
                    <div className="datePeriod">
                        <span>Начало периода</span>
                        <input type='date' id='startDate' onChange={handleChange}/>
                    </div>
                    <div className="datePeriod">
                        <span>Конец периода</span>
                        <input type='date' id='endDate' onChange={handleChange}/>
                    </div>
                    <div className="datePeriod">
                        <span>Кол-во курсов</span>
                        <input type='number' min={0} id='count' value={count} onChange={handleChange}></input>
                    </div>
                    <div id='courses'>
                        {courseBlocks.map(el => (
                            <NewCouse number={el} change={changeFilesCourse}/>
                        ))}
                    </div>
                    <div className="onebtn">
                        <button className="btn1 btnYellow" onClick={save}><span>Сохранить</span></button>
                    </div>
                </div>
            </div>
        </div>
        {confirm && <MessageConfirmYN mess={mes} save={saveSecond} change={closeConfirm}/>}
        </>
    )
}