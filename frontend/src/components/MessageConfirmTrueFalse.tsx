import React from "react";
import close from '../pictures/Close.svg'

export type Messages = {
    mess?: string 
    change: Function,
    save: Function
}

export const MessageConfirmYN: React.FC<Messages> = (props) => {
    return(
        <div id="blockWithCloseMESCONFIRMYN"> 
                <div id="mesBloackCONFIRMYN">
                    <div className='closeCreate'>
                        <h1 className="h1">Cообщение</h1>
                        <img src={close} id='close' onClick={() => props.change()}/>
                    </div>
                    <div className="mesForUserText"><h3 className="h3">{props.mess}</h3></div>
                         <div className="yes_no">
                             <button className="btn1 bdR5 btnYellow" onClick={() => props.save()}>Да</button>
                             <button className="btn1 bdR5 btnPink" onClick={() => props.change()}>Нет</button>
                         </div>
                </div>
        </div>
    )
}