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

    const getLesson = () => {
        if(props.data.type === 'lect'){
            let ans = props.sch.addClassLect(props.data)
            ans.then(answer => {
                if(answer.otv === 'OK'){
                    setIsLoading(true)
                    console.log(answer.data)
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
                    </div>
                </div>
            </div>
        </>
    )
}