import React, {useState} from "react";
import close from '../pictures/Close.svg'
import {ScheduleSchool} from '../architecture/ScheduleSchool'
import {handleUpload} from '../constants/const'

type AddType ={
    deletePlan: Function,
    sch: ScheduleSchool,
    mes: Function
}

export const EdiPlanSschool: React.FC<AddType> = (props) => {
    const [countCoursese, setCountCourses] = useState<Array<any>|undefined>(props.sch.settings !== undefined ? Array.from({length: props.sch.settings!.count_class || -1}, (_, ind) => props.sch.settings!.arr_courses[ind+1]) : undefined)
    const [numberCourse, setNumberCourse] = useState<number>(0)
    const [dir, setDir] = useState<any>()
    const [currCourse, setCurrCourse] = useState<string>('')

    const [namePlan, setNamePlan] = useState('')
    const [selectedPlanFile, setSelectedPlanFile] = useState<File | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(event.target.id === 'selectAddCourse'){
            setNumberCourse(Number(event.target.value))
            let dir = props.sch.settings!.arr_courses[Number(event.target.value)]
            setDir(dir)
        }else if(event.target.id === 'selectAddPlan'){
            setCurrCourse(event.target.value)
        }
    }

    const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.id === 'plan'){
            const file = event.target.files && event.target.files[0]; 
            if(file){
                setSelectedPlanFile(file)
                setNamePlan(file!.name)
            }
        }
    }

    const del = () => {
        if(!numberCourse){
            props.mes('Выберите параллель и класс подготовки!', false)
        } else if(!currCourse){
            props.mes('Выберите параллель!', false)
        } else{
            let ans = props.sch.deleteDirection(numberCourse,  {'dir': dir[0][0], 'currCourse': currCourse})
            ans.then(answer => {
                console.log(answer)
                if(answer.otv === 'ok'){
                    props.mes('Учебный план данного направления успешно удален!', true)
                }else if(answer.otv === 'error'){
                    props.mes('Ошибка удаления! Попробуйте позже', true)
                }
                else if(answer.otv === 'error data'){
                    props.mes('Что-то пошло не так, не получилось, удалить данное направление! Повторите попытку позже', false)
                }
            })
        }
    }

    const edit = () => {
        if(!numberCourse){
            props.mes('Выберите параллель и класс подготовки!', false)
        } else if(!currCourse){
            props.mes('Выберите параллель!', false)
        } else if(selectedPlanFile === null){
            props.mes('Выберите файл для изменения в учебного плане направления!', false)
        }else{
            let ans = handleUpload(selectedPlanFile)
            ans.then(answer => {
                let data = answer as any
                let keys = data[0]
                if(keys[0] !== 'наименование предмета' || keys[1] !== 'количество часов в неделю'){
                    props.mes('Поля файла не соответсвует требованиям! Перепроверьте файл на корректность заполненных полей!', false)
                }
                else{
                    let ans = props.sch.editDirection(numberCourse, {'dir': dir[0][0], 'currCourse': currCourse}, data)
                    ans.then(answer => {
                        if(answer.otv === 'ok'){
                            props.mes('Учебный план данного направления успешно изменен!', true)
                        }else if(answer.otv === 'error courses name'){
                            props.mes('Ошибка добавления учебного плана! Попробуйте позже', false)
                        }else if(answer.otv === 'error'){
                            props.mes('Ошибка удаления учебного плана! Попробуйте позже', false)
                        }
                        else if(answer.otv === 'error data'){
                            props.mes('Что-то пошло не так, не получилось, удалить данное направление! Повторите попытку позже', false)
                        }
                    })
                }

            })
        }
    }

    return (
        <div id="blockWithCloseAddPlan">
            <div id='blockAddOrEdit'>
            {props.sch.settings !== undefined ? (
                    <>
                        <div className='closeCreate'>
                            <h1 className="h1">Изменение параллели</h1>
                            <img src={close} id='close' onClick={() => props.deletePlan()}/>
                        </div>
                        <select className="shadowBlack" id='selectAddCourse'
                        onChange={handleChange}
                        >
                            <option value={''}>Выберите поток</option>
                            {countCoursese!.map((el, ind) => (
                                <option value={`${ind+1}`}>{el[0][0]}</option>
                            ))}
                        </select>
                        <select className="shadowBlack" id='selectAddPlan'
                        onChange={handleChange}
                        >
                            <option value={''}>Выберите класс</option>
                            {numberCourse !== 0 && [...new Set(Object.values(props.sch.settings!.arr_courses[numberCourse]).map(el => el[1]))].map(el => (<option value={`${el}`}>{el}</option>)) }
                        </select>
                        <form method="post" encType="multipart/form-data">
                            	<label className="input-file">
                            	   	<span className="input-file-text shadowBlack">{namePlan}</span>
                            	   	<input type="file" name="file" accept=".xlsx" id='plan' onChange={fileChange}/>        
                             	   	<span className="input-file-btn"><span>Выберите файл!</span></span>
                             	</label>
                        </form>
                        <div className="twobtnInBlock">
                            <button className="btn1 bdR5 btnPink" onClick={del}><span>Удалить параллель</span></button>
                            <button className="btn1 bdR5 btnYellow" onClick={edit}><span>Изменить</span></button>
                        </div>
                    </>
                ):
                (
                    <>
                        <div className='closeCreate'>
                            <h1 className="h1">Сообщение!</h1>
                            <img src={close} id='close' onClick={() => props.deletePlan()}/>
                        </div>
                        <div className="mrTB1">
                            <span>Пожалуйста, для начала настройте расписание, прежде чем добавлять информацию о направлениях!</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}