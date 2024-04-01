import {read, utils} from 'xlsx';
import { President } from '../interfaces/interface';

export const circles = [
    { // вынесли как константу
        width: '15em',
        color: 'var(--main-orange)',
        left: '-8rem',
        top: '-6rem',
        zInd: -1
    },
    {
        width: '10em',
        color: 'var(--main-dar-dar-blue)',
        left: '-9rem',
        top: '5rem',
        zInd:-2
    },
    {
        width: '6em',
        color: 'var(--main-dark-blue)',
        left: '-4rem',
        bottom: '-2rem',
        zInd:-1
    },
    {
        width: '8em',
        color: 'var(--main-yellow)',
        right: '-1rem',
        top: '-4rem',
        zInd: -1
    },
    {
        width: '10em',
        color: 'var(--main-dar-dar-blue)',
        right: '-6rem',
        top: '0rem',
        zInd: -2
    },
    {
        width: '10em',
        color: 'var(--main-dark-blue)',
        right: '-4rem',
        bottom: '-1rem',
        zInd:-1
    },
    {
        width: '8em',
        color: 'var(--main-orange)',
        right: '2rem',
        bottom: '-3rem',
        zInd:-2
    }
]

export const reEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i

export const rePas = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/


export const switchBlock = (type:string) => {
    if(type === 'newMessage'){
        if(document.getElementById('blockWithClose')){
            document.getElementById('blockWithClose')!.style.display = 'flex'
        }
        document.getElementById('blockWithCloseMES')!.style.display = 'flex'
        document.getElementById('mesBloack')!.style.display = 'flex'
    }
    if(type === 'newMessageConfirm'){
        if(document.getElementById('blockWithClose')){
            document.getElementById('blockWithClose')!.style.display = 'flex'
        }
        document.getElementById('blockWithCloseMESCONFIRM')!.style.display = 'flex'
        document.getElementById('mesBloackCONFIRM')!.style.display = 'flex'
    }
    else if(type === 'newProject'){
        document.getElementById('blockWithClose')!.style.display = 'flex'
        document.getElementById('addProject')!.style.display = 'flex'
    }
    else if(type === 'editProject'){
        document.getElementById('blockWithClose')!.style.display = 'flex'
        document.getElementById('editProject')!.style.display = 'flex'
    }
}


// export const handleUpload = (selectedFile: File) => { // функция загрузки содержимого и отправки данных на сервер при нажатии на кнопку
//     if (selectedFile) {
//       const reader = new FileReader();
//       reader.onload = (event: any) => {
//         const result = event.target.result;
        
//         const workbook = read(result, { type: 'binary' });
//         const ws = workbook.Sheets[workbook.SheetNames[0]]
//         const data: President[] = utils.sheet_to_json<President>(ws); // generate objects
//         return data
//       };
//       reader.readAsBinaryString(selectedFile);
//     } else ''
//   };
