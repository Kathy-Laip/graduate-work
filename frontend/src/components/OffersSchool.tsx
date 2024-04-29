import React, {useEffect, useState} from 'react'
import { ScheduleSchool } from '../architecture/ScheduleSchool'
import close from '../pictures/Close.svg'

type Offs = {
    close: Function,
    data: any,
    sch: ScheduleSchool,
    mes: Function
}

export const OffersSchool: React.FC<Offs> = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [get, setGet] = useState(true)

    const [dataLess, setDataLess] = useState<any>() // часы

    const [typeLess, setTypeLess] = useState<Array<Array<string|number>>>([])
    const [selectedLessons, setSelectedLessons] = useState<Array<string|number>>([''])

    const [selectedExam, setSelectedExam] = useState<Array<string|number>>([''])

    const [full, setFull] = useState([])

    const [teach, setTeach] = useState('')

    useEffect(() => {
        if(typeof(selectedLessons[1]) === 'number') swCur(typeLess[selectedLessons[1] - 1])
    }, [selectedLessons])
    

    const swCur = (el: Array<string|number>) => {
        
        if(el[0] === 'full'){
            document.getElementById('full')!.style.display = 'flex'
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
    }

    const getLesson = () => {
        let ans = props.sch.addClass(props.data)
        ans.then(answer => {
            if(answer.otv === 'OK'){
                setIsLoading(true)
                setTeach(answer.teach)
                setDataLess(answer.count)

                console.log(answer.data)
                
                let arr = []
                if(answer.count) {
                    setFull(answer.data)
                    
                    for(let i = 0; i < answer.count; i++){
                        arr.push(['full', i+1, ''])
                    }
                    
                    setTypeLess(arr)
                    setSelectedLessons(arr[0])
                }
                setIsLoading(false)
            }else if(answer.otv === 'error') {
                props.mes(answer.mes, false)
            }
        })
    }


    (async () => {
        if(get){
            getLesson()

            setGet(false)
        }
    })()

    

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
            }
            for(let el of arr){
                {/* '559', '312', 'понедельник', '307', '9:25', '10:10'] */}
                let count = 0 
                for(let num of arr){
                    if((el[1] === num[1]) && (el[4] === num[4])) count++
                }
                if(count > 1) ans = false
            }
            
            if(ans){
                let ans = props.sch.addLessons({'lessons': arr, 'teach': teach, 'dirs': props.data.napr, 'subj': props.data.subj})
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
                                    {dataLess && dataLess > 0 ? (
                                        <span>Необходимо разместить {dataLess == 1? (<span>{dataLess} занятие</span>) : (<span>{dataLess} занятия</span>)} на неделе.
                                        Посмотрите на предлагаемые варианты размещения ниже и выберите наиболее удобные.</span>
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
                                        } 
                                    )}

                                </div>
                                <div id='suggs'>
                                        <div id='full'>
                                            <form >
                                                {full?.map((el, ind) => (<div className='checkboxSugs bdR5 btnYellow'>
                                                    <input type='radio' name='full' id={`full ${ind}`} onClick={() => changeRadio(ind)}/>
                                                    {/* '559', '312', 'понедельник', '307', '9:25', '10:10'] */}
                                                    <label htmlFor={`${ind}`}>
                                                        <span>{el[2]}</span>
                                                        <span>Кабинет: {el[1]}</span>
                                                        <span>Время: {el[4]} - {el[5]}</span>
                                                        <span>{teach}</span>
                                                    </label>
                                                </div>)) }
                                            </form>
                                        </div>
                                </div>
                                <div className='onebtn'>
                                    {typeLess.length > 0 && (<button className="btn1 btnPink bdR5" onClick={() => addLessons()}><span>Добавить занятия!</span></button>)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}