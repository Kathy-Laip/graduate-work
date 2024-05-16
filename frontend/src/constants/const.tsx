import {read, utils} from 'xlsx';
import * as XLSX from 'xlsx';
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


export const handleUpload = async (selectedFile: File) => { // функция загрузки содержимого и отправки данных на сервер при нажатии на кнопку
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          let result = event.target.result;
          
          let workbook = read(result, { type: 'binary' });
          let ws = workbook.Sheets[workbook.SheetNames[0]]
          let data =  utils.sheet_to_json(ws, {header: 1, raw: false}); // generate objects
          resolve(data)
          
        };
        reader.readAsBinaryString(selectedFile);
    })
};

function adjustCellSize(matrix: Array<Array<string>>) {
    let maxColWidths = new Array(matrix[0].length).fill(0);

    // Находим максимальные ширины для каждого столбца
    for (let row of matrix) {
        for (let i = 0; i < row.length; i++) {
            if (row[i].length > maxColWidths[i]) {
                maxColWidths[i] = row[i].length;
            }
        }
    }

    // Устанавливаем ширину каждой ячейки равной максимальной ширине для столбца
    for (let row of matrix) {
        for (let i = 0; i < row.length; i++) {
            row[i] = row[i].padEnd(maxColWidths[i]);
        }
    }

    return matrix;
}

function createDataMatrixOneDir(times: Array<string>, data: any, course: Array<string>){
    let weeks = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']

    let matrix = []
    let mat = ['']
    for(let week of weeks){
        mat.push(week)
        for(let i = 0; i < course.length - 1; i++) mat.push('')
    }
    matrix.push(mat)
    for(let i = 0; i < times.length; i++){
        let mat = [times[i][0] + '-' + times[i][1]]
        mat.concat(Array.from({length: matrix[0].length}, () => ''))
        matrix.push(mat)
    }

    times = times.map(el => el[0])

    // ['8:30', '10:00', '216', 'Михайлов В.Ю.', 'Математическая логика и теория алгоритмов', 'понедельник', null, 'каждую неделю', 'lect', '02.03.02 ФИИТ 2022', null, 72]
    for(let i = 0; i < data.length; i++){
        let row = times.indexOf(data[i][0])
        let col = matrix[0].indexOf(data[i][5])

        if(data[i][8] === 'lect'){
            matrix[row+1][col] = `${data[i][4]}\n ${data[i][3]} Аудитория: ${data[i][2]} ${data[i][7]} лекция`
            matrix[row+1][col+1] = `${data[i][4]} ${data[i][3]} Аудитория: ${data[i][2]} ${data[i][7]} лекция`

        }
    }

    // matrix = adjustCellSize(matrix)
    return matrix
    
}

export function createAndWriteXLSXFile(data: Array<Array<string>>, set: string, times: any, course: Array<string>) {
    // Создаем пустую книгу
    const wb = XLSX.utils.book_new();
    
    // Создаем новый лист
    const ws = XLSX.utils.aoa_to_sheet([]);
    
    // Добавляем лист в книгу
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    times = Object.values(times)

    // Данные, которые вы хотите записать в файл
    let dt = [['']]
    if(set === 'one'){
        dt = createDataMatrixOneDir(times, data, course)
    }
    // Записываем данные в лист
    const columnWidths = [10, 20, 30];

    // Определяем высоту строк
    const rowHeights = [5, 10, 15];
    XLSX.utils.sheet_add_json(ws, dt, {origin: -1,
        skipHeader: true});

    // Сохраняем книгу в файл
    XLSX.writeFile(wb, "Расписание.xlsx");
}
