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

    course = course.map(el => el[1])

    let matrix = []
    let mat = ['']
    for(let week of weeks){
        mat.push(week)
        for(let i = 0; i < course.length - 1; i++) mat.push('')
    }
    matrix.push(mat)
    for(let i = 0; i < times.length; i++){
        let mat = [times[i][0] + '-' + times[i][1]]
        mat.concat(Array.from({length: matrix[0].length}, (el) => ' '))
        matrix.push(mat)
    }

    times = times.map(el => el[0])
    console.log(course)
    // ['8:30', '10:00', '216', 'Михайлов В.Ю.', 'Математическая логика и теория алгоритмов', 'понедельник', null, 'каждую неделю', 'lect', '02.03.02 ФИИТ 2022', null, 72]
    for(let i = 0; i < data.length; i++){
        let row = times.indexOf(data[i][0])
        let col = matrix[0].indexOf(data[i][5])

        if(data[i][8] === 'lect'){
            for(let k =0; k < course.length; k++){
                matrix[row+1][col+k] = `${data[i][4]} ${data[i][3]} Аудитория: ${data[i][2]} ${data[i][7]} лекция`
            }
            // matrix[row+1][col] = `${data[i][4]} ${data[i][3]} Аудитория: ${data[i][2]} ${data[i][7]} лекция`
            // matrix[row+1][col+1] = `${data[i][4]} ${data[i][3]} Аудитория: ${data[i][2]} ${data[i][7]} лекция`

        }
        else if(data[i][8] === 'practic'){
            let count = course.indexOf(data[i][10])
            matrix[row+1][col+count] = `${data[i][4]} ${data[i][3]} Аудитория: ${data[i][2]} ${data[i][7]} практика`
        }
        else if(data[i][8] === 'lab'){
            let count = course.indexOf(data[i][10])
            matrix[row+1][col+count] = `${data[i][4]} ${data[i][3]} Аудитория: ${data[i][2]} ${data[i][7]} лабораторная практика`
        }
    }

    // matrix = adjustCellSize(matrix)
    return matrix
    
}

function createDataMatrixSchool(times: Array<string>, data: any, course: Array<string>){
    let weeks = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']

    course = course.map(el => el[1])

    let matrix = []
    let mat = ['']
    for(let week of weeks){
        mat.push(week)
        for(let i = 0; i < course.length - 1; i++) mat.push('')
    }
    matrix.push(mat)

    mat = ['']
    while(mat.length < matrix[0].length){
        mat = mat.concat(course)
    }
    matrix.push(mat)
    for(let i = 0; i < times.length; i++){
        let mat = [times[i][0] + '-' + times[i][1]]
        mat.concat(Array.from({length: matrix[0].length}, (el) => ' '))
        matrix.push(mat)
    }
    times = times.map(el => el[0])
    for(let i = 0; i < data.length; i++){
        // ['8:30', '9:15', '302', 'Сазонова А. Г.', 'Алгебра', 'понедельник', '8', 'А']
        let row = times.indexOf(data[i][0])
        let col = matrix[0].indexOf(data[i][5])
        for(let k = 0; k < course.length; k++){
            let count = course.indexOf(data[i][7])
            matrix[row+2][col+count] = `${data[i][4]} ${data[i][3]} Кабинет: ${data[i][2]}`
        }

    }
    
    return matrix
}

function createDataMatrixOneDisr(times: Array<string>, data: any, course: Array<string>){
    let matrix = [] 

    let weeks = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']
    let mat = ['', '']
    let mat2 = ['', '']
    let courses = []
    for(let dat of data){
        let curDir = course.filter(el => el[0] === dat['dir_name'])
        console.log(curDir)
        curDir = curDir.map(el => el[1])
        let matt = [dat['dir_name']].concat(Array.from({length: curDir.length - 1}, () => ' '))
        mat = mat.concat(matt)
        mat2 = mat2.concat(curDir)
        courses.push(dat['dir_name'])
    }

    matrix.push(mat)
    matrix.push(mat2)

    
    let time = Array.from({length: weeks.length}, () => Array.from({length: times.length}, () => Array.from({length:mat.length - 2}, () => ' ')))
    for(let el = 0; el < time.length; el++){
        for(let i = 0; i < time[el].length; i++){
            if(i === 0) time[el][i][0] = weeks[el]
            time[el][i][1] = times[i][0] + '-' + times[i][1]
        }
    }
    for(let t of time){
        for(let el of t){
            matrix.push(el)
        }
    }

    times = times.map(el => el[0])


    for(let el of data){
        
        if(el['sch'].length > 0){
            
            
            let groupss = course.filter(e => e[0] === el['dir_name']).map(el => el[1])
            
            for(let sch of el['sch']){
                let col = matrix[0].indexOf(el['dir_name'])
                // ['8:30', '10:00', '216', 'Михайлов В.Ю.', 'Математическая логика и теория алгоритмов', 'понедельник', null, 'каждую неделю', 'lect', '02.03.02 ФИИТ 2022', null, 72]
                
                let row = weeks.indexOf(sch[5]) * times.length + 2
                row += times.indexOf(sch[0])
                
                
                if(sch[8] === 'lect'){
                    for(let i = 0; i < groupss.length; i++){
                        matrix[row][col+i] = `${sch[4]} ${sch[3]} Аудитория: ${sch[2]} ${sch[7]} лекция`
                    }
                }
                else if(sch[8] === 'practic'){
                    col += groupss.indexOf(sch[10])
                    matrix[row][col] = `${sch[4]} ${sch[3]} Аудитория: ${sch[2]} ${sch[7]} практика`
                }
                else if(sch[8] === 'lab'){
                    col += groupss.indexOf(sch[10])
                    matrix[row][col] = `${sch[4]} ${sch[3]} Аудитория: ${sch[2]} ${sch[7]} лабораторная практика`
                }
            }
        }
    }


    return matrix

}

function createDataMatrixAllCourses(times: Array<string>, data: any, course: Array<string>){
    let matrix = []
    // times = [['from', 'to']]
    // data = [{course: 4, dir_name: '', sch: [// ['8:30', '10:00', '216', 'Михайлов В.Ю.', 'Математическая логика и теория алгоритмов', 'понедельник', null, 'каждую неделю', 'lect', '02.03.02 ФИИТ 2022', null, 72]]}]
    // course ={1:['dir_name', 'group', 'count']}
    
    let weeks = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']

    let mat = ['', '']
    let mat2 = ['', '']

    let dirs = []
    for(let [num, cou] of Object.entries(course)){
        let cr = [...new Set(Object.values(cou).map(el => el[0]))]
        
        for(let dir of cr){
            let groups = [...Object.values(cou).filter(el => el[0] === dir).map(el => el[1])]
            dirs.push({'course': num, 'dir': dir, 'group': groups})
        }
    }

    for(let dir of dirs){
        let matt = [dir['dir']].concat(Array.from({length: dir['group'].length - 1}, () => ' '))
        mat = mat.concat(matt)
        mat2 = mat2.concat(dir['group'])
    }

    matrix.push(mat)
    matrix.push(mat2)

    
    let time = Array.from({length: weeks.length}, () => Array.from({length: times.length}, () => Array.from({length:mat.length - 2}, () => ' ')))
    for(let el = 0; el < time.length; el++){
        for(let i = 0; i < time[el].length; i++){
            if(i === 0) time[el][i][0] = weeks[el]
            time[el][i][1] = times[i][0] + '-' + times[i][1]
        }
    }
    for(let t of time){
        for(let el of t){
            matrix.push(el)
        }
    }

    times = times.map(el => el[0])

    course = Object.values(course)

    for(let el of data){
        
        if(el['sch'].length > 0){
            
            
            let groupss = dirs.filter(e => e['dir'] === el['dir_name']).map(el => el['group'])[0]
            console.log(groupss)            
            for(let sch of el['sch']){
                let col = matrix[0].indexOf(el['dir_name'])
                // ['8:30', '10:00', '216', 'Михайлов В.Ю.', 'Математическая логика и теория алгоритмов', 'понедельник', null, 'каждую неделю', 'lect', '02.03.02 ФИИТ 2022', null, 72]
                
                let row = weeks.indexOf(sch[5]) * times.length + 2
                row += times.indexOf(sch[0])
                
                
                if(sch[8] === 'lect'){
                    for(let i = 0; i < groupss.length; i++){
                        matrix[row][col+i] = `${sch[4]} ${sch[3]} Аудитория: ${sch[2]} ${sch[7]} лекция`
                    }
                }
                else if(sch[8] === 'practic'){
                    col += groupss.indexOf(sch[10])
                    matrix[row][col] = `${sch[4]} ${sch[3]} Аудитория: ${sch[2]} ${sch[7]} практика`
                }
                else if(sch[8] === 'lab'){
                    col += groupss.indexOf(sch[10])
                    matrix[row][col] = `${sch[4]} ${sch[3]} Аудитория: ${sch[2]} ${sch[7]} лабораторная практика`
                }
            }
        }
    }

    
    return matrix
}

export function createAndWriteXLSXFile(data: Array<Array<string>>, set: string, times: any, course: Array<string> | any) {
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
    else if(set === 'all'){
        dt = createDataMatrixOneDisr(times, data, course)
    }
    else if(set === 'allCourses'){
        dt = createDataMatrixAllCourses(times, data, course)
    } else if(set === 'school'){
        dt = createDataMatrixSchool(times, data, course)
    }
    // Записываем данные в лист
    // console.log(dt)

    XLSX.utils.sheet_add_json(ws, dt, {origin: -1,
        skipHeader: true});

    // Сохраняем книгу в файл
    XLSX.writeFile(wb, "Расписание.xlsx");
}
