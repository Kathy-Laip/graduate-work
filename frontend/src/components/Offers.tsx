import React, {useState} from 'react'
import { ScheduleUni } from '../architecture/ScheduleUni'
import close from '../pictures/Close.svg'

type Offs = {
    close: Function,
    data: any,
    sch: ScheduleUni,
    mes: Function
}

export const Offers: React.FC<Offs> = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [get, setGet] = useState(true)

    const [dataLess, setDataLess] = useState<any>()

    const [typeLess, setTypeLess] = useState<Array<Array<string|number>>>([])
    const [selectedLessons, setSelectedLessons] = useState<Array<string|number>>([''])

    const [full, setFull] = useState([])
    const [half, setHalf] = useState([])
    const [weeks, setWeeks] = useState([])

    const [exam, setExam] = useState([])
    const [minExam, setMinExam] = useState([])

    const getLesson = () => {
        if(props.data.type === 'lect'){
            let ans = props.sch.addClassLect(props.data)
            ans.then(answer => {
                if(answer.otv === 'OK'){
                    setIsLoading(true)
                    setDataLess(answer.data.count)
                    console.log(answer.data)
                    if(answer.data.info.full) setFull(answer.data.info.full)
                    if(answer.data.info.half) setHalf(answer.data.info.half)
                    if(answer.data.info.weeks) setWeeks(answer.data.info.weeks)

                    if(answer.data.count.full && answer.data.count.ost){
                        let arr = []
                        for(let i = 0; i < answer.data.count.full; i++){
                            arr.push(['full', i+1, ''])
                        }
                        if(answer.data.info.half) arr.push(['half', answer.data.count.full + 2, ''])
                        if(answer.data.info.weeks) arr.push(['weeks', answer.data.count.full + 2, ''])
                        setTypeLess(arr)
                        setSelectedLessons(arr[0])
                    }else if(answer.data.count.full){
                        let arr = []
                        for(let i = 0; i < answer.data.count.full; i++){
                            arr.push(['full', i + 1, ''])
                        }
                        setTypeLess(arr)
                        setSelectedLessons(arr[0])
                    }
                    if(answer.data.count.countLess){
                        let arr = []
                        if(answer.data.info.half) arr.push(['half', 1, ''])
                        if(answer.data.info.weeks) arr.push(['weeks', 1, ''])
                        setTypeLess(arr)
                        setSelectedLessons(arr[0])
                    }
                    setIsLoading(false)
                }else if(answer.otv === 'error') {
                    props.mes(answer.mes, false)
                }
            })
        }
        if(props.data.type === 'practic'){
            let ans = props.sch.addClassPractic(props.data)
            ans.then(answer => {
                if(answer.otv === 'OK'){
                    setIsLoading(true)
                    setDataLess(answer.data.count)
                    if(answer.data.info.full) setFull(answer.data.info.full)
                    if(answer.data.info.half) setHalf(answer.data.info.half)
                    if(answer.data.info.weeks) setWeeks(answer.data.info.weeks)

                    if(answer.data.count.full && answer.data.count.ost){
                        let arr = []
                        for(let i = 0; i < answer.data.count.full; i++){
                            arr.push(['full', i+1, ''])
                        }
                        if(answer.data.info.half) arr.push(['half', answer.data.count.full + 2, ''])
                        if(answer.data.info.weeks) arr.push(['weeks', answer.data.count.full + 2, ''])
                        setTypeLess(arr)
                        setSelectedLessons(arr[0])
                    }else if(answer.data.count.full){
                        let arr = []
                        for(let i = 0; i < answer.data.count.full; i++){
                            arr.push(['full', i + 1, ''])
                        }
                        setTypeLess(arr)
                        setSelectedLessons(arr[0])
                    }
                    if(answer.data.count.countLess){
                        let arr = []
                        if(answer.data.info.half) arr.push(['half', 1, ''])
                        if(answer.data.info.weeks) arr.push(['weeks', 1, ''])
                        setTypeLess(arr)
                        setSelectedLessons(arr[0])
                    }
                    setIsLoading(false)
                }else if(answer.otv === 'error') {
                    props.mes(answer.mes, false)
                }
            })
        }
        if(props.data.type === 'lab'){
            let ans = props.sch.addClassLab(props.data)
            ans.then(answer => {
                if(answer.otv === 'OK'){
                    setIsLoading(true)
                    setDataLess(answer.data.count)
                    if(answer.data.info.full) setFull(answer.data.info.full)
                    if(answer.data.info.half) setHalf(answer.data.info.half)
                    if(answer.data.info.weeks) setWeeks(answer.data.info.weeks)

                    if(answer.data.count.full && answer.data.count.ost){
                        let arr = []
                        for(let i = 0; i < answer.data.count.full; i++){
                            arr.push(['full', i+1, ''])
                        }
                        if(answer.data.info.half) arr.push(['half', answer.data.count.full + 2, ''])
                        if(answer.data.info.weeks) arr.push(['weeks', answer.data.count.full + 2, ''])
                        setTypeLess(arr)
                        setSelectedLessons(arr[0])
                    }else if(answer.data.count.full){
                        let arr = []
                        for(let i = 0; i < answer.data.count.full; i++){
                            arr.push(['full', i + 1, ''])
                        }
                        setTypeLess(arr)
                        setSelectedLessons(arr[0])
                    }
                    if(answer.data.count.countLess){
                        let arr = []
                        if(answer.data.info.half) arr.push(['half', 1, ''])
                        if(answer.data.info.weeks) arr.push(['weeks', 1, ''])
                        setTypeLess(arr)
                        setSelectedLessons(arr[0])
                    }
                    setIsLoading(false)
                }else if(answer.otv === 'error'){
                    props.mes(answer.mes, false)
                }
            })
        }
        if(props.data.type === 'exam'){
            let ans = props.sch.addClassExam(props.data)
            ans.then(answer => {
                if(answer.otv === 'OK'){
                    setIsLoading(true)
                    setFull([])
                    setHalf([])
                    setWeeks([])

                    console.log(answer.data)
                    
                    setDataLess({'exam': '0'})
                    setExam(answer.data)
                    setIsLoading(false)
                }else if(answer.otv === 'error'){
                    props.mes(answer.mes, false)
                }
            })
        }
        if(props.data.type === 'min_exam'){
            let ans = props.sch.addClassMinExam(props.data)
            ans.then(answer => {
                if(answer.otv === 'OK'){
                    setIsLoading(true)
                    setFull([])
                    setHalf([])
                    setWeeks([])
                    
                    setDataLess({'minExam': '0'})
                    setMinExam(answer.data)
                    setIsLoading(false)
                }else if(answer.otv === 'error'){
                    props.mes(answer.mes, false)
                }
            })
        }
    }

    (async () => {
        if(get){
            getLesson()
            setGet(false)
        }
    })()

    // 

    const selectLess = (el: Array<string|number>) => {
        setSelectedLessons(el)
    }

    console.log(typeLess,selectedLessons)

    
    
    return (
        <>
            <div id="blockWithCloseSett">
                <div id='windowSug' >
                    <div className='closeCreate'>
                        <h1 className="h1">Предложения</h1>
                        <img src={close} id='close' onClick={() => props.close()}/>
                    </div>
                    <div className="sugScroll">
                        {isLoading && <div className="divLoad"><div id="load"></div></div>}
                        {isLoading === false && (
                            <>
                                <div className="infoPeriod">
                                    {dataLess.full && dataLess.ost ? (
                                        <span>Необходимо разместить {dataLess.full == 1? (<span>{dataLess.full} занятие</span>) : (<span>{dataLess.full} занятия</span>)} на неделе. А также еще {Math.ceil(dataLess.ost*dataLess.weeks)} занятий в течение периода обучения.
                                        Посмотрите на предлагаемые варианты размещения ниже и выберите наиболее удобные.</span>
                                    ): dataLess.full ? (
                                        <span>Необходимо разместить {dataLess.full == 1? (<span>{dataLess.full} занятие</span>) : (<span>{dataLess.full} занятия</span>)} на неделе.
                                        Посмотрите на предлагаемые варианты размещения ниже и выберите наиболее удобные.</span>
                                    ): 
                                    dataLess.countLess ? (
                                        <span>Необходимо разместить {dataLess.countLess} занятий в течение семестра. Посмотрите на предлагаемые варианты размещения ниже и выберите наиболее удобные.</span>
                                    ):dataLess.exam ? (
                                        <span>Необходимо поставить экзамен. Посмотрите на предлагаемые варианты размещения ниже и выберите наиболее удобный.</span>
                                    ):dataLess.minExam ? (
                                        <span>Необходимо поставить экзамен. Посмотрите на предлагаемые варианты размещения ниже и выберите наиболее удобный.</span>
                                    ): (
                                        <></>
                                    )}
                                </div>
                            </>
                        )}
                        {isLoading === false && (
                            <div className='suggestions'>
                                <div className='countLessons'>
                                    {typeLess.length > 0 && typeLess.map((el, ind) =>{
                                        if(el[0] === 'full') return (<div className='btn1 btnBlue bdR5' id={`${ind}`} onClick={() => selectLess(el)}>{el[1]} занятие на неделе</div>)
                                        else if(el[0] == 'half') return (<div className='btn1 btnBlue bdR5' id={`${ind}`} onClick={() => selectLess(el)}>Занятие с периодичностью чет/нечет</div>)
                                        else if(el[0] == 'weeks') return (<div className='btn1 btnBlue bdR5' id={`${ind}`} onClick={() => selectLess(el)}>Занятие с особой периодичностью</div>)
                                        } 
                                    )}
                                    {exam.length > 0 && (<div className='btn1 btnBlue bdR5' id='exam' >Экзамен</div>)}
                                    {minExam.length > 0 && (<div className='btn1 btnBlue bdR5' id='exam' >Зачет</div>)}
                                </div>
                                <div id='suggs'>
                                    {selectedLessons[0] && selectedLessons[0] === 'full' ? (
                                            <form>
                                            {full?.map((el, ind) => (<div className='checkboxSugs bdR5 btnYellow'>
                                                <input type='radio' name='full' id={`${ind}`}/>
                                                <label htmlFor={`${ind}`}>
                                                    <span>{el[2]}</span>
                                                    <span>Аудитория: {el[1]}</span>
                                                    <span>Время: {el[3][1]} - {el[3][2]}</span>
                                                    <span>каждую неделю</span>
                                                </label>
                                            </div>)) }
                                            </form>
                                    ): selectedLessons[0] &&  selectedLessons[0] === 'half' ? (
                                        <form>
                                        {half?.map((el, ind) => (<div className='checkboxSugs bdR5 btnYellow'>
                                            <input type='radio' name='full' id={`${ind}`}/>
                                            <label htmlFor={`${ind}`}>
                                                <span>{el[2]}</span>
                                                <span>Аудитория: {el[1]}</span>
                                                <span>Время: {el[3][0][1]} - {el[3][0][2]}</span>
                                                <span>{el[3][1]} неделя</span>
                                            </label>
                                        </div>)) }
                                        </form>
                                    ): selectedLessons[0] && selectedLessons[0] === 'weeks' ? (
                                        <form>
                                        {weeks?.map((el, ind) => (<div className='checkboxSugs bdR5 btnYellow'>
                                            <input type='radio' name='full' id={`${ind}`}/>
                                            <label htmlFor={`${ind}`}>
                                                <span>{el[2]}</span>
                                                <span>Аудитория: {el[1]}</span>
                                                <span>Время: {el[3][0][1]} - {el[3][0][2]}</span>
                                                <span>{el[3][1][0]} - {el[3][1][1]} неделя</span>
                                            </label>
                                        </div>)) }
                                        </form>
                                    ): exam.length > 0 ?                                 
                                     (
                                        <form>
                                        {/* // ['2024-07-26', '765', '1211', 'пятница', ['315', '12:10', '13:40']] */}
                                        {exam?.map((el, ind) => (<div className='checkboxSugs bdR5 btnYellow'>
                                            <input type='radio' name='exam' id={`${ind}`}/>
                                            <label htmlFor={`${ind}`}>
                                                <span>Дата: {el[0]}</span>
                                                <span>Аудитория: {el[2]}</span>
                                                <span>Время: {el[4][1]} - {el[4][2]}</span>
                                                <span>{el[3]}</span>
                                            </label>
                                        </div>)) }
                                        </form>
                                    ): minExam.length > 0 ?                                 
                                    (
                                       <form>
                                       {/* // ['2024-07-26', '765', '1211', 'пятница', ['315', '12:10', '13:40']] */}
                                       {minExam?.map((el, ind) => (<div className='checkboxSugs bdR5 btnYellow'>
                                           <input type='radio' name='minExam' id={`${ind}`}/>
                                           <label htmlFor={`${ind}`}>
                                               <span>Дата: {el[0]}</span>
                                               <span>Аудитория: {el[2]}</span>
                                               <span>Время: {el[4][1]} - {el[4][2]}</span>
                                               <span>{el[3]}</span>
                                           </label>
                                       </div>)) }
                                       </form>
                                   ):(
                                        <></>
                                    )}
                                </div>
                                <div className='onebtn'>
                                    <button className="btn1 btnPink bdR5"><span>Добавить занятия!</span></button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}