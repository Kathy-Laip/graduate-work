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

    const getLesson = () => {
        if(props.data.type === 'lect'){
            let ans = props.sch.addClassLect(props.data)
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
                    if(answer.data.countLess){
                        let arr = []
                        if(answer.data.info.half) arr.push(['half', 1, ''])
                        if(answer.data.info.weeks) arr.push(['weeks', 1, ''])
                        setSelectedLessons(arr[0])
                    }
                    setIsLoading(false)
                }else if(answer.otv === 'error') {
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
    
    return (
        <>
            <div id="blockWithCloseSett">
                <div id='settings'>
                    <div className='closeCreate'>
                        <h1 className="h1">Предложения</h1>
                        <img src={close} id='close' onClick={() => props.close()}/>
                    </div>
                    <div className="scrolls">
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
                                    ): (<></>)}
                                    {dataLess.countLess ? (
                                        <span>Необходимо разместить {dataLess.countLess} занятий в течение семестра. Посмотрите на предлагаемые варианты размещения ниже и выберите наиболее удобные.</span>
                                    ): (
                                        <></>
                                    )}
                                </div>
                            </>
                        )}
                        {isLoading === false && (
                            <div className='suggestions'>
                                <div className='countLessons'>
                                    {typeLess.map((el, ind) =>{
                                        if(el[0] === 'full') return (<div className='btn1 btnBlue bdR5' id={`${ind}`}>{el[1]} занятие на неделе</div>)
                                        else if(el[0] == 'half') return (<div className='btn1 btnBlue bdR5' id={`${ind}`}>Занятие с периодичностью чет/нечет</div>)
                                        else if(el[0] == 'weeks') return (<div className='btn1 btnBlue bdR5' id={`${ind}`}>Занятие с особой периодичностью</div>)
                                        } 
                                    )}
                                    
                                </div>
                                <div id='suggs'>
                                    {selectedLessons[0] === 'full' ? (
                                            <>{full.map(el => (<span>{el}</span>)) }</>
                                    ): (
                                        <></>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}