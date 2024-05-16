import React, {useEffect, useState} from 'react'
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

    const [selectedExam, setSelectedExam] = useState<Array<string|number>>([''])

    const [full, setFull] = useState([])
    const [half, setHalf] = useState([])
    const [weeks, setWeeks] = useState([])

    const [exam, setExam] = useState([])
    const [minExam, setMinExam] = useState([])

    const [teach, setTeach] = useState('')

    useEffect(() => {
        if(typeof(selectedLessons[1]) === 'number') swCur(typeLess[selectedLessons[1] - 1])
    }, [selectedLessons])
    

    const swCur = (el: Array<string|number>) => {
        console.log(el)
        if(el[0] === 'full'){
            console.log(typeLess)
            document.getElementById('full')!.style.display = 'flex'
            document.getElementById('half')!.style.display = 'none'
            document.getElementById('weeks')!.style.display = 'none'
            if(el[2] !== ''){
                (document.getElementById(`full ${el[2]}`) as HTMLInputElement).checked = true
            }
            if(el[2] === ''){
                let ele = document.getElementsByName('full')
                for(let el of ele){
                    if( (el as HTMLInputElement).checked){
                        (el as HTMLInputElement).checked = false
                    }
                }
            }
        }
        if(el[0] === 'half'){
            document.getElementById('full')!.style.display = 'none'
            document.getElementById('half')!.style.display = 'flex'
            document.getElementById('weeks')!.style.display = 'none'
            if(el[2] !== ''){
                (document.getElementById(`half ${el[2]}`) as HTMLInputElement).checked = true
            }
            if(el[2] === ''){
                let ele = document.getElementsByName('half')
                for(let el of ele){
                    if( (el as HTMLInputElement).checked){
                        (el as HTMLInputElement).checked = false
                    }
                }
            }
        }
        if(el[0] === 'weeks'){
            document.getElementById('full')!.style.display = 'none'
            document.getElementById('half')!.style.display = 'none'
            document.getElementById('weeks')!.style.display = 'flex'
            if(el[2] !== ''){
                (document.getElementById(`weeks ${el[2]}`) as HTMLInputElement).checked = true
            }
            if(el[2] === ''){
                let ele = document.getElementsByName('weeks')
                for(let el of ele){
                    if( (el as HTMLInputElement).checked){
                        (el as HTMLInputElement).checked = false
                    }
                }
            }
        }
    }

    const getLesson = () => {
        if(props.data.type === 'lect'){
            
            let ans = props.sch.addClassLect(props.data)
            ans.then(answer => {
                if(answer.otv === 'OK'){
                    setTeach(answer.data.teach)
                    setIsLoading(true)
                    setDataLess(answer.data.count)
                    console.log(answer.data)
                    if(answer.data.info.full) setFull(answer.data.info.full)
                    if(answer.data.info.half) setHalf(answer.data.info.half)
                    if(answer.data.info.weeks) setWeeks(answer.data.info.weeks)

                    let arr = []

                    if(answer.data.count.full && answer.data.count.ost){
                        
                        for(let i = 0; i < answer.data.count.full; i++){
                            arr.push(['full', i+1, ''])
                        }
                        if(answer.data.info.half) arr.push(['half', answer.data.count.full + 1, ''])
                        if(answer.data.info.weeks) arr.push(['weeks', answer.data.count.full + 1, ''])
                        setTypeLess(arr)
                        setSelectedLessons(arr[0])
                    }else if(answer.data.count.full){
                        
                        for(let i = 0; i < answer.data.count.full; i++){
                            arr.push(['full', i + 1, ''])
                        }
                        setTypeLess(arr)
                        setSelectedLessons(arr[0])
                    }
                    if(answer.data.count.countLess){
                        
                        if(answer.data.info.half) arr.push(['half', 1, ''])
                        if(answer.data.info.weeks) arr.push(['weeks', 1, ''])
                        setTypeLess(arr)
                        setSelectedLessons(arr[0])
                    }
                    // swCur(arr[0][0])
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
                    setTeach(answer.data.teach)
                    setIsLoading(true)
                    setDataLess(answer.data.count)
                    if(answer.data.info.full) setFull(answer.data.info.full)
                    if(answer.data.info.half) setHalf(answer.data.info.half)
                    if(answer.data.info.weeks) setWeeks(answer.data.info.weeks)

                    let arr = []

                    if(answer.data.count.full && answer.data.count.ost){
                        
                        for(let i = 0; i < answer.data.count.full; i++){
                            arr.push(['full', i+1, ''])
                        }
                        if(answer.data.info.half) arr.push(['half', answer.data.count.full + 1, ''])
                        if(answer.data.info.weeks) arr.push(['weeks', answer.data.count.full + 1, ''])
                        setTypeLess(arr)
                        setSelectedLessons(arr[0])
                    }else if(answer.data.count.full){
                        
                        for(let i = 0; i < answer.data.count.full; i++){
                            arr.push(['full', i + 1, ''])
                        }
                        setTypeLess(arr)
                        setSelectedLessons(arr[0])
                    }
                    if(answer.data.count.countLess){
                        
                        if(answer.data.info.half) arr.push(['half', 1, ''])
                        if(answer.data.info.weeks) arr.push(['weeks', 1, ''])
                        setTypeLess(arr)
                        setSelectedLessons(arr[0])
                    }
                    // swCur(arr[0][0])
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
                    setTeach(answer.data.teach)
                    setIsLoading(true)
                    setDataLess(answer.data.count)
                    if(answer.data.info.full) setFull(answer.data.info.full)
                    if(answer.data.info.half) setHalf(answer.data.info.half)
                    if(answer.data.info.weeks) setWeeks(answer.data.info.weeks)

                    let arr = []

                    if(answer.data.count.full && answer.data.count.ost){
                        
                        for(let i = 0; i < answer.data.count.full; i++){
                            arr.push(['full', i+1, ''])
                        }
                        if(answer.data.info.half) arr.push(['half', answer.data.count.full + 1, ''])
                        if(answer.data.info.weeks) arr.push(['weeks', answer.data.count.full + 1, ''])
                        setTypeLess(arr)
                        setSelectedLessons(arr[0])
                    }else if(answer.data.count.full){
                        
                        for(let i = 0; i < answer.data.count.full; i++){
                            arr.push(['full', i + 1, ''])
                        }
                        setTypeLess(arr)
                        setSelectedLessons(arr[0])
                    }
                    if(answer.data.count.countLess){
                        
                        if(answer.data.info.half) arr.push(['half', 1, ''])
                        if(answer.data.info.weeks) arr.push(['weeks', 1, ''])
                        setTypeLess(arr)
                        setSelectedLessons(arr[0])
                    }
                    // swCur(arr[0][0])
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
                    setSelectedExam(['exam', -1])
                    setTeach(answer.teach)
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
                    setSelectedExam(['minExam', -1])
                    setTeach(answer.teach)
                    setIsLoading(false)
                }else if(answer.otv === 'error'){
                    props.mes(answer.mes, false)
                }
            })
        }
    }


    (async () => {
        if(get){
            // console.log(props.data)
            getLesson()

            setGet(false)
        }
    })()

    // 

    const selectLess = (el: Array<string|number>) => {
        setSelectedLessons(el)
    }

    const changeRadio = (ind: number) => {
        setSelectedLessons(prev => {
            let ans = [...prev]
            ans[2] = ind
            return ans
        })
        setTypeLess(prev => {
            let ans = [...prev]
            if(typeof(selectedLessons[1]) === 'number'){
                ans[selectedLessons[1] - 1][2] = ind
            }
            return ans
        })
    }

    const changeRadioExam = (ind: number) => {
        setSelectedExam(prev => {
            let ans = [...prev]
            ans[1] = ind
            return ans
        })
    }


    const addLessons = () => {
        let ans = true
        for(let el of typeLess){
            if(el[2] === ''){
                ans = false
                props.mes('Пожалуйста, выберите занятия!', false)
            }
        }
        if(ans){
            ans = true
            let arr: any[] = []
            for(let el of typeLess){
                if(el[0] === 'full'){
                    if(typeof(el[2]) === 'number') arr.push(full[el[2]])
                }
                else if(el[0] === 'half'){
                    if(typeof(el[2]) === 'number') arr.push(half[el[2]])
                }
                else if(el[0] === 'weeks'){
                    if(typeof(el[2]) === 'number') arr.push(weeks[el[2]])
                }
            }
            for(let el of arr){
                let count = 0 
                let time1 = ''
                if(el[3].length === 3) time1 = el[3][0]
                else if(el[3].length === 2) time1 = el[3][0][0]
                for(let num of arr){
                    let time = ''
                    if(num[3].length === 3) time = num[3][0]
                    else if(num[3].length === 2) time = num[3][0][0]
                    if((el[0] === num[0]) && time === time1) count++
                }
                if(count > 1) ans = false
            }
            
            if(ans){
                let ans = props.sch.addLessons({'lessons': arr, 'type': props.data.type, 'teach': teach, 'dirs': props.data.napr, 'subj': props.data.subj})
                ans.then(answer => {
                    if(answer.otv === 'OK'){
                        props.mes('Занятия успешно добавлены!', true)
                    }else if(answer.otv === 'error'){
                        props.mes(answer.mes, false)
                    }
                })
            } else props.mes('Пожалуйста, выберите разные время и место для заняти!', false)
        }
    }

    const addExamOrMinExam = () => {
        if(selectedExam[1] === -1) props.mes('Пожалуйста, выберите время экзамена!', false)
        else{
            if(selectedExam[0] === 'exam'){
                let ans = props.sch.addExamOrMin({'info': props.data, 'type': selectedExam, 'add': exam[selectedExam[1] as number], 'teach': teach})
                ans.then(answer => {
                    if(answer.otv === 'OK'){
                        
                        props.mes('Экзамен успешно добавлен!', true)
                    }else{
                        props.mes('Что-то пошло не так, попробуйте позже...', false)
                    }
                })
            }
            if(selectedExam[0] === 'minExam'){
                let ans = props.sch.addExamOrMin({'info': props.data, 'type': selectedExam, 'add': minExam[selectedExam[1] as number], 'teach': teach})
                ans.then(answer => {
                    if(answer.otv === 'OK'){
                        
                        props.mes('Зачет успешно добавлен!', true)
                    }else{
                        props.mes('Что-то пошло не так, попробуйте позже...', false)
                    }
                })
            }
        }
    }

    

    
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
                                        if(el[0] === 'full') return (<div className='btn1 btnBlue bdR5' id={`${ind}`} onClick={() => selectLess(el)} >{el[1]} занятие на неделе</div>)
                                        else if(el[0] == 'half') return (<div className='btn1 btnBlue bdR5' id={`${ind}`} onClick={() => selectLess(el)}>Занятие с периодичностью чет/нечет</div>)
                                        else if(el[0] == 'weeks') return (<div className='btn1 btnBlue bdR5' id={`${ind}`}onClick={() => selectLess(el)} >Занятие с особой периодичностью</div>)
                                        } 
                                    )}
                                    {selectedExam[0] === 'exam' && (<div className='btn1 btnBlue bdR5' id='exam' >Экзамен</div>)}
                                    {selectedExam[0] === 'minExam' && (<div className='btn1 btnBlue bdR5' id='exam' >Зачет</div>)}
                                </div>
                                <div id='suggs'>
                                        <div id='full'>
                                            <form >
                                                {full?.map((el, ind) => (<div className='checkboxSugs bdR5 btnYellow'>
                                                    <input type='radio' name='full' id={`full ${ind}`} onClick={() => changeRadio(ind)}/>
                                                    <label htmlFor={`${ind}`}>
                                                        <span>{el[2]}</span>
                                                        <span>Аудитория: {el[1]}</span>
                                                        <span>Время: {el[3][1]} - {el[3][2]}</span>
                                                        <span>{teach}</span>
                                                        <span>каждую неделю</span>
                                                    </label>
                                                </div>)) }
                                            </form>
                                        </div>
                                        <div id='weeks'>
                                            <form >
                                                {weeks?.map((el, ind) => (<div className='checkboxSugs bdR5 btnYellow'>
                                                    <input type='radio' name='weeks' id={`weeks ${ind}`} onClick={() => changeRadio(ind)}/>
                                                    <label htmlFor={`${ind}`}>
                                                        <span>{el[2]}</span>
                                                        <span>Аудитория: {el[1]}</span>
                                                        <span>Время: {el[3][0][1]} - {el[3][0][2]}</span>
                                                        <span>{teach}</span>
                                                        <span>{el[3][1][0]} - {el[3][1][1]} неделя</span>
                                                    </label>
                                                </div>)) }
                                            </form>
                                        </div>
                                        <div id='half'>
                                            <form>
                                                {half?.map((el, ind) => (<div className='checkboxSugs bdR5 btnYellow'>
                                                    <input type='radio' name='half' id={`half ${ind}`} onClick={() => changeRadio(ind)}/>
                                                    <label htmlFor={`${ind}`}>
                                                        <span>{el[2]}</span>
                                                        <span>Аудитория: {el[1]}</span>
                                                        <span>Время: {el[3][0][1]} - {el[3][0][2]}</span>
                                                        <span>{teach}</span>
                                                        <span>{el[3][1]} неделя</span>
                                                    </label>
                                                </div>)) }
                                                </form>
                                        </div>
                                        {selectedExam[0] === 'exam' && (
                                            <div id='exam'>
                                                <form>
                                                    {exam?.map((el, ind) => (<div className='checkboxSugs bdR5 btnYellow'>
                                                        <input type='radio' name='exam' id={`${ind}`} onClick={() => changeRadioExam(ind)}/>
                                                        <label htmlFor={`${ind}`}>
                                                            <span>Дата: {el[0]}</span>
                                                            <span>Аудитория: {el[2]}</span>
                                                            <span>Время: {el[4][1]} - {el[4][2]}</span>
                                                            <span>{teach}</span>
                                                            <span>{el[3]}</span>
                                                        </label>
                                                    </div>)) }
                                                </form>
                                            </div>
                                        )
                                        }
                                        {selectedExam[0] === 'minExam' && (

                                            <div id='minExam'>
                                                <form>
                                                    {minExam?.map((el, ind) => (<div className='checkboxSugs bdR5 btnYellow'>
                                                        <input type='radio' name='minExam' id={`${ind}`} onClick={() => changeRadioExam(ind)}/>
                                                        <label htmlFor={`${ind}`}>
                                                            <span>Дата: {el[0]}</span>
                                                            <span>Аудитория: {el[2]}</span>
                                                            <span>Время: {el[4][1]} - {el[4][2]}</span>
                                                            <span>{teach}</span>
                                                            <span>{el[3]}</span>
                                                        </label>
                                                </div>)) }
                                                </form>
                                            </div>
                                        )
                                        }
                                </div>
                                <div className='onebtn'>
                                    {typeLess.length > 0 && (<button className="btn1 btnPink bdR5" onClick={() => addLessons()}><span>Добавить занятия!</span></button>)}
                                    {(selectedExam[0] === 'exam' || selectedExam[0] === 'minExam') && (<button className="btn1 btnPink bdR5" onClick={() => addExamOrMinExam()}><span>Добавить занятия!</span></button>)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}