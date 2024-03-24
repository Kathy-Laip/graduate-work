import React, { useState } from "react";
import close from '../pictures/Close.svg'
import {ISCH} from '../interfaces/interface'
import { User } from "../architecture/User";
import { Message } from "./Message";
import { switchBlock } from "../constants/const";

export type Messages = {
    mess?: string,
    data: ISCH,
    user: User
}

export const MessageConfirm: React.FC<Messages> = (props) => {
    const [mes, setMes] = useState('')
    const [isAnswer, setIsAnswer] = useState(false)

    const yesAns = () => {
        let ans = props.user.deleteSchedule(props.data)
        
        ans.then(answer => {
            if(answer.otv === 'error_data'){
                setMes('Ошибка! Не удалось удалить расписание!')
                setIsAnswer(true)
            }
            else if(answer.otv === 'OK'){
                setMes('Расписание успешно удалено!')
                setIsAnswer(true)
            }
        })
    }

    const noAns = () => {
        document.getElementById('blockWithCloseMESCONFIRM')!.style.display = 'none'
    }
    return(
        <div id="blockWithCloseMESCONFIRM"> 
            <div id="mesBloackCONFIRM">
                <div className='closeCreate'>
                    <h1 className="h1">Cообщение</h1>
                    <img src={close} id='close' onClick={() => {
                        document.getElementById('blockWithCloseMES')!.style.display = 'none'
                        document.getElementById('mesBloack')!.style.display = 'none'
                        if(document.getElementById('blockWithClose')){
                            document.getElementById('blockWithClose')!.style.display = 'none'
                        }
                        if(document.getElementById('blockWithCloseMESCONFIRM')){
                            document.getElementById('blockWithCloseMESCONFIRM')!.style.display = 'none'
                        }
                        window.location.reload()
                        }}/>
                </div>
                {!isAnswer && 
                    <>
                    <div className="mesForUserText"><h3 className="h3">{props.mess}</h3></div>
                     <div className="yes_no">
                         <button className="btn1 bdR5 btnYellow" onClick={yesAns}>Да</button>
                         <button className="btn1 bdR5 btnPink" onClick={noAns}>Нет</button>
                     </div>
                    </> 
                }
                {isAnswer && <div className="mesForUserText"><h3 className="h3">{mes}</h3></div>}
            </div>
        </div>
    )
}