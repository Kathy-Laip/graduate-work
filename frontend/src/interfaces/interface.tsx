export interface ICircle {
    width: string
    color: string
    top?: string
    bottom?: string
    left?: string
    right?: string
    zInd: number
}

export interface IClass{
    week_day: string
    start_end: string
    time_period?: string
    name_sub: string
    place: string
    teacher: string
    course?: string
    dir_name?: string
    class?:string
}

export interface IPlanUni{
    name_sun: string
    exam: string
    main_exam: string
    lecture_count_hour: number
    practic_count_hour: number
    lab_count_hour: number
}

export interface ITeachUni{
    name_sub: string
    name_cafedra: string
    fio: string
    type_class: string
    hour: number
    course: number
    direction: string
    group: string
}

export interface IPlanSchool{
    name_sub: string
    count_hour_week: number
}

export interface ITeachSchool{
    name_sub: string
    name_cafedra: string
    fio: string
    class_count: number
    initial_group: string
}

export interface ISCH{
    theme? : string
    type? : string
    date? : string
}

export interface President { // интерфейс данных
    Name: string;
    Index: number;
}
  
export interface IFile{
    id: number,
    nameFile: string
}