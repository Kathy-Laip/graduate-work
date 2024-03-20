import React from "react";
import close from '../pictures/Close.svg'

type Message = {
    mess?: string 
}

export const Message: React.FC<Message> = (props) => {
    return(
        <div id="blockWithCloseMES"> 
            <div id="mesBloack">
                <div className='closeCreate'>
                    <h1 className="h1">Cообщение</h1>
                    <img src={close} id='close' onClick={() => {
                        document.getElementById('blockWithCloseMES')!.style.display = 'none'
                        document.getElementById('mesBloack')!.style.display = 'none'
                        document.getElementById('blockWithClose')!.style.display = 'none'
                        }}/>
                </div>
                <div className="mesForUserText"><h3 className="h3">{props.mess}</h3></div>
            </div>
        </div>
    )
}