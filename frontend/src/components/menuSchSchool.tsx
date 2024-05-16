import React, {useState} from "react";
import { ScheduleSchool } from "../architecture/ScheduleSchool";
import { User } from "../architecture/User";
import { LessonSchool } from "./LessonSchool";
import { LineHorizont } from "./LineHorizon";
import { LineVertical } from "./LineVertical";

type Menu ={
    user: User,
    sch: ScheduleSchool,
    mes: Function,
    add: Function,
    changeInfo: Function,
    changeRasp: Function,
    rasp: boolean
}

const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
const week_small = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']

const getMinutesLesson = (time1:any, time2:any) => {
    time1 = time1[0];
    time2 = time2[1];

    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;

    return (totalMinutes2 - totalMinutes1)*75/60;
}

const getTop = (arrH: Array<number>, obj:string) => {
    return (70 + (arrH!.indexOf(Number(obj.split(':')[0])) + 1)*75) + (Number(obj.split(':')[1])/60*75) + 'px'
}


export const MenuSchSchool: React.FC<Menu> = (props) => {
    const [countCoursese, setCountCourses] = useState<Array<number>|undefined>(props.sch.settings !== undefined ? Array.from({length: props.sch.settings!.count_class || -1}, (_, ind) => ind + 1) : undefined)
    const [course, setCourse] = useState(0)
    const [coutGroups, setCountGrouos] = useState<Array<string>>([])

    const [minss, setMins] = useState(0)
    const [dirs, setDirs] = useState<Array<Array<[string, string, string]>>>(props.sch.settings?.arr_courses ? Object.values(props.sch.settings!.arr_courses) as any : [])

    const [arrHours, setArrHours] = useState<Array<number>|[]>([])

    const [sch, setSch] = useState(false)

    const [isLoading, setIsLoading] = useState(true);
    const [get, setGet] = useState(true)

    const [lesson, setLesson] = useState<Array<Array<string>>>([])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(event.target.id === 'dir'){
            setArrHours(Array.from({length: Number(Object.values(props.sch.settings!.work_times[props.sch.settings!.work_times.length - 1])[1].split(':')[0]) + 2 - Number(Object.values(props.sch.settings!.work_times[0])[0].split(':')[0])}, (_, ind) => Number(Object.values(props.sch.settings!.work_times[0])[0].split(':')[0]) + ind ))
            setCourse(Number(event.target.value))
            props.changeInfo(Number(event.target.value))
        }
    }


    const next = () => {
        if(!course){
            props.mes('Заполните поле с потоком!', false)
        }else{
            props.add()
            setGet(true)
            sessionStorage.removeItem('info')
            sessionStorage.setItem('info', JSON.stringify({'course': course}))
            props.changeRasp()
        }
    }


    const updateSchs = () => {
        
        let ans = props.sch.getClasses({'course': course})
        // console.log()
        ans.then(answer => {
            if(answer.otv === 'OK'){
                setIsLoading(true)
                setLesson(Object.values(answer.info))
                
                setIsLoading(false)
            }else if(answer.otv === 'empty'){
                setIsLoading(true)
                setLesson([])
                props.mes('Занятий нет для этого направления! Добавьте новое занятие', false)
                
                setIsLoading(false)
            }
            else{
                props.mes('Ошибка получения расписания! Попробуйте позже!', false)
            }
        })
    }


    const updateSchsSaved = (courseSaved: number) => {
        console.log(courseSaved)
        let ans = props.sch.getClasses({'course': courseSaved})
        ans.then(answer => {
            if(answer.otv === 'OK'){
                setIsLoading(true)
                setLesson(Object.values(answer.info))
                
                
                setIsLoading(false)
            }else if(answer.otv === 'empty'){
                setIsLoading(true)

                setLesson([])
                props.mes('Занятий нет для этого направления! Добавьте новое занятие', false)
                
                
                setIsLoading(false)
            }
            else{
                props.mes('Ошибка получения расписания! Попробуйте позже!', false)
            }
        })
    }

    (async () => {
        const saved = JSON.parse(sessionStorage.getItem('info')!)
        
        if((saved || sch) && get){
            setSch(true)
            
            if(saved !== null){
                
                setCourse(prev => prev = saved.course)
                
                updateSchsSaved(saved.course)
                setArrHours(Array.from({length: Number(Object.values(props.sch.settings!.work_times[props.sch.settings!.work_times.length - 1])[1].split(':')[0]) + 2 - Number(Object.values(props.sch.settings!.work_times[0])[0].split(':')[0])}, (_, ind) => Number(Object.values(props.sch.settings!.work_times[0])[0].split(':')[0]) + ind ))
                setCountGrouos(Object.values(props.sch.settings!.arr_courses[saved.course]))
                props.changeInfo(saved.course)
                

            }else{
                updateSchs()
            }
            setMins(getMinutesLesson(Object.values(props.sch.settings!.work_times)[0], Object.values(props.sch.settings!.work_times)[0]))
            props.changeRasp()
            setGet(false)
        }
    })()

    console.log(lesson)

    return (
        <>
        {sch  && props.rasp ? 
        (
            <div>
                <div className="sch">
                    {isLoading && <div className="divLoad"><div id="load"></div></div>}
                    {isLoading == false && (
                        <>

                            <LineHorizont width={(180*6*Number(Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0]).length) + 70) + 'px'} top='55px'/>
                            <LineHorizont width={(180*6*Number(Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0]).length) + 70) + 'px'} top='110px'/>
                            {arrHours !== undefined && arrHours.length > 0 && arrHours.map((el, ind) => 
                            (
                                <>
                                    <div className='timeSch' style={{top:(50 + (ind + 1)*75)+'px', left: '10px'}}><span>{el+':00'}</span></div>
                                    <LineHorizont width={(180*6*Number(Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0]).length)) + 'px'} top={(70 + (ind + 1)*75)+'px'} left='65px'/>
                                    {ind === arrHours.length - 1 && (<div className="emptyBlock" style={{top:(70 + (ind + 2)*75)+'px', left: '10px'}}></div>)}
                                </>
                            ))}
                            {week.map((el, ind) => (
                                <>
                                    <div className='weeks' style={{top:'20px',  left:(80 + ind*180*Number(Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0]).length))+'px'}}><span>{el}</span></div>
                                    {arrHours !== undefined && arrHours.length > 0 && (<LineVertical height={(arrHours!.length*75 + 140)+'px'} top='0px' left={(70 + ind*180*Number(Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0]).length))+'px'}/>)}
                                    {Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0]).map((el, ind1) => (
                                        <>
                                            <div className='class' style={{top:'70px',  left:(ind*180*Number(Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0]).length)) + (ind1*180) + 70 + 10 +'px'}}><span>{el[0] + el[1]}</span></div>
                                            {arrHours !== undefined && arrHours.length > 0 && ind1 !== 0 && (<LineVertical height={(arrHours!.length*75 + 85)+'px'} top='55px' left={(ind*180*Number(Object.values(props.sch.settings!.arr_courses[course] || 0).filter(el => el[0]).length)) + (ind1*180) + 70 +'px'}/>)}
                                        </>
                                        
                                    ))}
                                </>
                            ))}
                        </>
                    )}
                    {lesson.map(el => {
                        return coutGroups.map((gr, ind) => {
                            if(gr[1] === el[9]) return (
                                // ['8:30', '9:15', '302', 'Сазонова А. Г.', 'Алгебра', 'понедельник', null, 'каждую неделю', '8', 'А', 25]
                                <LessonSchool mes={props.mes} sch={props.sch} key={ind} color={'var(--main-yellow)'} text={{'name': el[4], 'place': el[2], 'teach': el[3], 'period': ''}} top={typeof(el[0]) === 'string' ? getTop(arrHours, el[0]) : '0px'} left={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180 +'px'} height={minss + 'px'} leftInt={72 + (week_small.indexOf(el[5])*coutGroups.length*180) + ind*180} id={Number(el[11])}infoDop={[el[0], el[1]]} />
                            )
                        })
                    })}
                </div>

            </div>
        )
        : props.sch.settings?.arr_courses ? (
            <div className="planMenu">
                <div id='chooseSch'>
                    <select className="shadowBlack" id='dir' onChange={handleChange}>
                        <option value=''>Выберите поток</option>
                        {dirs.map((el, ind) => <option value={`${ind+1}`}>{el[0][0]}</option>)}
                    </select>
                    <button className="btn1 btnBlue bdR5" onClick={next}><span>Перейти</span></button>
                </div>
            </div>
        ):(
            <div className="planMenu">
                Настройте расписание! А также добавьте информацию по учебному плану и преподавателям!
                <br></br>
                <span style={{color: 'red'}}>ВНИМАНИЕ!</span> Чтобы избежать утери данных, перед началом составления расписания добавьте в настройках всю необходимую информацию! Далее перейдите в поле "учебный план".
                Загрузите для всех направлений учебный план, далее перейдите в поле "преподаватели" и загрузите информацию с преподавателями!
            </div>
        )}
        </>
    )
}