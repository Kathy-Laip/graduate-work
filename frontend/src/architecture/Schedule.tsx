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

    constructor(id:number, name: string, type: string, createDate: string, settings?: ScheduleSettings){
        this.id = id
        this.name = name
        this.type = type
        this.createDate = createDate
        this.settings = settings
    }

    public getClasses(){}
    public getStudyPlan(){}
    public getTeachers(){}
    public getCourse() {}
    public getDirection(){}
    public getCafedra(){}

    public saveSettingsSchedule(flag: string, semestr: number, accHour: number, grafic: any, audit: any, start: string, end: string, courses: any){
        if(flag === 'first'){
            let ans = apiPos({'id': this.id, 'semester': semestr, 'accHour': accHour, 'grafic': grafic, 'audit': audit, 'start': start, 'end': end, 'courses': courses}, '/settingsFirst')
            return ans
        }
    }

    public addDirection(type:string, courseNumber: number, nameCourse: string, data: string[]){
        let ans = apiPos({'id': this.id, 'numberCourse': courseNumber, 'nameCourse': nameCourse, 'data': data}, '/addPlanUni')
        return ans
    }

    public deleteDirection(numberCourse: number, name_course: string){
        let ans = apiPos({'id': this.id, 'numberCourse': numberCourse, 'name_course': name_course}, '/deletePlanUni')
        return ans
    }

    public editDirection(numberCourse: number, name_course: string, data: any){
        let ans = apiPos({'id': this.id, 'numberCourse': numberCourse, 'name_course': name_course, 'data': data}, '/editPlanUni')
        return ans
    }

    public addCafedra(){}
    public editCafedra(){}

    public addNewClasses(classes: IClass[]){}

    public saveChanges(){}
}