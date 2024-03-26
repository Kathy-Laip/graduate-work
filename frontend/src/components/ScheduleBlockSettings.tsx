import React from "react";
import close from '../pictures/Close.svg'

export const ScheduleBlockSettings: React.FC = () => {

    const closeAdd = () => {
        document.getElementById('blockWithCloseSett')!.style.display = 'none'
        document.getElementById('settings')!.style.display = 'none'
        // if(document.getElementById('blockWithCloseMES')){
        //     document.getElementById('blockWithCloseMES')!.style.display = 'none'
        // }
        // if(document.getElementById('blockWithCloseMESCONFIRM')){
        //     document.getElementById('blockWithCloseMESCONFIRM')!.style.display = 'none'
        // }
    }

    return (
        <div id="blockWithCloseSett">
            <div id='settings'>
                <div className='closeCreate'>
                    <h1 className="h1">Настройки расписания</h1>
                    <img src={close} id='close' onClick={closeAdd}/>
                </div>
                <select className="shadowBlack" id='selectTypeEdit'
                >
                    <option value={''}>Выберите семестр</option>
                    <option value={'1'}>1</option>
                    <option value={'2'}>2</option>
                </select>
            </div>
        </div>
    )
}