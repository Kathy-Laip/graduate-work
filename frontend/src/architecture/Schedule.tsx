import { IClass } from "../interfaces/interface"
import { ScheduleSettings } from "./ScheduleSettings"
import apiPos from '../architecture/fetchConnect'

export class Schedule{
    public id: number
    public name: string
    public type: string
    public createDate: string

    public settings?: ScheduleSettings

    public listOfClasses?: IClass[]
    public newClasses?: IClass[]

    public suggestion?: IClass[]

    constructor(id:number, name: string, type: string, createDate: string){
        this.id = id
        this.name = name
        this.type = type
        this.createDate = createDate
    }

    public getClasses(){}
    public getStudyPlan(){}
    public getTeachers(){}
    public getCourse() {}
    public getDirection(){}
    public getCafedra(){}

    public saveSettingsSchedule(flag: string, semestr: number, accHour: number, grafic: any, audit: any, start: string, end: string, courses: any){
        if(flag === 'first'){
            console.log(courses)
            let ans = apiPos({'id': this.id, 'semester': semestr, 'accHour': accHour, 'grafic': grafic, 'audit': audit, 'start': start, 'end': end, 'courses': courses}, '/settingsFirst')
            return ans
        }
    }

    public addDirection(){}
    public editDirection(){}

    public addCafedra(){}
    public editCafedra(){}

    public addNewClasses(classes: IClass[]){}

    public saveChanges(){}
}